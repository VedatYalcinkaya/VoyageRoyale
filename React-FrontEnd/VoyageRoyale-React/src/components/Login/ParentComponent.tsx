// import Sidebar from "../Sidebar/Sidebar";
// import React, { useState } from "react";


// const ParentComponent = () => {
//     const [isUserSignedIn, setIsUserSignedIn] = useState(false);
//     const [userInfo, setUserInfo] = useState<any>(null);
  
//     const handleSignInSuccess = () => {
//       setIsUserSignedIn(true);
//       // Fetch user information here and update userInfo state
//       setUserInfo:"Sample"
//     };
  
//     return (
//       <div>
//         {/* Other JSX */}
//         <Sidebar
//           isSignedIn={isUserSignedIn}
//           onSignOut={() => setIsUserSignedIn(false)}
//           userInfo={userInfo}
//           handleSignInSuccess={handleSignInSuccess}
//           onSignIn={handleSignIn} // Make sure onSignIn is passed here
//         />
//         {/* Other JSX */}
//       </div>
//     );
//   };
  