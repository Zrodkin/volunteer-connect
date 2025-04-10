import React from "react";
import { Link } from "react-router-dom";

function Navbar({ onLogout, userRole, authenticated }) {
  return (
    <div className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold">ShlichusLinks</h1>
      <div className="space-x-4 text-sm">
        {/* Show Bochurim Board link for both Bochurim and Shluchim */}
        {(userRole === "shliach" || userRole === "bochur") && (
          <Link to="/message-board/bochur" className="hover:underline">
            Bochurim Board
          </Link>
        )}

        {/* Show Girls Board link for both Girls and Shluchim */}
        {(userRole === "shliach" || userRole === "girl") && (
          <Link to="/message-board/girl" className="hover:underline">
            Girls Board
          </Link>
        )}

        {/* Show Create Listing link only for Shluchim */}
        {userRole === "shliach" && (
          <Link to="/create-listing" className="hover:underline">
            Create Listing
          </Link>
        )}

        {/* Log Out button */}
        {authenticated ? (
          <button
            onClick={onLogout} // ✅ Trigger handleLogout from App.js
            className="ml-4 text-red-300 hover:text-white transition"
          >
            Log Out
          </button>
        ) : (
          // Show Log In link when not authenticated
          <Link to="/login" className="text-white hover:underline">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;

