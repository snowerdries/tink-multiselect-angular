angular.module('tink.skeleton').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/multiselect.html',
    "<div class=row ng-style=getStyle()> <div class=col-xs-11> <span ng-if=noItemsSelected()>{{::emptyText}}</span>\n" +
    "<span ng-repeat=\"item in selectedItems()\"> {{item.description}}\n" +
    "<i class=\"fa fa-times\" ng-click=deselectItem(item)></i> </span> </div> <div class=col-xs-1 ng-click=changeEditMode()><i ng-if=!editMode class=\"fa fa-caret-down pull-right\"></i><i ng-if=editMode class=\"fa fa-caret-up pull-right\"></i></div> </div> <div ng-if=editMode class=row style=\"border: 1px solid #bbb\"> <div class=row style=\"padding-left: 15px\" ng-repeat=\"item in notSelectedItems() track by $index\" ng-click=\"item.isChecked=true\"> <div class=col-xs-12> {{item.description}} </div> </div> </div>"
  );

}]);
