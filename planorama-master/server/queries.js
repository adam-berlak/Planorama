const mongoose = require('mongoose');
const uuid = require('uuid');


const { Schema } = mongoose;

const UsersSchema = new Schema({
    _id: String,
    username: String,
    password_hash: String,
    salt: String,
    first_name: String,
    last_name: String,
    friend_ids: [], //[“friend1_id”, “friend2_id”]
    email: String,
    verification_code: String
});

const EventsSchema = new Schema({
    _id: String,
    owner_id: String,
    owner_username: String,
    event_name: String,
    description: String,
    start_time: String,
    end_time: String,
    date: String,
    timestamp: String,
    location: String,
    userlist: [], //[{user_id: “id”, username: "String", status:”Going”},{user_id: “id”, status:”Pending”}],
    comments: [] //[{user_id: “String”, username: "String", timestamp: “String”, comment: “text”}]
});



let Users = mongoose.model('Users', UsersSchema);
let Events = mongoose.model('Events', EventsSchema);

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;



//Configure Mongoose
mongoose.connect('mongodb://admin:password1@ds117816.mlab.com:17816/heroku_0pk10bbr');
mongoose.set('debug', true);



//Node module.exports - write queries in here to be called from server.js
module.exports = {

    //USER BASED QUERIES
    getUserByID: function (userid, callback) {
        Users.find({ '_id': userid._id }, function (err, user) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, user[0]);
            }
        });
    },

    //INSERT NEW USER
    insertNewUser: function (new_user, callback) {
        //TO DO:
        //Should append a new unique _id to new_user JSON before saving, also change schema to what it should

        //Convert vanilla JSON to Users Schema object for insertion
        let new_userObj = new Users({
            _id: uuid.v4(),
            username: new_user.username,
            password_hash: new_user.password_hash,
            salt: new_user.salt,
            first_name: new_user.first_name,
            last_name: new_user.last_name,
            friend_ids: new_user.friend_ids
        });

        //Save new object to database
        new_userObj.save(function (err) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, new_userObj._id);
            }
        });
    },

    editUserByID: function (new_user, callback) {
        //Convert vanilla JSON to Users Schema object for insertion
        let new_userObj = new Users({
            _id: uuid.v4(),
            username: new_user.username,
            password_hash: new_user.password_hash,
            salt: new_user.salt,
            first_name: new_user.first_name,
            last_name: new_user.last_name,
            friend_ids: new_user.friend_ids
        });

        //Save new object to database
        Users.findOneAndUpdate({ '_id': new_userObj._id }, new_userObj, function (err, user) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },
    
    verifyUserByCredentials: function (userObj, callback) {
	Users.find({ 'username': userObj.username, 'password_hash': userObj.password_hash }, function (err, user) {
		if (err) {
			callback(err, null);
		} else {
			callback(null, user[0]);
		}
	});
     },

// Created useing the following tutorial: https://ourcodeworld.com/articles/read/264/how-to-send-an-email-gmail-outlook-and-zoho-using-nodemailer-in-node-js
// By Carlos Delgado
     getUserByEmail: function (userObj, callback) {
        Users.find({ 'email': userObj.email }, function (err, user) {
            if (err) {
                callback(err, null);
            } else {
				user.verification_code = "ABCDEF";
                
				let testAccount = nodemailer.createTestAccount();
				let transporter = nodemailer.createTransport({
					service: "hotmail",
					auth: {
					  user: 'SENG513Planorama@outlook.com', 
					  pass: 'planorama123' 
					},
					tls: {
						rejectUnauthorized: false
					}
				});
				
				var mailOptions = {
					from: '"Test email" <SENG513Planorama@outlook.com>', 
					to: userObj.email, 
					subject: 'Your verification code', 
					text: 'Your code', 
					html: '<b>Your code is: </b><br>' +  user.verification_code
				};
				
				transporter.sendMail(mailOptions, function(error, info){
					if(error){
						return console.log(error);
					}

					console.log('Message sent: ' + info.response);
				});
				
				callback(null, user[0]);
            }
        });
    },


	updateUserPassword: function (username, callback) {
		console.log(username.verification_code);
		Users.findOneAndUpdate({ 'username': username.username}, {'$push': {"password_hash": username.password_hash }}, function (err, friend) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, friend[0]);
			}
		});
    },

    getUserByUsername: function (username, callback) {
        Users.find({ 'username': username.username }, function (err, user) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, user[0]);
            }
        });
    },

    addFriendByID: function (new_friend, callback) {
        //Convert vanilla JSON to Users Schema object for insertion
        let new_friendObj = new Users({
            _id: new_friend._id,
            friend_ids: new_friend.friend_ids
        });

        //Save new object to database
        Users.findOneAndUpdate({ '_id': new_friendObj._id }, new_friendObj, function (err, friend) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },


    deleteFriendIDbyUserID: function (removedFriend, callback) {
        //Remove friend Id from friend id list
        Users.findOneAndUpdate({ '_id': removedFriend._id, 'username':removedFriend.username}, {'$pull': {"friend_ids": removedFriend.friend_username}}, function (err, friend) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },

    //EVENT BASED QUERIES
    getEventByID: function (eventid, callback) {
        Events.find({ '_id': eventid._id }, function (err, event) {
            if (err) {
                callback(err, null);
            } else {
                console.log("Sending event: " + event[0]);
                callback(null, event[0]);
            }
        });
    },

    //EVENT BASED INSERTS/EDITS
    insertNewEvent: function (new_event, callback) {
        //TO DO:
        //Should append a new unique _id to new_user JSON before saving, also change schema to what it should

        //Convert vanilla JSON to Users Schema object for insertion
        let dateArray = new_event.date.split('/');
        let timeArray = new_event.start_time.split(':');
        // subtract 1 to zero index
        let month = parseInt(dateArray[0]) -1;
        let day = parseInt(dateArray[1]);
        let year = parseInt(dateArray[2]);
        let hours = parseInt(timeArray[0]);
        let minutes = parseInt(timeArray[1]);
        let timestamp = new Date(year, month, day, hours, minutes);

        let new_eventObj = new Events({
            _id: uuid.v4(),
            owner_id: new_event.owner_id,
            owner_username: new_event.owner_username,
            event_name: new_event.event_name,
            description: new_event.description,
            start_time: new_event.start_time,
            end_time: new_event.end_time,
            date: new_event.date,
            timestamp: timestamp,
            location: new_event.location,
            userlist: new_event.userlist, //[{user_id: “id”, status:”Going”},{user_id: “id”, status:”Pending”}],
            comments: [] //[{user_id: “String”, timestamp: “String”, comment: “text”}]
        });

        //Save new object to database
        new_eventObj.save(function (err) {
            if (err) {
                callback(err, null);
                console.log(err);
            } else {
                callback(null, new_eventObj._id);
            }
        });
    },

    editEventByID: function (new_event, callback) {
        //Convert vanilla JSON to Users Schema object for insertion
        let new_eventObj = new Events({
            _id: new_event._id,
            owner_id: new_event.owner_id,
            event_name: new_event.event_name,
            description: new_event.description,
            start_time: new_event.start_time,
            end_time: new_event.end_time,
            date: new_event.date,
            location: new_event.location,
            userlist: new_event.userlist, //[{user_id: “id”, status:”Going”},{user_id: “id”, status:”Pending”}],
            comments: new_event.comments //[{user_id: “String”, timestamp: “String”, comment: “text”}]
        });

        //Save new object to database
        Events.findOneAndUpdate({ '_id': new_event._id }, new_eventObj, function (err, event) {
            if (err) {
                callback(err, null);
                
            } else {
                callback(null, true);
                console.log('database success\n');
            }
        });
    },

    deleteEventByID: function (event, callback) {
        //Save new object to database
        Events.deleteOne({ '_id': event._id }, function (err, event) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },


    getUserEventsByUserID: function (user, callback) {
        //Save new object to database
        Events.find({ "userlist.user_id" : user._id }, function (err, event) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, event);
            }
        });
    },

    createEventMessage: function (eventID, comment, callback) {
        //Save new object to database
        Events.findOneAndUpdate({ '_id': eventID }, {'$push': {"comments": comment}}, function (err, event) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, comment);
            }
        });
    },


    insertGuestByEventID: function (newGuest, callback) {
        //Save new object to database
        Events.findOneAndUpdate({ '_id': newGuest._id }, {'$push': {"userlist": newGuest.userInfo}}, function (err, event) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },

    updateGuestStatus: function (guest, callback) {
        //Save new object to database
        Events.updateOne({'_id': guest._id, "userlist.username":guest.userInfo.username, "userlist.user_id":guest.userInfo.user_id}, {"$set":{"userlist.$.status": guest.status}}, function (err, event) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, true);
            }
        });
    },

}
