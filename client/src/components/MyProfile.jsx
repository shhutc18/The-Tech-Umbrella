// this will act as the profile page for the user

import React from "react";

const MyProfile = () => {
    return (
        <div>
            <h1>Current Profile: Logged In</h1>
            <div>
                <h2>My Friends</h2>
                {/* code for rendering friends */}
            </div>
            <div>
                <h2>My Posts</h2>
                {/* code for rendering posts */}
            </div>
        </div>
    );
}

export default MyProfile;