'use strict';

todomvc.factory('todoStorage', function () {
	var LOAD_PATH = '/todo/back-end/load.php';

	return {
		get: function () {
			var hash = getTodos();
			return JSON.parse(hash || '[]');
		},

		put: function (todos) {
			String.prototype.replaceAt=function(index, character) {
			    return this.substr(0, index) + character + this.substr(index+character.length);
			}
			var hash = angular.toJson(todos);
			hash = checkTodosString(hash);
			sendTodos(hash);
		}
	};

	function sendTodos (todos) {
		$.ajax({
		  url: LOAD_PATH,
		  type: "POST",
		  data: "todos=" + todos,
		  success: function (data) {
		  },
		  dataType: "text"
		});		
	};

	function getTodos () {

		var value = 0;

		$.ajax({
		  url: LOAD_PATH,
		  data: "todos=get",
		  success: function (data) {
		  	value = data;
		  },
		  dataType: "text",
		  async: false
		});
		return value;
	};

	function checkTodosString (hash) {
		for (var i = 0, len = hash.length; i < len; i++) {
		  if (hash[i] == '\\') {
		  	if (hash[i+1] == '\"') {
		  		hash = hash.replaceAt(i, "").replaceAt(i+1, "\'");
		  	}
		  	if (hash[i+1] == '\\') {
		  		hash = hash.replaceAt(i, "").replaceAt(i+1, "/");
		  	}
		  }
		}
		return hash;
	};

});
