$(document).ready(function() {
  var dataArray;
  var searchResults;
  var searchEntry;
  var i;
  var searchCreated = false;
  var deleteEntry;
  var containerDiv = document.getElementById("my-container");

  function createEntry(title, snippet) {
    searchEntry = document.createElement("div");
    searchEntry.innerHTML = "<a href='https://en.wikipedia.org/wiki/" + title + "' target='_blank'><h4>" + title + "</h4></a><p>" + snippet + "</p>";
    searchEntry.className = "search-entry";
    containerDiv.appendChild(searchEntry);
  }

  function deleteEntries() {
    deleteEntry = document.getElementsByClassName('search-entry');
    while (deleteEntry[0]) {
      deleteEntry[0].parentNode.removeChild(deleteEntry[0]);
    }
  }

  $("#input-box").keypress(function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      $("#btn-search").click();
    }
  });

  $("#btn-search").click(function() {
    dataArray = $("#form").serializeArray();
    // alert(JSON.stringify(dataArray));
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + dataArray[0].value + "&format=json&callback=?", function(data) {
      // alert(JSON.stringify(data));
      searchResults = data.query.search;
      if (searchCreated = true) {
        deleteEntries();
      }
      for (i = 0; i < searchResults.length; i++) {
        createEntry(searchResults[i].title, searchResults[i].snippet);
      }
      searchCreated = true;
    });
  });
});