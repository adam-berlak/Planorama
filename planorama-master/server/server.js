var express = require('express');
var app = express();
var path = require('path');
var serveStatic = require('serve-static');
const port = process.env.PORT || 5000;
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./queries.js');

console.log("dirname" + __dirname);
app.all('*', (req, res, next) => {
    console.log(`${req.method} :: ${req.url}`);
    next();
});

// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, 'static')));

app.use(serveStatic(__dirname + "/"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

 

app.all('*', (req, res, next) => {
    res.redirect('/');
});


io.on('connection', function (socket) {
    console.log("user connected");
    socket.on('disconnect', function () {
        console.log("User disconnected");
    });
    io.emit("test", "This is a test Message");

    /**
     * Server handler for when user wants to retrieve information for a specific event
     */
    socket.on('join-room', function(eventID) {
        socket.join(eventID);
        console.log('joined room: ' + eventID);
    });

    socket.on('leave-room', function(eventID) {
        socket.leave(eventID);
        console.log('left room: ' + eventID);
    });

    socket.on("clientEventRequest", function (eventID) {
        //Join room based on eventID when viewing event
        console.log('joined room');
        socket.join(eventID);
        //Query for the event
        db.getEventByID(eventID, (err, event) => {
            socket.emit('serverEventResponse', event);
        });
    });
    /**
     * Server handler for commenting on a specific event
     */
    socket.on("commentOnEvent", function (eventID, comment) {
        console.log("comment received");
        db.createEventMessage(eventID,comment, (err, comment) => {
            // socket.emit('serverCommentResponse', comment);
            io.to(eventID).emit('serverNewComment', comment); //emit the comment to all clients joined to the room
        })
    });
    /**
     * Server handler for getting the events for a specific user
     */
    socket.on("getMyEvents", function (userID) {
        db.getUserEventsByUserID(userID, (err, events) => {
           socket.emit('serverMyEventsResponse', events);
        });
    });

    socket.on("inviteUserToEvent", function(request){
        let userInformation = {username:request.username};
        let eventID = request.eventID;
        db.getUserByUsername(userInformation, (err, obj) => {
            if (obj != null) {
                let query = {"_id": eventID,
                            "userInfo": {
                                "username": obj.username,
                                'user_id': obj._id,
                                "status": "Pending",
                            }};
                console.log(obj);
                db.insertGuestByEventID(query, () => {
                })
            } else {
                socket.emit('serverCheckUserExistsResponse', "not found");
            }
        });

    });

    socket.on("acceptInvite", function(request){
        let userInformation = {username:request.username};
        let eventID = request.eventID;
        db.getUserByUsername(userInformation, (err, obj) => {
            if (obj != null) {
                let query = {"_id": eventID,
                    "userInfo": {
                        "username": obj.username,
                        'user_id': obj._id,
                    },
                    "status": "Going"};
                console.log(obj);
                db.updateGuestStatus(query, () => {
                })
            } else {
                socket.emit('serverCheckUserExistsResponse', "not found");
            }
        });

    });
    socket.on("declineInvite", function(request){
        let userInformation = {username:request.username};
        let eventID = request.eventID;
        db.getUserByUsername(userInformation, (err, obj) => {
            if (obj != null) {
                let query = {"_id": eventID,
                    "userInfo": {
                        "username": obj.username,
                        'user_id': obj._id,
                    },
                    "status": "Declined"};
                console.log(obj);
                db.updateGuestStatus(query, () => {
                })
            } else {
                socket.emit('serverCheckUserExistsResponse', "not found");
            }
        });

    });

    socket.on("clientCheckUserExists", function (userInformation) {
        db.getUserByUsername(userInformation, (err, obj) => {
            if (obj != null) {
                socket.emit('serverCheckUserExistsResponse', obj);
            } else {
                socket.emit('serverCheckUserExistsResponse', "not found");
            }
        });
    });
    socket.on("clientAccountCreation", function (userInformation) {
        db.insertNewUser(userInformation, (err, userObj) => {
            socket.emit('serverAccountCreationResponse', userObj);
        });
    });
    socket.on("clientAccountVerification", function (userInformation) {
        db.verifyUserByCredentials(userInformation, (err, response) => {
            if (response != null) {
                socket.emit('serverAccountVerificationResponse', "found");
            } else {
                socket.emit('serverAccountVerificationResponse', "not found");
            }
        });
    });
    
    socket.on("clientForgotPassword", function (userInformation) {
        db.getUserByEmail(userInformation, (err, response) => {
            if (response != null) {
                socket.emit('serverForgotPassword', "found");
            } else {
                socket.emit('serverForgotPassword', "not found");
            }
        });
    });
	socket.on("clientUpdatePassword", function (userInformation) {
        db.updateUserPassword(userInformation, (err, response) => {
            if (response != null) {
                socket.emit('serverUpdatePassword', "found");
            } else {
                socket.emit('serverUpdatePassword', "not found");
            }
        });
    });
    
    socket.on('editEvent', function(eventJSON) {
      console.log('edit-event-server-request');
      db.editEventByID(eventJSON, (err, response) => {
          console.log(response);
          if (response != null){
              socket.emit('editEventResponse', "event updated");
          } else {
            socket.emit('editEventResponse', "event update failed");
          }
      });
    }); 

    socket.on('createEvent', function(eventJSON) {
        console.log('create-event-server-request');
        db.insertNewEvent(eventJSON, (err, response) => {
            if (response != null){
                socket.emit('createEventResponse', "event created");
            } else {
              socket.emit('createEventResponse', "event creation failed");
              console.log(response);
            }
        });
      }); 
});

http.listen(port, function () {
    console.log('listening on port:'+ port);
});


//EXAMPLE QUERY CALLS
//All queries take two arguments, first is query JSON, second is the callback function which executes upon completion of the query. Likely want to emit where the console.log(user) is


/*
db.updateGuestStatus({ "_id": "0", "status":"CHANGED STATUS", "userInfo":{"user_id":"0", "username":"thenutcrunch"}}, function (err, event) {
  if (err) {
      console.log(err);
  }
  //Do something with user - could maybe socket.emit() here
  console.log(event);
  //return user;
});
*/

/*
db.insertGuestByEventID({ "_id": "0", "userInfo":{"user_id":"0", "username":"thenutcrunch", "status":"Pending"}}, function (err, event) {
  if (err) {
      console.log(err);
  }
  //Do something with user - could maybe socket.emit() here
  console.log(event);
  //return user;
});
*/
/*

db.createEventMessage({ "_id": "0", "comment":{"user_id":"0", "username":"thenutcrunch","message":"Where you at boiiii"}}, function (err, event) {
  if (err) {
      console.log(err);
  }
  //Do something with user - could maybe socket.emit() here
  console.log(event);
  //return user;
});
*/

/*
db.getUserEventsByUserID({ "_id": "9388455e-6c48-4085-9ed6-70a689f69a1d" }, function (err, event) {
    if (err) {
        console.log(err);
    }
    //Do something with user - could maybe socket.emit() here
    console.log(event);
    //return user;
});
*/
/*
db.deleteEventByID({ "_id": "b62969d0-6b81-46d0-b892-547aec904a0c"}, function (err, event) {
    if (err) {
        console.log(err);
    }
    //Do something with user - could maybe socket.emit() here
    console.log(event);
    //return user;
});
*/
/*
db.getEventByID({ "_id": "b62969d0-6b81-46d0-b892-547aec904a0c" }, function (err, event) {
    if (err) {
        console.log(err);
    }
    //Do something with user - could maybe socket.emit() here
    console.log(event);
    //return user;
});
*/

/*
db.deleteFriendIDbyUserID({"_id":"0", "username": "thenutcrunch", "friend_username":"4"}, function(err, friend) {
  if (err) {
    console.log(err);
  }
  //Do something with user - could maybe socket.emit() here
  console.log(friend);
  //return user;
});
*/

/*
db.getUserByID({ "_id":"9388455e-6c48-4085-9ed6-70a689f69a1d"}, function(err, user) {
  if (err) {
    console.log(err);
  }
  //Do something with user - could maybe socket.emit() here
  console.log(user);
  //return user;
});
*/

/*
db.addFriendByID({"_id":"0","friend_ids":['1','2','3','4','5','6']}, function(err, friend) {
  if (err) {
    console.log(err);
  }
  //Do something with user - could maybe socket.emit() here
  console.log(friend);
  //return user;
});
*/


/*
db.getUserByUsername({"username":"testUsername"}, function(err, user) {
  if (err) {
    console.log(err);
  }
  //Do something with user - could maybe socket.emit() here
  console.log(user);
  //return user;
});

*/

/*
db.getEventByID({"_id":"0"}, function(err, event) {
  if (err) {
    console.log(err);
  }
  //Do something with user - could maybe socket.emit() here
  console.log(event);
  //return user;
});
*/

/*
//Dummy data for insertNewUser function
let new_user = {
    //_id is assigned by server so don't send that in the request
    username : "My ID is 1",
    password_hash : "1337crew",
    salt : "EVERYTHINGISSALT",
    first_name : "The",
    last_name : "First",
    friend_ids : ["0"]
};

db.insertNewUser(new_user, function(err, id) {
  if (err) {
    console.log(err);
  }
  //Do something with user - could maybe socket.emit() here
  console.log("Created users id is: " + id);
  //return user;
}
)
*/
;
