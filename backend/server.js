import express from 'express'
import cors from 'cors'
var app = express()
 
app.use(cors())

import { getUserInfo } from './fetch.js'

// GET route to send user information with specified user id to frontend
app.get('/api/user/:uid', getUserInfo); 

// // GET route to send all the homeless people in the database to frontend
// app.get('/api/mentees', fetchHandlers.getMentees);

// // GET route to send wishlist of user with specified user id to frontend
// app.get('/api/wishlist/:uid', fetchHandlers.getWishlist);

// // GET route to send connections for the user with specified user id to frontend
// app.get('/api/connections/:uid', fetchHandlers.getConnections);

// // POST route to add user to database
// app.post('/api/user', fetchHandlers.addUser);

// // POST route to create wishlist
// app.post('/api/wishlist', fetchHandlers.createWishlist);

// // POST route to add new connections list
// app.post('/api/connections', fetchHandlers.addNewConnectoinsList);

// // PUT route to update user information
// app.put('/api/user', fetchHandlers.updateUserInfo);

// // PUT route to update wishlist for a specified user
// app.put('/api/wishlist', fetchHandlers.updateWishlist);

// // PUT route to update connections list for a specified user
// app.put('/api/connections', fetchHandlers.updateConnectionsList);

// // DELETE route to remove a user by user ID from database
// app.delete('/api/user/:uid', fetchHandlers.removeUser);

// // DELETE route to remove the connections list for a user from database
// app.delete('/api/connections/:uid', fetchHandlers.removeConnectionsList);

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})