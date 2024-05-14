// // export const notify= ({type})=>{
// //     if(type==="follow"){
// //         return
// //     }
// //     else if(type==="follow"){}
// //     else if(type==="unfollow"){}
// //     else if(type==="removeFollower"){}
// //     else if(type==="sharePost"){}
// //     else if(type==="shareJob"){}
// //     else if(type==="react"){}
// //     else if(type==="comment"){}
// //     else if(type==="application"){}
// // }
// import admin from "firebase-admin";
// import serviceAccount from "../../jobfinder-f4d98-firebase-adminsdk-fx94o-53cf747437.json";

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// const message = {
//     notification: {
//     title: 'New Message',
//     body: 'You have a new message from a user.',
//     },
//     token: 'DEVICE_TOKEN',
// };

// admin.messaging().send(message)
//     .then((response) => {
//     console.log('Successfully sent message:', response);
//     })
//     .catch((error) => {
//     console.log('Error sending message:', error);
//     });