'use strict';

app.factory('ListItem', function($firebaseArray){

	var ref = firebase.database().ref();

	var ListItem = {
		createBoardProfile: function(boardProfile){	
			return ref.child('boards').push(boardProfile);
		},

		connectBoardToProfile: function(uid, boardId){
			return ref.child('profiles').child(uid).child('boards').child(boardId).set(true);

		},

		updateBoard: function(boardId, boardProfile){

			ref.child('boards').child(boardId).child('brand').set(boardProfile.brand);
			ref.child('boards').child(boardId).child('price').set(boardProfile.price);
			ref.child('boards').child(boardId).child('condition').set(boardProfile.condition);
			ref.child('boards').child(boardId).child('description').set(boardProfile.description);
			ref.child('boards').child(boardId).child('photo').set(boardProfile.photo);
			ref.child('boards').child(boardId).child('type').set(boardProfile.type);
			ref.child('boards').child(boardId).child('length').set(boardProfile.length);
			return ref.child('boards').child(boardId).child('material').set(boardProfile.material);
		},

		removeBoard: function(uid, boardId){
			ref.child('boards').child(boardId).remove();
			return ref.child('profiles').child(uid).child('boards').child(boardId).remove();
		}

	};
	
	return ListItem;
});