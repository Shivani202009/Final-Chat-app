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

username = localStorage.getItem("user_name")
document.getElementById("welcome").innerHTML = "Welcome " + username + " !"


function addroom() {
    roomname = document.getElementById("roominput").value
    firebase.database().ref("/").child(roomname).update({
        status: "roomname added"
    })
    localStorage.setItem("roomname", roomname)
    window.location = "kwitter_page.html"
}

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log(Room_names)
            row = `<div class="room_name" id=${Room_names} onclick="go_to_room(this.id)">${Room_names}</div><hr>`
            document.getElementById("output").innerHTML += row
                //End code
        });
    });
}
getData();

function go_to_room(room) {
    console.log(room)
    localStorage.setItem("roomname", room)
    window.location = "kwitter_page.html"
}

function logout() {
    localStorage.removeItem("user_name")
    localStorage.removeItem("roomname")
    window.location = "index.html"
}