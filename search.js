'use strict';

var SEARCH_KEY = "x-platform-js/search";
var searchTerms = [];

var drawSearchCloud = function(searches) {
  // converts the search into a dictionary of count
  var tag = {};
  searches.sort();
  searches.forEach(function(item) {
    if (item in tag) {
      tag[item]++;
    } else {
      tag[item] = 1;
    }
  });

  $("#tagList").empty();

  $("<ul>").attr("id", "tagList").appendTo("#searchCloud");
  $.each(tag, function(key, val) {
    var li = $("<li>");
    $("<a>").text(key).attr({title:"See all pages tagged with " + key, href:"#" + key}).appendTo(li);
    li.appendTo("#tagList");
    li.children().css("fontSize", (val / 10 < 1) ? val / 10 + 1 + "em": (val / 10 > 2) ? "2em" : val / 10 + "em");
  });
}

var storeSearch = function(searches) {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(searches));
}

var loadSearch = function() {
  var searches;
  try {
    searches = JSON.parse(localStorage.getItem(SEARCH_KEY));
  } catch(e) {
    console.log(e);
  }
  searches = searches || [];
  console.log('loaded ' + searches.length + ' items');
  return searches;
}

var handleSubmission = function (event) {
  event.preventDefault();
  var searchTerm = event.target.search.value;
  
  event.target.reset();

  var searches = loadSearch();
  searches.push(searchTerm);
  storeSearch(searches);
  searchTerms = searches;
  drawSearchCloud(searchTerms);
};

window.addEventListener('DOMContentLoaded', function () {
  searchTerms = loadSearch();
  drawSearchCloud(searchTerms);
  document.querySelector("#search-form").addEventListener('submit', handleSubmission);
});