'use strict';
$(document).ready(function(){
  $('.nav-icon').on('click',function(){
    $('.navigation-items').toggle('slow');
  });
});

function compileHandlebars(template) {
  var restaurant = Handlebars.compile($(template).text());
  return restaurant;
}

$('.search-container').append(compileHandlebars('#restaurants-template'));
