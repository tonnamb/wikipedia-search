/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {

  "use strict";

  function getSearchResults(searchQuery, callback) {
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchQuery + "&format=json&callback=?", function (searchResults) {
      callback(searchResults);
    });
  }

  function displaySearchResults(searchResults) {
    console.log(searchResults);
  }

  (function () {
    $("#search").click(function () {
      getSearchResults($('#search-form').val(), displaySearchResults);
    });
  }());

});