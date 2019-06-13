import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import useExpand from "./useExpand";

const App = () => {
  const [url, setUrl] = useState(
    "http://img.cgv.co.kr/Movie/Thumbnail/Poster/000081/81478/81478_1000.jpg"
  );
  const productImage = useExpand(url);
  const submitImgUrl = (event) => {
    event.preventDefault()
    if(document.querySelector('#imgUrl').value) {
      setUrl(document.querySelector('#imgUrl').value)
    } else {
      return;
    }
  }
  useEffect(() => {
    document.querySelector('#imgUrlForm').addEventListener('submit',submitImgUrl)
  },[])
  return (
    <>
      {productImage}
      <form id="imgUrlForm">
        <input id="imgUrl"/>
        <input id="submitUrl"type="submit" value="이미지 적용"/>
      </form>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
