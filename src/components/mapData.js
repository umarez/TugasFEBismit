/** @jsxImportSource @emotion/react */
import React from 'react'
import { FaTrashAlt } from "react-icons/fa";
import 'twin.macro'

export const MapData = ( {e, i, deleteHandler} ) => {
  return (
    <div tw="m-5">
      <h1>{e}</h1>
      <h1 tw="flex items-center justify-between">
        Due date : {localStorage.getItem(e)}
        <span
          tw="flex items-center justify-center cursor-pointer hover:bg-gray-300 w-10 h-10"
          onClick={() => deleteHandler(i)}
        >
          <FaTrashAlt />
        </span>
      </h1>
    </div>
  );
}

