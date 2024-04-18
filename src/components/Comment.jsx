import React from "react";

const Comment = ({ comment, username }) => {
  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-56 max-w-md md:max-w-2xl ">
      <div className="flex items-start px-4 py-6">
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
              {username}
            </h2>
            <small className="text-sm text-gray-700">22h ago</small>
          </div>
          <p className="mt-3 text-gray-700 text-sm">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
