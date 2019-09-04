import io from "socket.io-client";

//Use this is you want to deploy
const socket = io();

//  Use this is you're running locally
// const socket = io("http://localhost:5000");






function connectToSocket(cb) {

  socket.on("test", message => {

    //console.log(message);

    cb(message);
  });
}

export { connectToSocket };

function getMyEvents(id,cb) {
    let userID = id;
    socket.emit("getMyEvents", id);
    socket.on('serverMyEventsResponse', events => {
       cb(events);
    });
}

/**
 * Client side API call to get an event
 * @param {int} id - ID of the event to retrieve
 * @param {function} cb - callback function passed to getEvent
 */
function getEvent(id, cb) {
  let eventObj;
  // create json query from id
  let json_id = {'_id': id};
  // emit request for specific event through the server
  socket.emit("clientEventRequest",json_id);
  // listen for response containing the event from the server
  socket.on("serverEventResponse", event => {
    //console.log(event);
    cb(event);
  });
}

function createEvent(eventJSON, cb) {
  console.log('edit-event-api-call')
  socket.emit('createEvent', eventJSON);
  socket.on('createEventResponse', comment => {
    cb(comment)
  });
}

function editEvent(eventJSON, cb) {
  console.log('edit-event-api-call')
  socket.emit('editEvent', eventJSON);
  socket.on('editEventResponse', comment => {
    cb(comment)
  });
}

function inviteToEvent(username, eventID, cb){
    let request = {'username': username, 'eventID': eventID};
    socket.emit('inviteUserToEvent',request)
}

function acceptInvite(username, eventID, cb){
    let request = {'username': username, 'eventID': eventID};
    socket.emit('acceptInvite',request)
}

function declineInvite(username, eventID, cb){
    let request = {'username': username, 'eventID': eventID};
    socket.emit('declineInvite',request)
}

// function commentOnEvent(eventID, comment, cb){
//     let event = {'_id': eventID, 'comment':comment};
//     // emit comment to be added to event
//     socket.emit('commentOnEvent', event);
//     // listen for response from server
//     socket.on('serverCommentResponse', comment => {
//        cb(comment);
//     });
// }

function checkAvailability(new_userObj, cb) {
  socket.emit("clientCheckUserExists", new_userObj);
  socket.on("serverCheckUserExistsResponse", userObj => {
    cb(userObj);
  });
}

function createUser(new_userObj, cb) {
  socket.emit("clientAccountCreation", new_userObj);
  socket.on("serverAccountCreationResponse", userObj => {
    cb(userObj);
  });
}

function sendConfirmationCode(new_userObj, cb) {
  socket.emit("clientForgotPassword", new_userObj);
  socket.on("serverForgotPassword", userObj => {
    cb(userObj);
  });
}

function updateUserPassword(new_userObj, cb) {
  socket.emit("clientUpdatePassword", new_userObj);
  socket.on("serverUpdatePassword", userObj => {
    cb(userObj);
  });
}

function verifyUser(new_userObj, cb) {
   socket.emit("clientAccountVerification", new_userObj);
   socket.on("serverAccountVerificationResponse", response => {
    cb(response);
   });
}

export { socket,
          getEvent, 
            acceptInvite,
              declineInvite,
              createUser,
                verifyUser,
                //  commentOnEvent,
                  checkAvailability,
                  getMyEvents,
                    createEvent,
                    inviteToEvent,
                      sendConfirmationCode,
                      updateUserPassword,
                        editEvent};

