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
                    return { border: '1px',borderStyle:'solid',borderColor:'#c5c5c5',borderRadius: '0.2142857143rem' };
                } else {
                    return { border: '1px', borderStyle: 'solid',borderColor:'#c5c5c5',borderRadius: '0.2142857143rem', backgroundColor: '#eaeaea' };
                }
            };
        }]
    };
  }]);
})();
