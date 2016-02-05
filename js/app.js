angular.module('zenApp', ['ui.router', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise("/notes");

      $stateProvider
        .state('notes', {
            url: '/notes',
            templateUrl: 'partials/notes.html',
            controller: 'MainCtrl'
        })
        .state('notes.detail', {
          url: '^/notes/:id',
          views: {
            '@': {
              templateUrl: 'partials/notes.detail.html',
              controller: 'MainCtrl'
            }
          },
        })
        .state('newnote',{
          url: '/newnote',
          templateUrl: 'partials/newnote.html',
          controller: 'MainCtrl'
        });
})
.directive( 'editInPlace', function() {
  return {
    restrict: 'E',
    scope: { value: '=' },
    template: '<span ng-click="edit()" ng-bind="value"></span><textarea ng-model="value" id="textarea" name="textarea" onkeyup="resizeTextarea(\'textarea\')" data-resizable="true"></textarea>',
    link: function ( $scope, element, attrs ) {
      // Reference to the input element
      var inputElement = angular.element( element.children()[1] );

      // adding the class to the DOM element
      element.addClass( 'edit-in-place' );

      // Not editing yet
      $scope.editing = false;

      // ng-click function to activate edit-in-place
      $scope.edit = function () {
        $scope.editing = true;
        element.addClass( 'active' );
        inputElement[0].focus();
      };

      // When we leave the input, we're done editing.
      inputElement.prop( 'onblur', function() {
        $scope.editing = false;
        element.removeClass( 'active' );
      });
    }
  };
})
.controller('MainCtrl', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
  // setting localStorage and paralel variables to go back and forward from localStorage and our variable array.
  $scope.saved = localStorage.getItem('notes');
  $scope.notes = (localStorage.getItem('notes')!==null) ? JSON.parse($scope.saved) : [];
  localStorage.setItem('notes', JSON.stringify($scope.notes));

  // setting function for adding notes
  $scope.addNote = function() {
    $scope.notes.push({
      title: $scope.noteText.substr(0,15),
      text: $scope.noteText,
      date: new Date()
    });
    $scope.noteText = ''; //clear the input after adding
    localStorage.setItem('notes', JSON.stringify($scope.notes));
  };

  // setting function for deleting a note
  $scope.delete = function(index) {
    var oldNotes = $scope.notes;
    $scope.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify($scope.notes));
  };

  // setting a function for updating a note
  $scope.updateNote = function(data){
    $scope.notes.push({
      title: data.substr(0,15),
      text: data,
      date: new Date()
    });
    $scope.notes.splice($stateParams.id, 1);
    localStorage.setItem('notes', JSON.stringify($scope.notes));
  }

  // getting the id from the url
  $scope.note = $scope.notes[$stateParams.id];

  // function that help us change class for the transition effect
  $scope.changeTransition = function(input){
    $scope.transition = input;

  };
}]);
