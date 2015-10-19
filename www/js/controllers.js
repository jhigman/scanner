angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ScanCtrl', function($scope, $stateParams, Packs) {

  $scope.packs = [];

  $scope.scanBarcode = function() {
    cordova.plugins.barcodeScanner.scan(
        function (imageData) {
            pack = Packs.get(imageData.text);

            if (pack === null) {
              pack = {
                id: imageData.text,
                name: '',
                image: 'img/pill.jpg'
              };
            }

            $scope.packs.unshift(pack);

        },
        function (error) {
            alert("Scanning failed: " + error);
        }
     );
  };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
