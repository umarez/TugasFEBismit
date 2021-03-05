/** @jsxImportSource @emotion/react */
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import "twin.macro";
import { IconContext } from "react-icons";

export const MapData = ({ e, i, deleteHandler }) => {
  if (localStorage.getItem(e) !== null) {
    let dueDate = localStorage.getItem(e).split(" ")
    dueDate[1] = `${dueDate[1]}th`
    dueDate = dueDate.slice(0, 3).join(" ");
    console.log(dueDate)
    return (
      <div tw="m-5 p-6 border-2 bg-gray-700 border-gray-600 shadow-md rounded-lg flex justify-between items-center w-full font-poppins ">
        <div tw="w-1/2">
          <h1 tw="text-2xl font-medium text-white">{e}</h1>
          <h1 tw="flex items-center justify-between text-sm text-gray-500 cursor-default">Due date : {dueDate}</h1>
        </div>
        <span
          tw="flex items-center justify-center cursor-pointer w-10 h-10"
          onClick={() => deleteHandler(i)}
        >
        <IconContext.Provider value={{className: 'react-icons'}}>
          <FaTrashAlt />
          </IconContext.Provider>
        </span>
      </div>
    );
  } else {
    return null;
  }
};
