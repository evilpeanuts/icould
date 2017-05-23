var myTodo = angular.module('icloud', []);
myTodo.controller('main', ['$scope', function($scope) {
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
  $scope.saveData = function() {
    localStorage.todo = angular.toJson(this.lists);
  }
  $scope.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'pink', 'purple'];
  $scope.chosecolor = function(index) {
    $scope.current.theam = $scope.colors[index];
  }
  $scope.mykey = function (e) {
            var keycode = window.event ? e.keyCode : e.which;//获取按键编码
            if (keycode == 13) {
                $scope.addpro();//如果等于回车键编码执行方法
            }
  }
  $scope.addpro = function (){
   $scope.addproject.state=false;
   $scope.current.project.forEach(function(v,i){
     if(v.name == $scope.addproject.name){
       $scope.addproject.state=true;
     }
   });
   $scope.addproject.state&&(!$scope.addproject.name) ?'': $scope.current.project.push(angular.copy($scope.addproject));
   $scope.addproject={
     state:false,
     name:'',
   }
  }
  $scope.add = function() {
    var len = $scope.lists.length;
    var color = $scope.colors;
    var id = (len == 0) ? 1001 : (Math.max.apply(null, $scope.lists.map(function(v, i) {
      return v.id;
    })) + 1)
    var list = {
      id: id,
      theam: color[len % 7],
      name: '清单' + (len + 1),
      project: [{
          name: '吃饭',
          state: true
        },
        {
          name: '睡觉',
          state: false
        },
        {
          name: '写代码',
          state: true
        },
        {
          name: '玩游戏',
          state: false
        }
      ]
    }
    $scope.current = list;
    $scope.lists.push(list)
    this.saveData();
  }

  $scope.setCurrent = function(index) {
    $scope.current = $scope.lists[index];
  }

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
  $scope.open = function() {
    $scope.show = !$scope.show;
    // newcurrect = angular.copy($scope.current);
  };
  $scope.close = function() {
    $scope.show = !$scope.show;

  };
  $scope.success = function() {
    $scope.show = !$scope.show;
    $scope.saveData();
  };
  $scope.clearsuccess = function() {
    $scope.current.project = $scope.current.project.filter(function(v, i) {
      return !v.state;
    });
    $scope.saveData();
  };
  if (!$scope.current && ($scope.lists.length == 0)) {
    $scope.add();
    $scope.setCurrent(0);
  }
  if (!$scope.current && ($scope.lists.length != 0)) {
    $scope.setCurrent(0);
  }

}])
