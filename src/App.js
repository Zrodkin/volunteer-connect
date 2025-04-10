import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import MessageBoards from "./MessageBoards";
import Navbar from "./Navbar";  // Import Navbar component
import CreateListing from "./CreateListing";
import './App.css';  // Import the App.css file

function App() {
  const navigate = useNavigate();

  // State initialization based on localStorage
  const savedRole = localStorage.getItem("userRole");
  const [authenticated, setAuthenticated] = useState(!!savedRole);  // Check if user is authenticated
  const [userRole, setUserRole] = useState(savedRole);  // Set user role from localStorage
  const [posts, setPosts] = useState([]);  // State to store all the posts

  // Update authentication status and user role on page load (when component mounts)
  useEffect(() => {
    console.log("Checking authentication status...");
    if (savedRole) {
      setAuthenticated(true);
      setUserRole(savedRole);
    } else {
      setAuthenticated(false); // If no role is found, set authenticated to false
      setUserRole(null); // Clear user role
    }
  }, [savedRole]);

  // Handle successful login
  const handleLoginSuccess = (role) => {
    console.log("Login success:", role);
    setAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("userRole", role); // Save user role in localStorage
    navigate(`/message-board/${role}`); // Redirect to the correct message board based on the role
  };

  // Handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("userRole"); // Clear user role from localStorage
    setAuthenticated(false);
    setUserRole(null);
    navigate("/login"); // Redirect to login page
  };

  // Add a new post to the posts array
  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);  // Append new post to the posts array
  };

  return (
    <>
      {/* Pass the handleLogout to Navbar */}
      {authenticated && <Navbar onLogout={handleLogout} userRole={userRole} authenticated={authenticated} />}

      <Routes>
        {/* Root route */}
        <Route 
          path="/" 
          element={authenticated ? <Navigate to={`/message-board/${userRole}`} /> : <Navigate to="/login" />} 
        />

        {/* Public routes */}
        <Route path="/signup" element={<Signup setAuthenticated={setAuthenticated} />} />
        <Route 
          path="/login" 
          element={<Login setAuthenticated={handleLoginSuccess} setUserRole={setUserRole} />} 
        />

        {/* Create Listing route (Visible only to Shluchim) */}
        <Route
          path="/create-listing"
          element={authenticated && userRole === "shliach" ? (
            <CreateListing addPost={addPost} /> 
          ) : (
            <Navigate to="/login" />
          )}
        />

        {/* Protected route for Bochurim message board */}
        <Route
          path="/message-board/bochur"
          element={
            authenticated && (userRole === "shliach" || userRole === "bochur") ? (
              <MessageBoards posts={posts.filter((post) => post.type === "bochur")} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Protected route for Girls message board */}
        <Route
          path="/message-board/girl"
          element={
            authenticated && (userRole === "shliach" || userRole === "girl") ? (
              <MessageBoards posts={posts.filter((post) => post.type === "girl")} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Shluchim can see both boards */}
        <Route
          path="/message-board/shliach"
          element={
            authenticated && userRole === "shliach" ? (
              <>
                <MessageBoards posts={posts.filter((post) => post.type === "bochur")} />
                <MessageBoards posts={posts.filter((post) => post.type === "girl")} />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
