function showHome() {
  $('.about-us').hide();
  if(businessesArray.length) {
    $('.search-container').css({'margin-top': '274px', 'margin-right': 'auto', 'margin-bottom': '190px', 'margin-left': 'auto', 'transform': 'scale(1)'});
  }
  $('.search-container').show();
  $('#infoDisplay').hide();
};

function showAboutUs() {
  $('.about-us').show();
  $('.search-container').hide();
  $('#infoDisplay').hide();
};

function showList() {
  $('#mapSelector').removeClass('current');
  $('#listSelector').addClass('current');
  $('#results').show();
  $('#map').hide();
  $('#mapTwo').show();
  renderSingleResultMap('0');
}

function showMap() {
  $('#listSelector').removeClass('current');
  $('#mapSelector').addClass('current');
  $('#results').hide();
  $('#mapTwo').hide();
  $('#map').show();
  renderResultsMap();
}
