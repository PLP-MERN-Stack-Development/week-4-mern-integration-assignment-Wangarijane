// src/pages/Home.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched posts:", data); // Add this line
        setPosts(Array.isArray(data.posts) ? data.posts : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post._id !== id));
      } else {
        const errorData = await res.json();
        alert(`Delete failed: ${errorData.error}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete the post.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Latest Blog Posts</h1>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post._id} className="p-4 border rounded shadow hover:bg-gray-50">
              <Link to={`/posts/${post.slug}`}>
                {post.featuredImage && (
                  <img
                    src={`http://localhost:5000/uploads/${post.featuredImage}`}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                )}
                <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-600 mb-2">
                {post.excerpt || post.content.slice(0, 100)}...
              </p>
              <div className="flex space-x-4">
                <Link
                  to={`/edit/${post._id}`}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
