import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch post by slug
    fetch(`http://localhost:5000/api/posts/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) {
          setPost(data);
          // Fetch comments
          fetch(`http://localhost:5000/api/comments/post/${data._id}`)
            .then((res) => res.json())
            .then((commentData) => setComments(commentData || []));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setPost(null);
        setLoading(false);
      });
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postId: post._id,
          content: newComment,
        }),
      });

      const data = await res.json();
      setComments((prev) => [data, ...prev]); // Add new comment to top
      setNewComment(""); // Clear input
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.featuredImage && (
        <img
          src={`http://localhost:5000/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-auto mb-4"
        />
      )}
      <p className="mb-6">{post.content}</p>

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">Comments</h2>

      <form onSubmit={handleCommentSubmit} className="mb-4 space-y-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write your comment..."
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Comment
        </button>
      </form>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li key={comment._id} className="border p-2 rounded bg-gray-100">
              {comment.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostDetail;


