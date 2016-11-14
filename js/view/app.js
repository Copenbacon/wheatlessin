'use strict';
$(document).ready(function(){
  $('.nav-icon').on('click',function(){
    $('.navigation-items').toggle('slow');
  });
});

function compileHandlebars(template) {
  console.log(businessesArray);
  var renderBusiness = businessesArray.map(function(element) {
    console.log(element, 'element');
    var source = $(template).html();
    console.log(source, 'source');
    var business = Handlebars.compile(source);
    console.log(business(element), 'business(element)');
    return business(element);
  });
  return renderBusiness;
}
