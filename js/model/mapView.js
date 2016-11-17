'use strict';
var businessesArray = [];
var myInfowindows = [];
$('#map').hide();
function initMap() {
        // Create a map object and specify the DOM element for display.
  $('#infoDisplay').hide();
  var form = document.getElementById('form-control');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    $('#mapTwo').hide();
    afterSearch();
    console.log(e.target.name.value);
    $.ajax({
      method:'GET',
      url: window.location.origin + '/api?category_filter=gluten_free&location=' + e.target.name.value,
      success:function(data){
        businessesArray = [];
        var trueLocations = data.businesses.filter(function(ele){
          return ele.location.coordinate;
        });

        getRestaurants().then(function(results){
          console.log(results.val());
          if (results.val()){
            var databaseRestaurants = results.val();
            trueLocations.forEach(function(ele){
              if(databaseRestaurants[ele.id]) {
                // we use the current element (restaurant) to get the restaunt id
                // we then use the restaurant id to access this restaurant's comments
                // that are in our database by restaurant id
                var comments = databaseRestaurants[ele.id].comments;
                ele.comments = comments;
                // we need to count the number comments in the comments object we use Object.keys
                // to get the keys as an array so that we can count the keys (number of comments) using .length
                ele.commentsCount = Object.keys(comments).length;
              }
              businessesArray.push(ele);
            });
          } else {
            businessesArray = trueLocations;
          }



          // businessesArray = trueLocations;
          $('#infoDisplay').show();
          $('#results').empty().append(compileHandlebars('#restaurants-template'));
          renderResultsMap();
          listItem();
          if (window.location.pathname !== '/map') {
            showList();
          };
        });
      }
    });
  });
};

var renderResultsMap = function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: businessesArray[0].location.coordinate.latitude, lng: businessesArray[0].location.coordinate.longitude},
    zoom: 12
  });

  businessesArray.forEach(function(e){
    var coordinates = {
      lat:e.location.coordinate.latitude,
      lng:e.location.coordinate.longitude
      // console.log(e);
    };
    if(!contentString){
      var contentString = '<div class="content">' +
          '<a href=' + e.url + '>' + e.name + ' </a>' + '<br>' + '<p>' + e.location.display_address + '<p>' + '</div>';

    }

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: coordinates,
      map: map
    });
    myInfowindows.push(infowindow);

    marker.addListener('click', function() {
      myInfowindows.forEach(function(myInfoWindow) {
        myInfoWindow.close();
      });
      infowindow.open(map, marker);
    });
    return marker;
  });
};
