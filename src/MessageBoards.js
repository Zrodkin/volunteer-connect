import React from "react";

function MessageBoards({ type }) {
  // Example posts
  const posts = [
    {
      title: "Purim Carnival Volunteers Needed",
      date: "2023-03-15",
      location: "Miami, FL",
      volunteersNeeded: 3,
      description: "Looking for energetic bochurim to help with our Purim carnival.",
      contact: "Rabbi Mendel Cohen",
      type: "bochur", // Type: Bochur
    },
    {
      title: "Pesach Seder Assistant",
      date: "2023-03-20",
      location: "Brooklyn, NY",
      volunteersNeeded: 2,
      description: "Need help with our community Pesach Seder.",
      contact: "Rabbi Yosef Goldstein",
      type: "girl", // Type: Girl
    },
    // Add more posts for both types...
  ];

  // Filter posts based on type passed from App.js
  const filteredPosts = posts.filter(post => post.type === type);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-2 text-center">Message Boards</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            filteredPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col justify-between"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{post.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <p className="text-gray-600 text-sm">
                  📍 <span className="font-medium">{post.location}</span>
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  🙋 Volunteers Needed:{" "}
                  <span className="font-medium">{post.volunteersNeeded}</span>
                </p>
                <p className="text-gray-700 text-sm mb-4">{post.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MessageBoards;
