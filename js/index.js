var myTodo = angular.module('todolist',[]);
myTodo.controller('main',['$scope',function($scope){
  if(localStorage.lists) {
    $scope.lists = JSON.parse(localStorage.lists);
      $scope.current =   $scope.lists[0];
  }else{
    $scope.lists = [];
  }
  $scope.saveData = function(){
    localStorage.lists = JSON.stringify($scope.lists);
  };
$scope.color = ['red','orange','yellow','green','blue','pink','purple'];
  console.log($scope.lists);
  $scope.add = function(){
    var len = $scope.lists.length;

    var id = (len == 0)?1001:(Math.max.apply(null,$scope.lists.map(function(v,i){
      return v.id;
    })) + 1);
    var list = {id:id,
        theam: $scope.color[len%7],
        name:'清单'+(len+1),
        shixiang:[
          {name: '吃饭',state: true},
          {name: '睡觉',state: false},
          {name: '写代码',state: true},
          {name: '玩游戏',state: false}
        ]
       };
    $scope.current = list;
    $scope.lists.push(list);
    $scope.saveData();
  };

  $scope.setCurrent = function(index){
    $scope.current = $scope.lists[index];
  };

  $scope.deleteList = function(id){
    $scope.lists = this.lists.filter(function(v,i){
      return v.id !== id;
    });
    $scope.current=$scope.lists[$scope.lists.length-1];
    $scope.saveData();
  };
  $scope.replacecolor=function(index){
  $scope.current.theam=$scope.color[index];
  };
  $scope.savel=function(){
    $scope.show=!$scope.show;
    $scope.saveData();
  };
  $scope.cancel=function(){
    $scope.show=!$scope.show;
    $scope.lists = JSON.parse(localStorage.lists1);
  };
  $scope.currentName=function(){
  return $scope.current.thame;
  };
  $scope.showf=function(){
    $scope.show=!$scope.show;
    localStorage.lists1 = JSON.stringify($scope.lists);
  };
  $scope.clearstate=function(){
    $scope.current.shixiang=$scope.current.shixiang.filter(function(v,i){
     return v.state!==true;
  });
    $scope.saveData();
  };

}]);
