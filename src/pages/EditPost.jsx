import { useState} from "react";
import api from "../api/api";

const EditPost = ({ post, onUpdated ,onCancel }) => {

    const [editedPost, setEditedPost] = useState({ body: post.body });

    const handleSubmit = (e) => {
        e.preventDefault();
        api
          .put(`/posts/${post.id}`, {
            body: editedPost.body
          })
          .then((response)=>{
                onUpdated(response.data)
          })
          .catch((error) => {
            console.error("Error editing post:", error);
          });

    };


    return(
        <div>
            <h2 className="text-lg font-semibold text-gray-200 mb-3">
                 Edit post
            </h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={editedPost.body}
                    onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value.slice(0, 280) })}
                    className="w-full p-2 rounded bg-gray-700 text-white"
                    rows="3">
                </textarea>
                <p className="text-right text-gray-400 text-sm">
                    {editedPost.body.length}/280
                </p>
                < div className="flex gap-3 mt-3">
                    <button type="submit"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition"
                    >Save</button>
                    <button type="button"
                           className="px-4 py-2 border border-gray-500 text-gray-300 hover:bg-gray-700 font-medium rounded-md transition"
                            onClick={onCancel}
                    >Cancel</button>
                </div>
            </form>
        </div>
    );
};
export default EditPost;