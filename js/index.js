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
    changestatue:false
  }
  $scope.choseindex=0;
  // 保存到本地
  $scope.saveData = function() {
    localStorage.todo = angular.toJson(this.lists);
  }
  $scope.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'purple'];
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
     changestatue:false
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
  // 修改事件
  $scope.changeevent=function(index){
   $scope.current.project[index].changestatue=!$scope.current.project[index].changestatue;
  };
  $scope.changeeventend=function(index){
   $scope.current.project[index].changestatue=!$scope.current.project[index].changestatue;
  };
  if (!$scope.current && ($scope.lists.length == 0)) {
    $scope.addform();
    $scope.setCurrent(0);
  }
  if (!$scope.current && ($scope.lists.length != 0)) {
    $scope.setCurrent(0);
  }
}]);
myTodo.directive('setFocus', function(){
  return {
       scope:false,
       link:function(scope, element){
           scope.$watch("isFocus",function(newValue,oldValue, scope) {
               //大圣来了，且要取芭蕉扇
               if(newValue && scope.isCome){
                   element[0].focus(); //获取焦点
                   alert("猴哥，老牛不在家，我一介女子还不是你说什么我就照做，可你进入人家的身体也不打声招呼，进了就进了，还搞得我那么难受，求你别搞了，给，芭~~~蕉~~~扇！")
               }
          }, true);;
       }
   };
    });
