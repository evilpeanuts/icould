var myTodo = angular.module('icloud', []);
myTodo.controller('main', ['$scope','$timeout', function($scope,$timeout) {
  if (localStorage.todo) {
    $scope.lists = angular.fromJson(localStorage.todo);
  } else {
    $scope.lists = [];
  }
  var newcurrect = {};
  $scope.addproject={
    state:false,
    name:'',
  }
  $scope.choseindex=0;
  // 保存到本地
  $scope.saveData = function() {
    localStorage.todo = angular.toJson(this.lists);
  }
  $scope.colors = ['orange', 'yellow', 'green', 'blue', 'purple', 'brown','pink'];
  // 选颜色
  $scope.chosecolor = function(index) {
    $scope.current.theam = $scope.colors[index];
  }
  // 添加事项时打字事件
  $scope.mykey = function (e) {
            var keycode = window.event ? e.keyCode : e.which;//获取按键编码
            $scope.shake=false;
            if (keycode == 13) {
                $scope.addpro();//如果等于回车键编码执行方法
            }
  }

  // 添加提醒的事项
  $scope.addpro = function (){
   $scope.current.project.forEach(function(v,i){
     if(v.name == $scope.addproject.name){
       $scope.addproject.state=true;
     }
   });
  //  如果不重复 并且不为空
   (!$scope.addproject.state)&&($scope.addproject.name) ? $scope.current.project.push(angular.copy($scope.addproject)) : $scope.shake=true ;
   $scope.addproject={
     state:false,
     name:'',
   };
   $scope.saveData();
    $timeout(function(){
      $scope.shake=false;
    },[500]);
  }
  // 添加清单
  $scope.addform = function() {
    var len = $scope.lists.length;
    var color = $scope.colors;
    var id = (len == 0) ? 1001 : (Math.max.apply(null, $scope.lists.map(function(v, i) {
      return v.id;
    })) + 1)
    var list = {
      id: id,
      theam: color[len % 7],
      name: '清单' + (len + 1),
      project: [
      ]
    }
    $scope.current = list;
    $scope.lists.push(list)
    this.saveData();
  }
  // 清除完成事件
  $scope.clearsuccess = function() {
    $scope.current.project = $scope.current.project.filter(function(v, i) {
      return !v.state;
    });
    $scope.saveData();
  };
  // 当前下标
  $scope.setCurrent = function(index) {
    $scope.current = $scope.lists[index];
  }
  // 已完成几项
  $scope.setCurrenttodo=function(todo){
   $scope.currenttodo=todo;
  }
  // 删除清单
  $scope.deleteList = function(id) {
    $scope.lists = this.lists.filter(function(v, i) {
      return v.id !== id;
    });
    if ($scope.lists.length == 0) {
      $scope.add();
    }
    $scope.setCurrent($scope.lists.length-1);
    return $scope.saveData();
  }
  // 点击选项
  $scope.open = function() {
    $scope.show = !$scope.show;
    // newcurrect = angular.copy($scope.current);
  };
  // 点击选项关闭
  $scope.close = function() {
    $scope.show = !$scope.show;
  };
  // 点击保存
  $scope.success = function() {
    $scope.show = !$scope.show;
    $scope.saveData();
  };
  $scope.countdoneitem = function(){
     var r = 0;
     $scope.current.project.forEach(function(data){
         if(data.state){
       r += 1;
         }
     })
     return r;
   }
  if (!$scope.current && ($scope.lists.length == 0)) {
    $scope.addform();
    $scope.setCurrent(0);
  }
  if (!$scope.current && ($scope.lists.length != 0)) {
    $scope.setCurrent(0);
  }
}]);
