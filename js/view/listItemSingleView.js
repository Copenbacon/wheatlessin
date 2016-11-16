'use strict';
function listItem() {
  $('.restaurant-display').on('click', function(){
    var index = $(this).index();
    console.log(index, 'index of this element');
    $('#mapTwo').show();
    renderSingleResultMap(index);
  });

  $('.comment-button').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    var data = e.target.dataset;
    var buttonId = data.businessId;
    console.log(this);
    console.log(buttonId);
    // console.log(e.target.dataset)
    if(data && data.businessId) {
      var restaurantId = data.businessId
      var userName = "Chaimae";
      var input = $('#' + buttonId).val();
      var comment = input;
      // generate unique comment ID so that we don't try to insert a comment using an ID that already exists
      var newCommentId = firebase.database().ref().child('restaurants').child(restaurantId).child('comments').push().key;
      addComment(restaurantId, userName, comment, newCommentId);
      getComments(restaurantId);
    }
  })
}

var renderSingleResultMap = function(e) {
  var map = new google.maps.Map(document.getElementById('mapTwo'), {
    center: {lat: businessesArray[e].location.coordinate.latitude, lng: businessesArray[e].location.coordinate.longitude},
    zoom: 18
  });

  var coordinates = {
    lat:businessesArray[e].location.coordinate.latitude,
    lng:businessesArray[e].location.coordinate.longitude
  };

  var marker = new google.maps.Marker({
    position: coordinates,
    map: map
  });

  if(!contentString){
    var contentString = '<div class="content">' +
        '<a href=' + businessesArray[e].url + '>' + businessesArray[e].name + ' </a>' + '<br>' + '<p>' + businessesArray[e].location.display_address + '<p>' + '</div>';

  }

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
};
