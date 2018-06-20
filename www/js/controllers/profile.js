'use strict';

app.controller('ProfileCtrl', function(profile, uid, SetProfile, ListItem, Auth, $firebaseArray, $scope, $ionicModal, $ionicPopup){
	
	var prof = this;

	prof.currentUser = profile;

	prof.usersAge = 0;
	var currentUid = uid;

	prof.previewHeartColor = 'Red';

	function init(){
		if(prof.currentUser.gender === 'male'){
			prof.male = true;
			prof.female = false;
		} else if(prof.currentUser.gender === 'female'){
			prof.male = false;
			prof.female = true;
		} else {
			prof.male = false;
			prof.female = false;
		}

		prof.listings = [];

		Auth.myBoards(currentUid).$loaded().then(function(data){

			for(var i = data.length - 1; i >= 0; i--){
				var board = Auth.getBoard(data[i].$id);
				prof.listings.push(board);
			}

		});

	};
	
	$scope.$on('$ionicView.enter', function(e){
		init();
	});

	$ionicModal.fromTemplateUrl('templates/preview.html',{
		id: 1,
		scope: $scope
	}).then(function(modal){
		$scope.previewModal = modal;
	});

	$ionicModal.fromTemplateUrl('templates/update.html',{
		id: 2,
		scope: $scope
	}).then(function(modal){
		$scope.updateModal = modal;
	});

	prof.openModal = function (id, item){
		prof.currentItem = item;

		if(id == 1){
			$scope.previewModal.show();
		} else {
			$scope.updateModal.show();
		}
	};

	prof.closeModal = function (id){

		if(id == 1){

			init();
			$scope.previewModal.hide();
		} else {
			$scope.updateModal.hide();
		}
	};

	prof.updateItem = function(itemId, item){
		ListItem.updateBoard(itemId, item);

		prof.closeModal(2);
		prof.closeModal(1);
	};

	prof.removeItem = function(itemId){
		
		var template = 'Are you sure you want to remove ' + prof.currentItem.brand + ' ' + 
		prof.currentItem.type + ' ?';

		$ionicPopup.confirm({
			title: 'Remove',
			template: template
		}).then(function(res){
			if(res){
				ListItem.removeBoard(currentUid, itemId);
				prof.closeModal(1);
			}
		});
		
	};

	prof.getFeet = function(rawInches){
		return (Math.trunc(rawInches/12));
	};

	prof.getInches = function(rawInches){
		return (rawInches - (Math.trunc(rawInches/12)*12))
	};

	prof.iAmMan = function(){
		console.log('Gender changed to man');
		prof.male = true;
		prof.female = false;
		SetProfile.setGender(currentUid, prof.male);
	};

	prof.iAmWoman = function(){
		console.log('Gender changed to woman');
		prof.female = true;
		prof.male = false;
		SetProfile.setGender(currentUid, prof.male);
	};

	prof.changedAge = function(){
		console.log('users age changed to: ' + prof.usersAge);
		SetProfile.setAge(currentUid, prof.usersAge);
	};

	prof.changeAvatar = function(){
		console.log('profile pic changed');
		SetProfile.setProfilePic(currentUid, )
	};

	prof.test = function(){
		console.log('pinged');
	};

});