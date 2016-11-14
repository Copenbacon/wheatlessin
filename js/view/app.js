'use strict';
$(document).ready(function(){
  $('.nav-icon').on('click',function(){
    $('.navigation-items').toggle('slow');
  });
});
function compileHandlebars(template) {
  console.log(businessesArray);
  businessesArray.forEach( function(element) {
    var business = Handlebars.compile($(template).text());
    return business(element);
  });
}
