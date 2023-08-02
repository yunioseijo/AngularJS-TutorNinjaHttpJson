// como voy a usar la lib route tengo que pasarla como parametro
var myNinjaApp = angular.module('myNinjaApp', ['ngRoute']);

// creo el método config usando el objeto routeProvider
myNinjaApp.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider
    .when('/home',{templateUrl: 'app/views/home.html',controller: 'NinjaController'})
    .when('/directory',{templateUrl: 'app/views/directory.html', controller: 'NinjaController'})
    .otherwise({redirectTo: '/home'});
  }]);

myNinjaApp.directive('randomNinja', [function(){
  return {
    restrict: 'E',
    scope: {ninjas: '=', title: '='},
    // con esta opcion solo pueedo agregar código
    // template: '<img ng-src="{{ninjas[0].thumb}}">', 
    // de esta forma puedo toda una estrucutra a mi conveniencia
    templateUrl: 'views/random.html', 
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 4);

    }
  };
}
]);

myNinjaApp.controller('NinjaController',['$scope', '$http', function($scope, $http){
  $scope.removeNinja = function(ninja){
    
    // var removeNinjaIndex = $scope.ninjas.indexOf(ninja);
    // $scope.ninjas.splice(removeNinjaIndex, 1);
    $scope.ninjas = $scope.ninjas.filter(function(item) {
      return item !== ninja;
  }); 
  }

  $scope.addNinja=function(){
    $scope.ninjas.push({
      name: $scope.newninja.name,
      belt: $scope.newninja.belt,
      rate: parseInt($scope.newninja.rate),
      available: true
    });
    $scope.newninja.name="";
    $scope.newninja.belt="";
    $scope.newninja.rate="";
  };


  // estos datos los voy a cargar desde un fichero externo  como un JSON, para ello necesito usar 
  // el servicio de http de angular y pasarselo como parámetro al controlador
  // $scope.ninjas = [
  //   {name: 'Yoshi',belt: 'green', rate:50,available:true,thumb: 'content/image/cat-ninja.webp'},
  //   {name: 'Crystal',belt: 'yellow', rate:30,available:true,thumb: 'content/image/ninja_octopus.webp'},
  //   {name: 'Ryu',belt: 'orange', rate:70,available:false,thumb: 'content/image/ninja_technology.webp'},
  //   {name: 'Shaun',belt: 'black', rate:100,available:true,thumb: 'content/image/sloth-ninja-hang.webp'}
  // ];

  // console.log(angular.toJson($scope.ninjas));

  $http.get('data/ninjas.json')
  .then(function(response) {
    $scope.ninjas = response.data;
  })
  .catch(function(error) {
    // Manejar el error en caso de que ocurra
    console.error('Error al obtener los datos:', error);
  });

}]);