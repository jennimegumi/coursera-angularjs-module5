(function () {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;
    service.user = {};

    service.saveUser = function (user) {
      service.user = angular.copy(user);
      console.log(service.user);
    }

    service.getUser = function () {
      return service.user;
    }

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };


    service.getMenuItems = function (category) {
      return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
        console.log(ApiPath + '/menu_items/' + category + '.json')
        return response.data;
      });
    };

    service.getFavoriteDish = function (short_name) {
      if (short_name && short_name !== "") {
        var splitInput = short_name.split(/(\d+)/).filter(function (value) {
          return value !== "";
        });
    
        var category = splitInput[0];
        var menuItemIndex = splitInput[1] - 1;
    
        return $http.get(ApiPath + '/menu_items/' + category + '/menu_items/' + menuItemIndex + '.json')
          .then(function (response) {
            response.category = category; // Add the category value to the response object
            return response; // Return the modified response object
          });
      } else {
        return Promise.reject("Short name is not provided");
      }
    }
    

  }



})();
