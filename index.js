const path = require('path');  // THIS MODULE IS IN CHARGE OF WORKING WITH THE ROUTES AND JOIN DIRECTORIES
const express = require('express'); //REQUIRING EXPRESS
const app = express(); // INITIALIZING EXPRESS


//SETTINGS
app.set('port', process.env.PORT || 3000) // TAKING THE SYSTEM'S PORT OR PORT 3000


// STATIC FILES
const publicPath = path.join(__dirname, 'public');
// app.use(express.static(path.join(__dirname, 'public')));  //IT IS JOINING DIRNAME DIRECTORY WITH THE FILE PUBLIC. SENDING THIS TO THE EXPLORER, IT WILL ALWAYS LOOKG FOR THE STATIC FILES (ex: .HTML, .CSS, .JS)
app.use(express.static(publicPath));


app.get('/', (req, res) => {                      //ROUTE TO SHOW INDEX.HTML FROM THE PRINCIPAL FILE
    res.sendFile(path.join(__dirname, 'index.html'));
})


//STARTING THE SERVER
const server = app.listen(app.get('port'), () => {  // GETTING THE SERVER FROM THE VARIABLE ABOVE
    console.log('server on port ', app.get('port')); 
})

// WEBSOCKETS
const SocketIO = require('socket.io');  //REQUIRING THE SOCKET.IO MODULE
const io = SocketIO(server);


io.on('connection', (socket) => {  //WHEN SOMENTHING IS CONNECTED, RUN CODE
    console.log('new connection', socket.id);

    socket.on('CHAT:MESSAGE', (data) => {         //WE'RE RECEIVING THE DATA AND SENDING THE DATA TO THE CLIENTS
        io.sockets.emit('CHAT:MESSAGE', data);  //THIS IS TO EMIT THE DATA TO THE CLIENT FROM THE SERVER
    })

    socket.on('CHAT:TYPING', (data) => { 
        socket.broadcast.emit('CHAT:TYPING', data);  //WHEN EMIT EVERYONE, BUT THE ONE WHO SENT THE DATA. YOU USE BROADCAST
        
    })
});




