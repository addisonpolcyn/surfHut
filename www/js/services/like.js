'use strict';

app.factory('Like', function($firebaseArray){
	var ref = firebase.database().ref();

	var Like = {
		allLikesByUser: function(uid){
			return $firebaseArray(ref.child('likes').child(uid));
		},

		likeBoard: function(uid, boardId){
			return ref.child('loves').child(uid).child(boardId).set(true);
		},

		removeLike: function(uid1, boardId){
			ref.child('loves').child(uid1).child(boardId).remove();
		}
	};

	return Like;
});