
        // Initialize Firebase

        var config = {
            apiKey: "AIzaSyDU1ItVPRQ-lpe_QHFDqC4HVUcnkLvizzU",
            authDomain: "something-22053.firebaseapp.com",
            databaseURL: "https://something-22053.firebaseio.com",
            storageBucket: "something-22053.appspot.com",
            messagingSenderId: "304485328960"
        };
        firebase.initializeApp(config);

        function addComment(restaurantId, userName, comment, newCommentId) {
          firebase.database().ref('restaurants/' + restaurantId + '/comments/' + newCommentId).set({
            comment: comment,
            username: userName
          });
        }

        function getComments(restaurantId){
          return firebase.database().ref('/restaurants/' + restaurantId + '/comments').once('value');
        }

        // var restaurants = [];
        // yelpData.businesses.forEach(function(restaurant){
        //   if(restaurant.id){
        //     getComments(restaurant.id).then(function(response) {
        //       var comments = response.val();
        //       console.log(comments);
        //       restaurant.comments = comments;
        //       restaurants.push(restaurant);
        //     });
        //   }
        // });


        function getRestaurants(){
          return firebase.database().ref('/restaurants').once('value');
        }

        // var restaurants = [];
        // yelpData.businesses.forEach(function(restaurant){
        //   if(restaurant.id){
        //     getRestaurants().then(function(response) {
        //       var rests = response.val();
        //       for(restId in rests) {
        //         if(restaurant.id === rests[restId]) {
        //           restraurant.comments = rests[restId].comments;
        //           restaurants.push(restaurant);
        //         }
        //       }
        //     });
        //   }
        // });
