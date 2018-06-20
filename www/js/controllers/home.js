'use strict';

app.controller('HomeCtrl', function(Auth, $scope, $ionicLoading, $ionicModal, 
	$ionicPopup, Like, Match, uid, Messages){
	
	var home = this;

	var currentUid = uid;
	home.currentIndex = 0;
	home.currentCardUid = null;

	var maxAge = null;
	var men = null;
	var women = null;

	var hardTop = null;
	var softTop = null;

	var newItem = null;
	var usedItem = null;
	//home.hearts = 'dark';
	home.message = '';

	$scope.show = function() {
		$ionicLoading.show({
			template: '<ion-spinner icon="bubbles"></ion-spinner>'
		});
	};

	$scope.hide = function(){
		$ionicLoading.hide();
	};

	function init(){

		$scope.show();

		home.profiles = [];
		home.boards = [];

		maxAge = JSON.parse(window.localStorage.getItem('maxAge')) || 60;

		men = JSON.parse(window.localStorage.getItem('men'));
		men = men === null? true : men;
		women = JSON.parse(window.localStorage.getItem('women'));
		women = women === null? true : women;

		hardTop = JSON.parse(window.localStorage.getItem('hardTop'));
		hardTop = (hardTop === null) ? true : hardTop;	
		softTop = JSON.parse(window.localStorage.getItem('softTop'));
		softTop = (softTop === null) ? true : softTop;

		newItem = JSON.parse(window.localStorage.getItem('new'));
		newItem = (newItem === null) ? true : newItem;
		usedItem = JSON.parse(window.localStorage.getItem('used'));
		usedItem = (usedItem === null) ? true : usedItem;

		console.log('newItem: ' + newItem);
		console.log('usedItem: ' + usedItem);

/*		Auth.getProfiles().$loaded().then(function(data){
			for(var i = 0; i < data.length; i++){
				if(data[i].age <= maxAge){
					if((data[i].gender == 'male' && men) || (data[i].gender == 'female' && women)){
						
						if(data[i].$id != currentUid){
							//console.log(data[i]);
							data[i].index = i-1;
							home.profiles.push(data[i]);
					//		console.log(data[i]);
						}
					}
				}
			}*/

		/*	Like.allLikesByUser(currentUid).$loaded().then(function(likesList){
				home.profiles = _.filter(home.profiles, function(obj){
					return _.isEmpty(_.where(likesList, {$id: obj.$id}));
				});
			});*/
			
	//		if(home.profiles.length > 0){
	//			home.currentCardUid = home.profiles[home.currentIndex].$id;
	//		}

	//	});
		home.cardUID = 0;
		Auth.getBoards().$loaded().then(function(data){
			for(var i = data.length - 1; i >= 0; i--){
				var item = data[i];

				//filter item
				if((item.material == 'Hard Top' && hardTop) || (item.material == 'Soft Top' && softTop)){
					if((item.condition != 'New' && usedItem) || (item.condition == 'New' && newItem)){
						
						//ready to pack item
						item.index = i;
						home.boards.push(item);
					}
				}

			}
		});

		$scope.hide();
	};	

	$scope.$on('$ionicView.enter', function(e){
		init();
	});

	home.like = function(i){
		if(home.boards.length > 0){
			var index = home.boards.length - i - 1;

			var boardId = home.boards[index].$id;
			var boardOwnerId = home.boards[index].ownerId;
			
			if(boardOwnerId != currentUid) {
				Like.likeBoard(currentUid, boardId);
				Match.addMatch(currentUid, boardOwnerId);

				//home.sendMessage(boardOwnerId, 'pineapples');
				console.log('Like');
			}
		}
	};

	home.cardRemoved = function(index){
		home.profiles.splice(index, 1);
		
		if(home.profiles.length > 0){
			home.currentCardUid = home.profiles[home.currentIndex].$id;
		}
	};

	$ionicModal.fromTemplateUrl('templates/info.html', {
		scope: $scope
	}).then(function(modal){
		$scope.modal = modal;
	});

	home.openModal = function(index) {
		if(home.profiles.length > 0){
			home.currentCardUid = home.profiles[index].$id;
			home.info = Auth.getProfile(home.currentCardUid);
		$scope.modal.show();
		}
	};

	home.closeModal = function() {
		$scope.modal.hide();
	};

	home.sendMessage = function (matchUid, message){

		Messages.historyMessages(matchUid,uid).$loaded()
		.then(function(data){
	
			home.messages = data;
		})
		console.log(MatchCtrl.matc.messages);
		if(home.message.length > 0){

			home.messages.$add({
				uid: currentUid,
				body: message,
				timestamp: firebase.database.ServerValue.TIMESTAMP

			}).then(function(){
				home.message = '';
				$timeout(function(){
					viewScroll.scrollBottom();
				}, 0);
			})
		}
	};

	home.logout = function(){
		$ionicPopup.confirm({
			title: 'Logout',
			template: 'Are you sure you want to logout?'
		})
		.then(function(res){
			if(res){
				Auth.logout();
			}
		});

	};

	home.getFeet = function(rawInches){
		return (Math.trunc(rawInches/12));
	};

	home.getInches = function(rawInches){
		return (rawInches - (Math.trunc(rawInches/12)*12))
	};

});