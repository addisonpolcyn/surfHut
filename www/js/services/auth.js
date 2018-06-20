'use strict';

app.factory('Auth', function($firebaseAuth, $firebaseObject, $firebaseArray, $state, $http, $q) {
	var ref = firebase.database().ref();
	var auth = $firebaseAuth();

	var Auth = {

		createProfile: function(uid, profile){
			return ref.child('profiles').child(uid).set(profile);
		},

		getProfile: function(uid){
			return $firebaseObject(ref.child('profiles').child(uid));
		},

		getBoard: function(boardId){
			return $firebaseObject(ref.child('boards').child(boardId));
		},

		login: function(){
			var provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope('public_profile');

			return auth.$signInWithPopup(provider)
				.then(function(result){
				
					var accessToken = result.credential.accessToken;
					var user = Auth.getProfile(result.user.uid).$loaded();

					user.then(function(profile){
						if(profile.name == undefined){
								
									var info = result.user.providerData[0];
									var profile = {
										name: info.displayName,
										email: info.email,
										avatar: info.photoURL,
										gender: '',
										age: ''
									}

									Auth.createProfile(result.user.uid, profile);
						}
					});
				});
		},

		logout: function(){
			return auth.$signOut();
		},

		requireAuth: function() {
			return auth.$requireSignIn();
		},

		getProfiles: function(){
			return $firebaseArray(ref.child('profiles'));
		},

		getBoards: function(){
			return $firebaseArray(ref.child('boards'));
		},

		myBoards: function(uid){
			return $firebaseArray(ref.child('profiles').child(uid).child('boards'));
		},

		setOnline: function(uid){
			var connected = $firebaseObject(ref.child(".info/connected"));
			var online = $firebaseObject(ref.child('profiles').child(uid));

			connected.$watch(function(){
				if(connected.$value === true){
					ref.child('profiles').child(uid).update({
						isOnline: true
					});

					online.$ref().onDisconnect().update({
						isOnline: false
					});
				}
			});
		}
	};

	auth.$onAuthStateChanged(function(authData){
		if(authData){
			console.log('Logged in!')
		} else {
			$state.go('login');
			console.log('You need to login.')
		}
	});

	return Auth;

});