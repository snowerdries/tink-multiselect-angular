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
            disabled:'='
        },
        link: function (scope, element, attrs, controller) {
            scope.isRequired = attrs.required;
            scope.setValidity = controller.$setValidity;
            scope.makeFormDirty = controller.$setDirty;
            scope.showSearchbar = attrs.tinkShowSearchbar;
            scope.DisplayProperty = attrs.tinkDisplayProperty ? attrs.tinkDisplayProperty : "description";
             $(document).bind('click', function(event){
                var isClickedElementChildOfPopup = element
                    .find(event.target)
                    .length > 0;

                if (isClickedElementChildOfPopup)
                    return;

                scope.editMode=false;
                scope.$apply();
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

                if ($scope.isRequired) {
                    if (selected.length > 0) {
                        $scope.setValidity('required', true);
                    } else {
                        $scope.setValidity('required', false);
                    }
                }

                return selected;
            };

            $scope.notSelectedItems=function() {
                var selected = _.filter($scope.ngModel, function (item) {
                    return !item.isChecked;
                });
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
;angular.module('tink.multiselect').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/multiselect.html',
    "<div class=multiselect> <div class=faux-input data-ng-click=changeEditMode()> <span class=placeholder data-ng-if=noItemsSelected()>{{::emptyText}}</span>\n" +
    "<span class=label-primary data-ng-repeat=\"item in selectedItems()\"> {{item[DisplayProperty]}}\n" +
    "<button class=upload-btn-delete data-ng-click=\"deselectItem(item); $event.stopPropagation()\"><span class=sr-only>Leegmaken</span></button> </span> </div> <div data-ng-if=\"editMode && notSelectedItems() != ''\" class=popover> <input id=search ng-if=showSearchbar ng-model=search class=popover-search ng-model-options={debounce:333} placeholder=Search> <div class=popover-list> <ul class=popover-list-buttons> <li data-ng-repeat=\"item in ngModel | filter:search track by $index\" data-ng-click=selectItem(item)> <a href=\"\" ng-class=\"item.isChecked ? 'tink-bg-grass' :''\"><span>{{item[DisplayProperty]}}</span></a> </li> </ul> </div> </div> </div>"
  );

}]);
