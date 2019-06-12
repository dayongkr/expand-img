import React, {useRef, useEffect } from "react";
import "./index.css";

const useExpand = (url, bigUrl) => {
  const imgWrapRef = useRef();
  const imgRef = useRef();
  const magnifierRef = useRef();
  const zoomWindowRef = useRef();
  const detailImgRef = useRef();

  const handleEvent = () => {
    window.addEventListener("mousemove", mouseEvent);
  };

  const handleLeaveEvent = () => {
    window.removeEventListener("mousemove", mouseEvent);
    magnifierRef.current.style.display = "none";
  };

  const mouseEvent = () => {
    const {
      offsetWidth: magOffWid,
      offsetHeight: magOffHei
    } = magnifierRef.current;
    const {
      offsetWidth: imgOffWid,
      offsetHeight: imgOffHei,
      offsetTop: imgOffTop,
      offsetLeft: imgOffLeft
    } = imgRef.current;
    const { clientX, clientY } = window.event;
    magnifierRef.current.style.top = clientY - magOffHei / 2 + "px";
    magnifierRef.current.style.left = clientX - magOffWid / 2 + "px";
    if (
      clientX >= imgOffLeft &&
      clientX <= imgOffLeft + imgOffWid &&
      clientY >= imgOffTop &&
      clientY <= imgOffHei + imgOffTop
    ) {
      magnifierRef.current.style.display = "block";
    } else {
      magnifierRef.current.style.display = "none";
    }
    if (clientX < imgOffLeft + magOffWid / 2) {
      magnifierRef.current.style.left = imgOffLeft + "px";
    } else if (clientX > imgOffLeft - magOffWid / 2 + imgOffWid) {
      magnifierRef.current.style.left =
        imgOffLeft + imgOffWid - magOffWid + "px";
    }
    if (clientY < imgOffTop + magOffHei / 2) {
      magnifierRef.current.style.top = imgOffTop + "px";
    } else if (clientY > imgOffTop - magOffHei / 2 + imgOffHei) {
      magnifierRef.current.style.top = imgOffTop + imgOffHei - magOffHei + "px";
    }


  };

  useEffect(() => {
    imgWrapRef.current.addEventListener("mouseenter", handleEvent);
    imgWrapRef.current.addEventListener("mouseleave", handleLeaveEvent);
    return () => {
      imgWrapRef.current.removeEventListener("mouseenter", handleEvent);
      imgWrapRef.current.removeEventListener("mouseleave", handleLeaveEvent);
    };
  });

  return (
    <>
      <div
        id="imgWrapper"
        ref={imgWrapRef}
        style={{
          width: "900px",
          height: "700px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          id="ladingImage"
          ref={imgRef}
          src={url}
          alt="product img"
          style={{ border: "1px solid black" }}
        />
        <div
          id="magnifier-lens"
          ref={magnifierRef}
          style={{
            display: "none",
            position: "absolute",
            backgroundColor: "#91a7ff",
            width: "422px",
            height: "303px",
            left: 0,
            top: 0,
            opacity: 0.2
          }}
        />
      </div>
      <div
        id="zoomWindow"
        ref={zoomWindowRef}
        style={{
          display: "block",
          position: "absolute",
          top: 0,
          right: 0,
          width: "937px",
          height: "670px",
          overflow: "hidden"
        }}
      >
        <img
          id="detailImg"
          ef={detailImgRef}
          src={bigUrl}
          alt="detail img"
          style={{ display: "block", position: "absolute", top: 0, left: 0 }}
        />
      </div>
    </>
  );
};
export default useExpand;
