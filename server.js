'use strict';
var Yelp = require('yelp');
var express = require('express'),
  port = process.env.PORT || 3000,
  app = express();


var yelp = new Yelp({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  token:process.env.token,
  token_secret: process.env.token_secret,
});



app.use(express.static('./'));


app.get('/api', function(request, response) {
  // console.log('New request:', request.url);
  var params = { term: 'restaurant', location: 'Seattle' };
  if(request.query.location) {
    params.location = request.query.location;
  }

  if(request.query.category_filter) {
    params.category_filter = request.query.category_filter;
  }
  yelp.search(params)
  .then(function (data) {
    response.json(data);
  })
  .catch(function (err) {
    console.error(err);
  });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
