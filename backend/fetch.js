import { firebase, db } from './serverApp.js'
import { collection, query, where, getDocs } from 'firebase/firestore';

const usersRef = collection(db, "users");
const wishlistsRef = collection(db, "wishlists");
const connectionsRef = collection(db, "connections");


// Get user information from database
export const getUserInfo = (req, res) => {

    const uid = req.params.uid;
    const user = usersRef.find(u => u.uid === uid);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: `User with UID ${uid} not found` });
    }
};

// // Get list of all mentees from database
// const getMentees = (req, res) => {

//     const mentees = usersRef.filter(user => user.role === "hp");

//     // if (mentees.length > 0) {
//         res.status(200).json(mentees);
//     // } else {
//     //     res.status(404).json({ message: 'No mentees found' });
//     // }
    
// };

// // Getuser wishlist from database
// const getWishlist = (req, res) => {

//     const uid = req.params.uid;
//     const wishlist = wishlistsRef.find(w => w.uid === uid);

//     if (wishlist) {
//         if (wishlist.wishlist) {
//           res.status(200).json(wishlist);
//         } else {
//           res.status(400).json({
//             message: `User with UID ${uid} has no wishlist.`
//           });
//         }
//     } else {
//     res.status(400).json({
//         message: `User with UID ${uid} does not exist.`
//     });
//     }
// };

// // Get user connections from database
// const getConnections = async (req, res) => {

//     const uid = req.params.uid;
//     const q = query(connectionsRef, where("participants", "array-contains", uid));
//     const querySnapshot = await getDocs(q);

//     if (querySnapshot.empty) {
//         return res.status(400).json({
//           message: `User with UID ${uid} has no connections.`,
//         });
//     } else {
//         const connections = querySnapshot.docs.map(doc => doc.data());

//         res.status(200).json(connections);
//     }
// };

// // Add new user to database
// const addUser = async (req, res) => {
//     const uid = req.body.uid;
//     const first_name = req.body.first_name;
//     const last_name = req.body.last_name;
//     const bio = req.body.bio;
//     const profile_img = req.body.profile_img;
//     const role = req.body.role;
  
//     if (!uid || !first_name || !last_name || !bio || !role) {
//       return res.status(400).json({
//         message: "Missing required fields: uid / first_name / last_name / bio / role"
//       });
//     }
  
//     if (role !== "mentor" && role !== "hp") {
//       return res.status(400).json({
//         message: "Invalid role. Must be either 'mentor' or 'hp'."
//       });
//     }
  
//     const userQuery = query(usersRef, where("uid", "==", uid));
//     const userSnapshot = await getDocs(userQuery);

//     if (!userSnapshot.empty) {
//     return res.status(400).json({
//         message: `User with UID ${uid} already exists.`
//     });
//     }

//     await addDoc(usersRef, {
//     uid,
//     first_name,
//     last_name,
//     bio,
//     profile_img: profile_img || null,
//     role
//     });

//     res.status(200).json({
//     message: "User successfully added to the database."
//     });
// };

// // Create wishlist for user in database
// const createWishlist = async (req, res) => {
//     const uid = req.body.uid;
//     const wishlist = req.body.wishlist;
  
//     if (!uid || !wishlist) {
//       return res.status(400).json({
//         message: "Missing required fields: uid / wishlist"
//       });
//     }
  
//     const wishlistQuery = query(wishlistsRef, where("uid", "==", uid));
//     const wishlistSnapshot = await getDocs(wishlistQuery);

//     if (!wishlistSnapshot.empty) {
//     return res.status(400).json({
//         message: `Wishlist for user with UID ${uid} already exists.`
//     });
//     }

//     // If user does not exist, add the user to the database
//     await addDoc(usersRef, {
//     uid,
//     wishlist
//     });

//     res.status(200).json({
//     message: "Wishlist for user with UID ${uid} successfully added to the database."
//     });
// };

// // Create wishlist for user in database
// const addNewConnectionsList = async (req, res) => {
//     const participants = req.body.participants;
//     const status = req.body.status;
//     const messagesId = req.body.messagesId;
  
//     if (!participants || !status || !messagesId) {
//       return res.status(400).json({
//         message: "Missing required fields: participants / status / messagesId"
//       });
//     }
  
//     const wishlistQuery = query(wishlistsRef, where("uid", "==", uid));
//     const wishlistSnapshot = await getDocs(wishlistQuery);

//     if (!wishlistSnapshot.empty) {
//     return res.status(400).json({
//         message: `Wishlist for user with UID ${uid} already exists.`
//     });
//     }

//     // If user does not exist, add the user to the database
//     await addDoc(usersRef, {
//     uid,
//     wishlist
//     });

//     res.status(200).json({
//     message: "Wishlist for user with UID ${uid} successfully added to the database."
//     });
// };

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