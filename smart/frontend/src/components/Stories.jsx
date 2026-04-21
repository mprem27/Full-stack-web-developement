import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoryViewer from "./StoryViewer";
import { getStories } from "../services/storyService";
import { getProfileImage } from "../utils/getProfileImage";
import RoleBadge from "../components/RoleBadge";
import { useAuth } from "../context/AuthContext"; // ✅ NEW

function Stories() {
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ CURRENT USER

  const [users, setUsers] = useState([]);
  const [activeStories, setActiveStories] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [seenUsers, setSeenUsers] = useState([]);

  // 🔥 FETCH STORIES FUNCTION (OUTSIDE)
  const fetchStories = async () => {
    try {
      const res = await getStories();
      setUsers(res.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    fetchStories();
  }, []);

  // 🔥 REFRESH WHEN PROFILE UPDATED
  useEffect(() => {
    const handleUpdate = () => {
      fetchStories();
    };

    window.addEventListener("profileUpdated", handleUpdate);

    return () => {
      window.removeEventListener("profileUpdated", handleUpdate);
    };
  }, []);

  // 👁️ OPEN STORY
  const handleOpen = (userStories) => {
    setActiveStories(userStories.stories);
    setStartIndex(0);

    if (!seenUsers.includes(userStories.user._id)) {
      setSeenUsers((prev) => [...prev, userStories.user._id]);
    }
  };

  return (
    <>
      <div className="w-full bg-white py-4 px-2 overflow-x-auto">
        <div className="flex gap-6 items-center">

          {/* YOUR STORY */}
          <div
            onClick={() => navigate("/add-story")}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="relative group-hover:-translate-y-2 transition duration-300">
              <div className="p-[3px] rounded-full bg-gray-300">
                <img
                  src={getProfileImage(user)} // ✅ FIXED
                  className="w-16 h-16 rounded-full object-cover border-[3px] border-white"
                />
              </div>

              <div className="absolute bottom-0 right-0 bg-blue-500 w-5 h-5 rounded-full text-white flex items-center justify-center text-xs border-2 border-white shadow">
                +
              </div>
            </div>

            <p className="text-xs mt-2 font-medium">Your Story</p>
          </div>

          {/* 🔥 USERS STORIES */}
          {users.map((u) => {
            const isSeen = seenUsers.includes(u.user._id);

            return (
              <div
                key={u.user._id}
                onClick={() => handleOpen(u)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="group-hover:-translate-y-2 transition duration-300">

                  {/* 🔥 ROLE BASED RING */}
                  <div
                    className={`p-[3px] rounded-full ${
                      isSeen
                        ? "bg-gray-300"
                        : u.user.role === "faculty"
                        ? "bg-red-500"
                        : "bg-gradient-to-tr from-green-400 to-green-600"
                    }`}
                  >
                    <img
                      src={getProfileImage(u.user)} // ✅ UPDATED IMAGE
                      className="w-16 h-16 rounded-full object-cover border-[3px] border-white shadow-sm"
                    />
                  </div>
                </div>

                {/* USERNAME + ROLE */}
                <p className="text-xs mt-2 font-medium flex items-center gap-1">
                  {u.user.username}
                  <RoleBadge role={u.user.role} />
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔥 STORY VIEWER */}
      {activeStories && (
        <StoryViewer
          stories={activeStories}
          currentIndex={startIndex}
          onClose={() => setActiveStories(null)}
        />
      )}
    </>
  );
}

export default Stories;