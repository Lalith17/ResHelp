import React from "react";

const CharAvatar = ({ fname, lname, width, height, style }) => {
  const initials = `${lname ? lname.charAt(0).toUpperCase() : ""}${
    fname ? fname.charAt(0).toUpperCase() : ""
  }`;

  return (
    <div
      className={`
        ${width || "w-12"} 
        ${height || "h-12"} 
        rounded-full 
        bg-gray-100 
        flex 
        items-center 
        justify-center 
        text-gray-900 
        font-medium
        ${style || ""}
      `}
    >
      <span className="flex items-center justify-center w-full h-full text leading-none">
        {initials}
      </span>
    </div>
  );
};

export default CharAvatar;
