'use strict';

app.factory('Match', function($firebaseArray, $ionicPopup){
	var ref = firebase.database().ref();

	var Match = {
		allMatchesByUser: function(uid){
			return $firebaseArray(ref.child('matches').child(uid));
		},

		allLovesByUser: function(uid){
			return $firebaseArray(ref.child('loves').child(uid));
		},

		checkMatches: function(uid1, uid2){
			var check = ref.child('likes').child(uid2).child(uid1);

			check.on('value', function(snap){
				if(snap.val() != null){
					ref.child('matches').child(uid1).child(uid2).set(true);
					ref.child('matches').child(uid2).child(uid1).set(true);

					$ionicPopup.alert({
						title: 'Matched',
						template: 'Yay, you guys are matched!'
					});
				}
			});
		},

		addMatch: function(uid1, uid2){
			ref.child('matches').child(uid1).child(uid2).set(true);
			ref.child('matches').child(uid2).child(uid1).set(true);
		},

		removeMatch: function(uid1, uid2){
			ref.child('matches').child(uid1).child(uid2).remove();
			ref.child('matches').child(uid2).child(uid1).remove();
		},

		createMessage: function(uid1, uid2, message){
			return ref.child('messages').child(uid1).child(uid2).push(message);	
		}


	};



	return Match;
});