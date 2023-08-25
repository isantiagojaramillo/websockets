const socket = io();  //IT IS LIKE THE FRONTEND CODE THAT WILL SEND THE EVENTS TO THE SERVER

// DOM ELEMENTS
let output = document.getElementById('output');
let action = document.getElementById('action');
let username = document.getElementById('username');
let message = document.getElementById('message');
let btn = document.getElementById('send');

btn.addEventListener('click', function() {
    socket.emit('CHAT:MESSAGE', {      // THIS IS TO EMIT THE DATA TO THE SERVER FROM THE CLIENT
        username: username.value,
        message: message.value
    })  

    console.log(username.value, message.value);
    
})

message.addEventListener('keypress', function() {
    socket.emit('CHAT:TYPING', username.value);
})

socket.on('CHAT:MESSAGE', function(data) {   //RECEIVING THE DATA FROM THE SERVER
    action.innerHTML = '';
    output.innerHTML += `<p>
        <strong> ${data.username} </strong>: ${data.message}
    </p>`
});


socket.on('CHAT:TYPING', function(data) {
    action.innerHTML += `<p>
        <em> ${data} is typing... </em>
    </p>`
})

