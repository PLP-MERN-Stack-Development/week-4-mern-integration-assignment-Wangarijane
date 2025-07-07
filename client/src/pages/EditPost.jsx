// client/src/pages/EditPost.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch post by ID
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error fetching post:", err));

    // Fetch categories
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data || []));
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });

      if (res.ok) {
        alert("Post updated!");
        navigate("/");
      } else {
        alert("Failed to update post.");
      }
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Error updating post.");
    } finally {
      setLoading(false);
    }
  };

  if (!post) return <p className="p-4">Loading post...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          placeholder="Post title"
        />
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
          rows={6}
          placeholder="Post content"
        />
        <select
          name="category"
          value={post.category}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}

export default EditPost;
