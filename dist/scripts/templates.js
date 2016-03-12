angular.module('tink.multiselect').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/multiselect.html',
    "<div class=multiselect> <div class=faux-input data-ng-click=changeEditMode()> <span class=placeholder data-ng-if=noItemsSelected()>{{::emptyText}}</span>\n" +
    "<span class=label-primary data-ng-repeat=\"item in selectedItems()\"> {{item[DisplayProperty]}}\n" +
    "<button class=upload-btn-delete data-ng-click=\"deselectItem(item); $event.stopPropagation()\"><span class=sr-only>Leegmaken</span></button> </span> </div> <div data-ng-if=editMode class=popover> <input id=searchbar ng-if=showSearchbar ng-model=searchcrit class=popover-search ng-change=updateSearch(searchcrit) ng-model-options={debounce:333} placeholder=Search> <div class=popover-list> <ul class=popover-list-buttons> <li data-ng-repeat=\"item in ngModel | filter:searchcrit track by $index\" data-ng-click=selectItem(item)> <a href=\"\" ng-class=\"item.isChecked ? 'tink-bg-grass' :''\"><span>{{item[DisplayProperty]}}</span></a> </li> </ul> </div> </div> </div>"
  );

}]);
