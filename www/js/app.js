
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBQ4IWjKeHQrga-iZt_MnKUXANg9zcY5ek",
  authDomain: "wide-oasis-194104.firebaseapp.com",
  databaseURL: "https://wide-oasis-194104.firebaseio.com",
  projectId: "wide-oasis-194104",
  storageBucket: "wide-oasis-194104.appspot.com",
  //messagingSenderId: "407034050365"
};
firebase.initializeApp(config);

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'firebase', 'ionic.contrib.ui.tinderCards', 'ngCordova']) 

//.constant('FURL','https://console.firebase.google.com/project/wide-oasis-194104/overview')

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

 .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl as auth'
  })

  .state('app.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl as prof',
        resolve: {
          auth: function($state, Auth){
            //check if user is logged in
            return Auth.requireAuth().catch(function(){
              $state.go('login');
            });
          },

          profile: function(Auth){
            return Auth.requireAuth().then(function(auth){
              return Auth.getProfile(auth.uid).$loaded();
            });
          },

          uid: function(Auth){
            return Auth.requireAuth()
              .then(function(auth){
                return auth.uid;
              });
          }          
        }
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl as home',
        resolve: {
          auth: function($state, Auth){
            //check if user is logged in
            return Auth.requireAuth().catch(function(){
              $state.go('login');
            });
          },

          uid: function(Auth){
            return Auth.requireAuth()
              .then(function(auth){
                return auth.uid;
              });
          }
        }
      }
    }
  })

  .state('app.match', {
    url: '/match',
    views: {
      'tab-match': {
        templateUrl: 'templates/match.html',
        controller: 'MatchCtrl as matc',
        resolve: {
          auth: function($state, Auth){
            //check if user is logged in
            return Auth.requireAuth().catch(function(){
              $state.go('login');
            });
          },

          uid: function(Auth){
            return Auth.requireAuth()
              .then(function(auth){
                Auth.setOnline(auth.uid);
                return auth.uid;
              });
          },

          profile: function(Auth){
            return Auth.requireAuth()
              .then(function(auth){
                return Auth.getProfile(auth.uid).$loaded();
              })
          }
        }
      }
    }
  })


  .state('app.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingCtrl as sett',
        resolve: {
          auth: function($state, Auth){
            //check if user is logged in
            return Auth.requireAuth().catch(function(){
              $state.go('login');
            });
          },
        }
      }
    }
  })

  .state('app.listItem', {
    url: '/listItem',
    views: {
      'tab-listItem': {
        templateUrl: 'templates/listItem.html',
        controller: 'ListItemCtrl as listt',
        resolve: {
          auth: function($state, Auth){
            //check if user is logged in
            return Auth.requireAuth().catch(function(){
              $state.go('login');
            });
          },

          profile: function(Auth){
            return Auth.requireAuth()
              .then(function(auth){
                return Auth.getProfile(auth.uid).$loaded();
              })
          },

          uid: function(Auth){
            return Auth.requireAuth()
              .then(function(auth){
                Auth.setOnline(auth.uid);
                return auth.uid;
              });
          }

        }
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');  //redurect to home as fallback
});
