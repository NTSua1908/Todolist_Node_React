import React from "react";
import { FiLoader } from "react-icons/fi";
import "./loader.css";

function Loader(props) {
  return (
    <div className='loader'>
      <FiLoader />
    </div>
  );
}

export default Loader;
