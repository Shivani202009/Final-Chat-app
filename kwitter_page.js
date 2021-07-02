//YOUR FIREBASE LINKS
var firebaseConfig = {
    apiKey: "AIzaSyBDlzv1AbDYSpXvlsztyjgIeRHfQ4W17t4",
    authDomain: "my-chat-app-448a6.firebaseapp.com",
    databaseURL: "https://my-chat-app-448a6-default-rtdb.firebaseio.com",
    projectId: "my-chat-app-448a6",
    storageBucket: "my-chat-app-448a6.appspot.com",
    messagingSenderId: "168402561717",
    appId: "1:168402561717:web:febbd20247e1e4a490ecfc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//get username and roomname from local storage 

user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("roomname")

function send() {
    //get the message which user is typing from the text input
    message = document.getElementById("msg").value

    //send the message to database

    firebase.database().ref(room_name).push({
        USER: user_name, //USER is the key,user_name is a value
        MESSAGE: message, //MESSAGE is the key, message is its value
        LIKES: 0 //LIKES is the key, 0 is its value
    });
    document.getElementById("msg").value = "" // making the input empty

}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id)
                console.log(message_data)
                    //storing data recived from firbase in variables
                msg = message_data["MESSAGE"]
                console.log(msg)


                user = message_data["USER"]
                console.log(user)
                usertag = `<h4 style="color:green" >${user} : <span style="color:red"> ${msg} </span></h4>`



                like = message_data["LIKES"]
                console.log(like)
                buttontag = `<button class="btn btn-danger" id=${firebase_message_id} value=${like} onclick="update(this.id)"><span class="glyphicon glyphicon-thumbs-up"></span>  Like :  ${like}</button>`

                document.getElementById("output").innerHTML += usertag + buttontag + "<hr>"

                //End code
            }
        });
    });
}
getData();

function logout() {
    localStorage.removeItem("user_name")
    localStorage.removeItem("roomname")
    window.location = "index.html"
}


function update(id) {
    getlikes = document.getElementById(id).value
    updatedlikes = Number(getlikes) + 1
    console.log(updatedlikes)
    firebase.database().ref(room_name).child(id).update({
        LIKES: updatedlikes
    })
}