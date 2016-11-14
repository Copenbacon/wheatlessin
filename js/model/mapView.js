'use strict';
function initMap() {
        // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.5648, lng: -122.38655},
    zoom: 8
  });

  var form = document.getElementById('form-control');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    console.log(e.target.name.value);
    $.ajax({
      method:'GET',
      url:'http://localhost:3000/api?category_filter=gluten_free&location=' + e.target.name.value,
      success:function(data){
        data.businesses.forEach(function(element){
          console.log(element.location.coordinate);
          var coordinates = {
            lat:element.location.coordinate.latitude,
            lng:element.location.coordinate.longitude
          };
          console.log(coordinates);
          var marker = new google.maps.Marker({
            position: coordinates ,
            map: map,
          });
        });
      }
    });
  });
}
