'use strict';

app.controller('ListItemCtrl', function(profile, auth, Auth, uid, ListItem, $state, $ionicScrollDelegate, $timeout){
	
	var listt = this;

	var currentUid = uid;

	var viewScroll = $ionicScrollDelegate.$getByHandle('listItemScroll');

	init();

	function init(){
		listt.currentUser = profile;

		listt.boardInches = 11;
		listt.boardFeet = 7;
		listt.boardLength = 95;

		listt.modern_retro = '';
		listt.boardType = 'Surfboard';
		listt.condition = '';
		listt.mat = '';
		listt.price = '';
		listt.description = '';

		listt.brand = '';
		
		listt.setup = {
			single: false,
			twin: false,
			thruster: false,
			quad: false,
			nubster: false,
			na: true
		}

	/*	$timeout(function(){
			viewScroll.scrollTop();
		}, 1);*/
	};

	listt.changeBoardLength = function(){
		window.localStorage.setItem('boardLength', listt.boardLength);

		listt.boardInches = 12;
		listt.boardFeet = Math.trunc(listt.boardLength/12);
		listt.boardInches = listt.boardLength - (listt.boardFeet * 12);
	};

	listt.listItem = function(){
		listt.parsePrice(listt.price);
		if(listt.price == ''){
			listt.price = 0;
		} else {
			listt.price = parseInt(listt.price);	
		}

		if(listt.condition == ''){
			console.log("form is incomplete!");
		}

		var randomPhoto = {
			a: '/img/torq.jpg',
			b: '/img/arrow.jpg',
			c: '/img/stormblade.jpg'
		}
		var randomPhoto = '/img/ocean.jpg';
		var numberGenerator = Math.floor((Math.random() * 3) + 1);
		if(numberGenerator == 1){
			randomPhoto = '/img/torq.jpg';
		} else if(numberGenerator == 2){
			randomPhoto = '/img/arrow.jpg';
		} else {
			randomPhoto = '/img/stormblade.jpg';
		}

		var boardProfile = {
			ownerId: uid,
			ownerName: listt.currentUser.name,
			ownerAvatar: listt.currentUser.avatar,
			brand: listt.brand,
			price: listt.price,
			condition: listt.condition,
			description: listt.description,
			photo: randomPhoto,
			type: listt.boardType,
			length: listt.boardLength,
			material: listt.mat
			//	setup: listt.setup,
			//	modern_retro: listt.modern_retro

		}

		ListItem.createBoardProfile(boardProfile);

		Auth.getBoards().$loaded().then(function(data){
			var currentBoardId = data[data.length - 1].$id;

			ListItem.connectBoardToProfile(currentUid, currentBoardId);
		});

		
		console.log('Listed Item');

		init();
		$state.go('app.home');
	};

	listt.parsePrice = function(price){

		for(var i = 0; i < price.length; i++){
			if(price[i].charCodeAt(0) < 48 || price[i].charCodeAt(0) > 57){
				listt.price = '';
			}
		}
	}

});