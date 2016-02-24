'use strict';
(function(module) {
  try {
    module = angular.module('tink.multiselect');
  } catch (e) {
    module = angular.module('tink.multiselect', ['ngLodash']);
  }
  module.directive('tinkMultiSelect', [function () {
    return {
        //'A' - only matches attribute name,'E' - only matches element name,'C' - only matches class name
        restrict: 'E',
        templateUrl: 'templates/multiselect.html',
        //= parent scope, @ string, & function
        scope: {
            model: '=',
            emptyText: '@',
            disabled:'='
        },
        controller: ['$scope','lodash',function ($scope,_) {
            $scope.noItemsSelected = function () {
                var selected = _.filter($scope.model, function(item) {
                    return item.isChecked === true;
                });
                return selected.length === 0;
            };

            $scope.selectedItems=function() {
                var selected = _.filter($scope.model, function (item) {
                    return item.isChecked;
                });
                return selected;
            };

            $scope.notSelectedItems=function() {
                var selected = _.filter($scope.model, function (item) {
                    return !item.isChecked;
                });
                return selected;
            };

            $scope.changeEditMode=function() {
                if (!$scope.disabled) {
                    $scope.editMode = !$scope.editMode;
                }
            };

            $scope.deselectItem = function (item) {
                if (!$scope.disabled) {
                    item.isChecked = false;
                }
            };

            $scope.getStyle = function () {
                if (!$scope.disabled) {
                    return { border: '1px',borderStyle:'solid',borderRadius: '0.2142857143rem' };
                } else {
                    return { border: '1px', borderStyle: 'solid',borderRadius: '0.2142857143rem', backgroundColor: '#eaeaea' };
                }
            };
        }]
    };
  }]);
})();
;angular.module('tink.multiselect').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/multiselect.html',
    "<div class=row ng-style=getStyle()> <div class=col-xs-11> <span ng-if=noItemsSelected()>{{::emptyText}}</span>\n" +
    "<span ng-repeat=\"item in selectedItems()\"> {{item.description}}\n" +
    "<i class=\"fa fa-times\" ng-click=deselectItem(item)></i> </span> </div> <div class=col-xs-1 ng-click=changeEditMode()><i ng-if=!editMode class=\"fa fa-caret-down pull-right\"></i><i ng-if=editMode class=\"fa fa-caret-up pull-right\"></i></div> </div> <div ng-if=editMode class=row style=\"border: 1px solid #bbb\"> <div class=row style=\"padding-left: 15px\" ng-repeat=\"item in notSelectedItems() track by $index\" ng-click=\"item.isChecked=true\"> <div class=col-xs-12> {{item.description}} </div> </div> </div>"
  );

}]);
