/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {

  "use strict";

  (function () {

    function getSearchResults(searchQuery, callback) {
      $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchQuery + "&format=json&callback=?", function (searchResults) {
        callback(searchResults);
      });
    }

    function displaySearchResults(searchResults) {
      $("#results-box").empty();
      for (var i=0; i<searchResults.query.search.length; i++) {
        var $div = $("<div>", {"class": "entry"});
        $div.append('<h4><a href="https://en.wikipedia.org/wiki/'+searchResults.query.search[i].title+'" target="_blank">'+searchResults.query.search[i].title+'</h4>');
        $div.append('<p>'+searchResults.query.search[i].snippet+' ...</p>');
        $("#results-box").append($div);
      }
    }

    $("#search").click(function () {
      getSearchResults($('#search-form').val(), displaySearchResults);
    });
    $("#search-form").keypress(function(event) {
      if (event.keyCode == 13) {
        event.preventDefault();
        $("#search").click();
      }
    })
  }());

});