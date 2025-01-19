import { db } from './serverApp.js'
import { collection, query, where, getDocs } from 'firebase/firestore';

const usersRef = db.collection("users");
const wishlistsRef = db.collection("wishlists");
const connectionsRef = db.collection("connections");


// Get user information from database
export const getUserInfo = async (req, res) => {
    const uid = req.params.uid;
    const user = await usersRef
                    .where("uid", "==", uid)
                    .get()

    if (user.empty) {
        return res.status(404).json({ message: `User with UID ${uid} not found` });
    } else {
        const userJson = user.docs.map(doc => doc.data())[0];
        return res.status(200).json(userJson);
    }
};

// Get list of all mentees from database
export const getMentees = async (req, res) => {

    const mentees = await usersRef.where("role", "==", "mentee").get()

    const menteesJson = mentees.docs.map(doc => doc.data());
    return res.status(200).json(menteesJson);
};

// Get user wishlist from database
export const getWishlist = async (req, res) => {

    const uid = req.params.uid;
    const wishlist = await wishlistsRef
                .where("uid", "==", uid)
                .get()

    if (wishlist) {
        const wishlistJson = wishlist.docs.map(doc => doc.data())[0];
        if (wishlistJson) {
          return res.status(200).json(wishlistJson);
        } else {
          return res.status(400).json({
            message: `User with UID ${uid} has no wishlist.`
          });
        }
    } else {
    return res.status(400).json({
        message: `User with UID ${uid} does not exist.`
    });
    }
};

// Get user connections from database
export const getConnections = async (req, res) => {

    const uid = req.params.uid;
    const connection = await connectionsRef
                        .where("participants", "array-contains", uid)
                        .get()

    if (connection.empty) {
        return res.status(400).json({
          message: `User with UID ${uid} has no connections.`,
        });
    } else {
        const connectionJson = connection.docs.map(doc => doc.data())[0];
        return res.status(200).json(connectionJson);
    }
};

// Add new user to database
export const addUser = async (req, res) => {
    const user = req.body

    if (!user.uid || !user.name || !user.role) {
      return res.status(400).json({
        message: "Missing required fields: uid / name / role"
      });
    }
  
    if (user.role !== "mentor" && user.role !== "mentee") {
      return res.status(400).json({
        message: "Invalid role. Must be either 'mentor' or 'hp'."
      });
    }
  
    const userQuery = await usersRef.where("uid", "==", user.uid).get();
    
    if (!userQuery.empty) {
        return res.status(400).json({
            message: `User with UID ${user.uid} already exists.`
        });
    } else {
        usersRef.add(user)
        .then(doc => res.status(200).json({message: "User successfully added to the database."}))
        .catch(err => res.status(500).json({message: err.message}));
    }
};

// // Create wishlist for user in database
export const createWishlist = async (req, res) => {
    const userWishlist = req.body
  
    if (!userWishlist.uid || !userWishlist.wishlist) {
      return res.status(400).json({
        message: "Missing required fields: uid / wishlist"
      });
    }
  
    const wishlistQuery = await wishlistsRef.where("uid", "==", userWishlist.uid).get();

    if (!wishlistQuery.empty) {
    return res.status(400).json({
        message: `Wishlist for user with UID ${userWishlist.uid} already exists.`
    });
    } else {
        wishlistsRef.add(userWishlist)
        .then(doc => res.status(200).json({message: `Wishlist for user with UID ${userWishlist.uid} successfully added to the database.`}))
        .catch(err => res.status(500).json({message: err.message}));
    }
};

// Create wishlist for user in database
export const addNewConnectionsList = async (req, res) => {
    const connection = req.body;
    
    if (!connection.participants || !connection.status || !connection.messagesId) {
      return res.status(400).json({
        message: "Missing required fields: participants / status / messagesId"
      });
    }

    const participant1 = connection.participants[0];
    const participant2 = connection.participants[1];
    const connectionsQuery1 = await connectionsRef
                            .where("participants", "array-contains", participant1)
                            .get();

    let connectionFound = false;
    connectionsQuery1.forEach(doc => {
    const connectionData = doc.data();
    if (connectionData.participants.includes(participant2)) {
        connectionFound = true;
    }
    });
    

    if (connectionFound) {
    return res.status(400).json({
        message: `Connection already exists`
    });
    } else {
        connectionsRef.add(connection)
        .then(doc => res.status(200).json({message: "Connection successfully added to the database."}))
        .catch(err => res.status(500).json({message: err.message}));
    }
};


// // Update user information in database
// const updateUserInfo = async (req, res) => {
//     const userQuery = query(usersRef, where("uid", "==", uid));
//     const userSnapshot = await getDocs(userQuery);


// }

// // Export handler functions to server.js
// module.exports = {
//     getUserInfo,
//     getMentees,
//     getWishlist,
//     getConnections,
//     addUser,
//     createWishlist,
//     addNewConnectoinsList,
//     updateUserInfo,
//     updateWishlist,
//     updateConnectionsList,
//     removeUser,
//     removeConnectionsList
//   };