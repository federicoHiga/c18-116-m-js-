var database = firebase.database();

database.ref('https://c-18-116-m-html-default-rtdb.firebaseio.com/').once('value').then((snapshot) => {
  var data = snapshot.val();
  console.log(data);
}).catch((error) => {
  console.error(error);
});


