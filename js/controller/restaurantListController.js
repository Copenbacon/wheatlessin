
        // Initialize Firebase

        var config = {
          apiKey: "AIzaSyCry4sNTqlXyWJE60givvbX-08cXyuAFFQ",
          authDomain: "wheathless.firebaseapp.com",
          databaseURL: "https://wheathless.firebaseio.com",
          storageBucket: "wheathless.appspot.com",
          messagingSenderId: "1069070569638"
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



        function getRestaurants(){
          return firebase.database().ref('/restaurants').once('value');
        }
