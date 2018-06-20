'use strict';

app.factory('SetProfile', function($firebaseArray){
	
	var ref = firebase.database().ref();

	var SetProfile = {
		setGender: function(uid, male){
			if(male){
				return ref.child('profiles').child(uid).child('gender').set('male');
			} else {
				return ref.child('profiles').child(uid).child('gender').set('female');
			}
		},

		setAge: function(uid, age){
			return ref.child('profiles').child(uid).child('age').set(age);
		},

		setProfilePic: function(uid, photo){
			return ref.child('profiles').child(uid).child('avatar').set(photo);
		}
	};

	return SetProfile;

});