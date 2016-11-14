'use strict';
$(document).ready(function(){
  $('.nav-icon').on('click',function(){
    $('.navigation-items').toggle('slow');
  });
});

function compileHandlebars(template) {
  console.log(businessesArray);
  businessesArray.forEach( function(element) {
    console.log(element, 'element');
    var source = $(template).html();
    console.log(source, 'source');
    var business = Handlebars.compile(source);
    return business(element);
  });
}
