# Tink multiselect Angular directive

v1.0.1

## What is this repository for?

The Tink Angular multiselect provides a dropdown that allows to select multiple options.

Tink is an in-house developed easy-to-use front-end framework for quick prototyping and simple deployment of all kinds of websites and apps, keeping a uniform and consistent look and feel

## Setup

### Prerequisites

* nodeJS [http://nodejs.org/download/](http://nodejs.org/download/)
* bower: `npm install -g bower`

### Install

1. Go to the root of your project and type the following command in your terminal:

   `bower install tink-multiselect-angular --save`

2. Add the following files to your project:

   `<link rel="stylesheet" href="bower_components/tink-core/dist/tink.css" />` (or one of the Tink themes)

   `<script src="bower_components/tink-multiselect-angular/dist/tink-multiselect-angular.js"></script>`

   `<script src="bower_components/tink-helper-safe-apply-angular/dist/tink-helper-safe-apply-angular.js"></script>`

3. Add `tink.multiselect` to your app module's dependency.

   `angular.module('myApp', ['tink.multiselect']);`

----------

## How to use

### tink-multiselect

```html
        <tink-multi-select data-ng-model="displayedItems" empty-text="None"></tink-multi-select>
```

### Options

Attr | Type | Default | Details
--- | --- | --- | ---
data-ng-model (required) | `object` | `''` | This variable holds an array with the shown items.
empty-text (required) | `string` | `''` | This string is shown when there are no items selected.
tink-show-searchbar (optional) | `boolean` | `false` | Provides a searchbar wich can filters the shows item set.
tink-display-property (optional) | `string` | `description` | This string holds the name of the property of the item to display
        
* An item that is selected will get the attr **isChecked** set to **true**
* Note: The Tink multiselect also works with the disabled attribute.


### Example

A working example can be found in [the Tink documentation](http://tink.digipolis.be/#/docs/directives/multiselect#example).

## Contribution guidelines

* If you're not sure, drop us a note
* Fork this repo
* Do your thing
* Create a pull request

## Who do I talk to?

* Jasper Van Proeyen - jasper.vanproeyen@digipolis.be - Lead front-end
* Tom Wuyts - tom.wuyts@digipolis.be - Lead UX
* [The hand](https://www.youtube.com/watch?v=_O-QqC9yM28)
