angular.module('zenApp', ['ui.router', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider){

      // For any unmatched url, send to /route1
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
      // Let's get a reference to the input element, as we'll want to reference it.
      var inputElement = angular.element( element.children()[1] );

      // This directive should have a set class so we can style it.
      element.addClass( 'edit-in-place' );

      // Initially, we're not editing.
      $scope.editing = false;

      // ng-click handler to activate edit-in-place
      $scope.edit = function () {
        $scope.editing = true;

        // We control display through a class on the directive itself. See the CSS.
        element.addClass( 'active' );

        // And we must focus the element.
        // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function,
        // we have to reference the first element in the array.
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

  $scope.saved = localStorage.getItem('notes');
  $scope.notes = (localStorage.getItem('notes')!==null) ? JSON.parse($scope.saved) : [];
  localStorage.setItem('notes', JSON.stringify($scope.notes));

  $scope.addNote = function() {
    $scope.notes.push({
      title: $scope.noteText.substr(0,15),
      text: $scope.noteText,
      date: new Date()
    });
    $scope.noteText = ''; //clear the input after adding
    localStorage.setItem('notes', JSON.stringify($scope.notes));
  };

  console.log($scope.notes);

  $scope.delete = function(index) {
    console.log('delete');
    var oldNotes = $scope.notes;
    $scope.notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify($scope.notes));
  };

  $scope.updateNote = function(data){
    $scope.notes.push({
      title: data.substr(0,15),
      text: data,
      date: new Date()
    });
    $scope.notes.splice($stateParams.id, 1);
    localStorage.setItem('notes', JSON.stringify($scope.notes));
  }

  $scope.note = $scope.notes[$stateParams.id];
  console.log($scope.note);

  $scope.changeTransition = function(input){
    $scope.transition = input;
    console.log(input);
  };
}]);
