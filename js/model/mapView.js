'use strict';
var businessesArray = [];
var myInfowindows = [];
$('#map').hide();
$('#mapTwo').hide();
function initMap() {
        // Create a map object and specify the DOM element for display.
  $('#infoDisplay').hide();
  var form = document.getElementById('form-control');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    afterSearch();
    console.log(e.target.name.value);
    $.ajax({
      method:'GET',
      url:'http://localhost:3000/api?category_filter=gluten_free&location=' + e.target.name.value,
      success:function(data){
        businessesArray = [];
        data.businesses.forEach(function(element){
          console.log(element.location.coordinate);
          // console.log(element);
          var trueLocations = data.businesses.filter(function(ele){
            return ele.location.coordinate;
          });
          businessesArray = trueLocations;
          console.log(businessesArray, 'businessesArray');
        });
        $('#mapTwo').show();
        renderSingleResultMap('0');
        $('#infoDisplay').show();
        $('#results').empty().append(compileHandlebars('#restaurants-template'));
        renderResultsMap();
        listItem();
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
