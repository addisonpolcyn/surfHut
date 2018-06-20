'use strict';

app.factory('LikeItem', function($firebaseArray){
	var ref = firebase.database().ref();

	var Like = {
		addLike: function(uid1, uid2){
			return ref.child('loves').child(uid1).child(uid2).set(true);
		},

		removeLike: function(uid1, uid2){
			ref.child('loves').child(uid1).child(uid2).remove();
		}
	};

	return Like;
});