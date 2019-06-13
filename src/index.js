import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import useExpand from "./useExpand";

const App = () => {
  const productImage = useExpand('http://img.cgv.co.kr/Movie/Thumbnail/Poster/000081/81478/81478_1000.jpg');
  return (
    <>
      {productImage}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
