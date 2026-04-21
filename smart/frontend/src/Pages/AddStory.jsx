import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStory() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePost = () => {
    alert("Story uploaded (frontend only)");
    navigate("/feed");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">

      {/* BACK */}
      <button
        onClick={() => navigate("/feed")}
        className="absolute top-4 left-4 text-white text-lg"
      >
        ←
      </button>

      {/* PREVIEW */}
      <div className="w-80 h-[500px] bg-gray-900 rounded-xl flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} className="w-full h-full object-cover" />
        ) : (
          <p className="text-gray-400">Upload a story</p>
        )}
      </div>

      {/* INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mt-4"
      />

      {/* POST BUTTON */}
      {image && (
        <button
          onClick={handlePost}
          className="mt-4 px-6 py-2 bg-blue-500 rounded-full"
        >
          Share Story
        </button>
      )}
    </div>
  );
}

export default AddStory;