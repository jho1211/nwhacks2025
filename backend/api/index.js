import express from 'express'
import { getUserInfo, getMentees, addUser, getWishlist,
  getConnections, createWishlist, addNewConnectionsList,
  updateUserInfo, updateWishlist, updateConnectionsList,
  getMentors,
  } from './fetch.js'

const app = express();
app.use(express.json({'limit': '5mb'}));

app.get("/", (req, res) => res.send("Express on Vercel"));
// GET route to send user information with specified user id to frontend
app.get('/api/user/:uid', getUserInfo); 

// GET route to send all the homeless people in the database to frontend
app.get('/api/mentees', getMentees);

app.get('/api/mentors', getMentors);

// GET route to send wishlist of user with specified user id to frontend
app.get('/api/wishlist/:uid', getWishlist);

// GET route to send connections for the user with specified user id to frontend
app.get('/api/connections/:uid', getConnections);

// POST route to add user to database
app.post('/api/user', addUser);

// POST route to create wishlist
app.post('/api/wishlist', createWishlist);

// POST route to add new connections list
app.post('/api/connections', addNewConnectionsList);

// PUT route to update user information
app.put('/api/user', updateUserInfo);

// PUT route to update wishlist for a specified user
app.put('/api/wishlist', updateWishlist);

// PUT route to update connections list for a specified user
app.put('/api/connections', updateConnectionsList);

// // DELETE route to remove a user by user ID from database
// app.delete('/api/user/:uid', removeUser);

// // DELETE route to remove the connections list for a user from database
// app.delete('/api/connections/:uid', fetchHandlers.removeConnectionsList);
export default app;