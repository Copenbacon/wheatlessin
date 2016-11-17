'use strict';
function listItem() {
  $('.restaurant-display').on('click', function(e){
    e.stopPropagation();
    var index = $(this).index();
    console.log(index, 'index of this element');
    $('#mapTwo').show();
    renderSingleResultMap(index);
  });

  $('.show-comments').on('click', function(e){
    e.stopPropagation();
    var buttonId = $(this).data('show-comments');
    $('#' + buttonId + '-comments').toggleClass('active');
  });

  $('.add-comment').on('click', function(e){
    e.stopPropagation();
    var buttonId = $(this).data('add-comment');
    $('#'+ buttonId + '-comment-form').toggleClass('active');
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
      var restaurantId = data.businessId;
      var userName = $('#' + buttonId + 'name').val();
      var input = $('#' + buttonId + 'comment').val();
      $('#' + buttonId + 'comment').val('');
      $('#' + buttonId + 'name').val('');
      var comment = input;
      // generate unique comment ID so that we don't try to insert a comment using an ID that already exists
      var newCommentId = firebase.database().ref().child('restaurants').child(restaurantId).child('comments').push().key;
      addComment(restaurantId, userName, comment, newCommentId);
      // getComments(restaurantId).then(function(result){
      //   console.log(result.val());
      // })
    }
    // firebase.database().ref('restaurants/').on('child_added', function() {
    //   var dataSearch = firebase.database().ref('restaurants/' + restaurantId + '/comments').orderByChild('comments');
    //   console.log(dataSearch);
    // });
  });
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
