// const { Console } = require("console");

//const { default: firebase } = require("@firebase/app-compat");

//const { default: firebase } = require("@firebase/app-compat");
//const { FirebaseAuth } = require("@firebase/auth-types");



let renderTweetSnapshot = function(snapshot){
  let theTweet = snapshot.val();
  ``
  //PUT your tweet on screen here
  console.log(theTweet);
  console.log(snapshot.key);
  
  $(".like").off("click");
  $(".like").on("click", evt=>{
    let tweetid= $(evt.currentTarget).attr("data-tweetid");
    let tweetidref = firebase.database().ref(`/tweets/${tweetid}`);
    //let likecount = tweetlikelook[tweetid];
    //console.log(parseInt(likecount)+1,likecount);
    toggle_like(tweetidref,firebase.auth().currentUser.uid);

  });


  $("#tweetwrap").append(`
  <div class="card">
  <div class="card-header">
   ${theTweet.User}
  </div>
  <div class="card-body">
    <h5 class="card-title">${theTweet.likes}</h5>
    <p class="card-text">${theTweet.content}</p>
    <a data-tweetid="${snapshot.key}" class="like btn btn-primary">like</a>
  </div>
</div>
`);
};

let tweetsRef = firebase.database().ref("/tweets");






firebase.auth().onAuthStateChanged(user =>{
  if(!user){
    $("#Homepage").hide();
    $("#Login").show();
  }
  else{
    $("#Login").hide();
    $("#Homepage").show();
    rendertweet(user);
  }
})

tweetsRef.on("child_added", renderTweetSnapshot);


let toggle_like= (tweetref, uid) => {
  tweetref.transaction((t0bj) => {
    if (!t0bj){
      t0bj= {likes:0}
    }
    if (t0bj) {
      if (t0bj.likes && t0bj.likesuser[uid]) {
        t0bj.likes--;
        t0bj.likesuser[uid] = null;
      } else {
        t0bj.likes++;
        if (!t0bj.likes || !t0bj.likesuser) {
          t0bj.likesuser = {};
        }
        t0bj.likesuser[uid] = true;
      }
    }
    return t0bj;
  });
}


//let tweetlikelook = {};








$("#signout").on("click", evt=>{
  firebase.auth().signOut();
  console.log("signing out")
});


$("#signin").on("click",evt=>{
  let app = firebase.app();
  firebase.auth().onAuthStateChanged(user => {
    console.log(user);
    console.log("logged in");
  });
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
});

let rendertweet = (user) => {
  var name= user.displayName


   $("#clickme").on("click", evt=>{
     let newTweet = {
       content: $("#content").val() || "EMPTY",
       likes: 0,
       User: name
     }
     console.log(newTweet);
  
     tweetsRef.push(newTweet);
 });

};


