function showHome() {
  $('.about-us').hide();
  $('.search-container').show();
};

function showAboutUs() {
  $('.about-us').show();
  $('.search-container').hide();
};

function showList() {
  $('#results').show();
  $('#map').hide();
}

function showMap() {
  $('#results').hide();
  $('#map').show();
  renderResultsMap();
}
