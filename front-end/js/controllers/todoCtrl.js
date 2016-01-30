todomvc.controller('todoCtrl', function todoCtrl ($scope, todoStorage) {
	var REFRESH_INTERVAL = 60000;
	var todos = $scope.todos = todoStorage.get();

	$scope.$watch('todos', function () {
		todoStorage.put(todos);
	}, true);

	$scope.addTodo = function () {
		if (!$scope.newTodo.length) {
			return;
		}
		todos.push({
			title: $scope.newTodo,
			completed: false
		});
		$scope.newTodo = '';
	};

	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
	};

	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		if (!todo.title) {
			$scope.removeTodo(todo);
		}
	};

	$scope.removeTodo = function (todo) {
		todos.splice(todos.indexOf(todo), 1);
	};

	$scope.refreshTodos = function () {
		todos = $scope.todos = todoStorage.get();
	}

	setInterval(function () {$scope.refreshTodos()}, REFRESH_INTERVAL);

});