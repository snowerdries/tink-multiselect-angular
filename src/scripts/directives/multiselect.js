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
        require: 'ngModel',
        //= parent scope, @ string, & function
        scope: {
            ngModel: '=',
            emptyText: '@',
            disabled:'=',
            isRequired:'='
        },
        link: function (scope, element, attrs, controller) {
            scope.attIsRequired = attrs.required;        
            scope.setValidity = controller.$setValidity;
            scope.makeFormDirty = controller.$setDirty;
            scope.showSearchbar = attrs.tinkShowSearchbar;
            scope.DisplayProperty = attrs.tinkDisplayProperty ? attrs.tinkDisplayProperty : "description";
            $(document).bind('click', function(event){
                var isClickedElementChildOfPopup = element
                    .find(event.target)
                    .length > 0;

                if (isClickedElementChildOfPopup){
                    if(scope.showSearchbar == "true" && scope.editMode){
                    document.getElementById('searchbar').focus();
                    };
                    return;
                }
                else {
                scope.editMode=false;
                scope.$apply();
                }
             });
        },
        controller: ['$scope','lodash',function ($scope,_) {
            $scope.noItemsSelected = function () {
                var selected = _.filter($scope.ngModel, function (item) {
                    return item.isChecked === true;
                });
                return selected.length === 0;
            };

            $scope.selectedItems=function() {
                var selected = _.filter($scope.ngModel, function (item) {
                    return item.isChecked;
                });         

               if ($scope.isRequired || $scope.attIsRequired) {
                    if (selected.length > 0) {
                        $scope.setValidity('required', true);
                    } else {
                        $scope.setValidity('required', false);
                    }
                } else {
					$scope.setValidity('required', true);
				}
                return selected;
            };

            $scope.changeEditMode = function () {
                if (!$scope.disabled) {
                    $scope.editMode = !$scope.editMode;
                }
            };

            $scope.deselectItem = function (item) {
                if (!$scope.disabled) {
                    $scope.makeFormDirty();
                    item.isChecked = false;
                }
            };

             $scope.selectItem = function (item) {
                if (!$scope.disabled) {
                    $scope.makeFormDirty();
                    item.isChecked = true;
                }
            };
            
              $scope.updateSearch = function(searchcrit){
                $scope.searchcrit = searchcrit;
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
