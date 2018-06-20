'use strict';

app.controller('SettingCtrl', function(Auth, $ionicPopup){
	var sett = this;

	sett.maxAge = window.localStorage.getItem('maxAge') || 25;

	sett.men = JSON.parse(window.localStorage.getItem('men')) || true;
	sett.men = sett.men === null ? true : sett.men;
	sett.women = JSON.parse(window.localStorage.getItem('women')) || false;
	sett.women = sett.women === null ? false : sett.women;

	sett.hardTop = JSON.parse(window.localStorage.getItem('hardTop')) || true;
	//sett.hardTop = sett.hardTop === null ? true : sett.hardTop;
	sett.softTop = JSON.parse(window.localStorage.getItem('softTop')) || true;
	//sett.softTop = sett.softTop === null ? true : sett.softTop;

	sett.new = JSON.parse(window.localStorage.getItem('new')) || true;
	sett.new = sett.new === null ? true : sett.new;
	sett.used = JSON.parse(window.localStorage.getItem('used')) || true;
	sett.used = sett.used === null ? true : sett.used;


	sett.changeMaxAge = function(){
		window.localStorage.setItem('maxAge', sett.maxAge);
	};


	sett.selectHardTop = function(){
		window.localStorage.setItem('hardTop', sett.hardTop);
	};
	sett.selectSoftTop = function(){
		window.localStorage.setItem('softTop', sett.softTop);
	};


	sett.selectNew = function(){
		window.localStorage.setItem('new', sett.new);
	};
	sett.selectUsed = function(){
		window.localStorage.setItem('used', sett.used);
	};


	sett.selectMen = function(){
		window.localStorage.setItem('men', sett.men);
	};

	sett.selectWomen = function(){
		window.localStorage.setItem('women', sett.women);
	};

	sett.logout = function(){
		$ionicPopup.confirm({
			title: 'Logout',
			template: 'Are you sure you want to logout?'
		})
		//res is respond, if res is yes then execute logoff else not
		.then(function(res){
			if(res){
				Auth.logout();
			}
		});

	};
});