import React, { useRef, useEffect } from "react";
import "./index.css";

const useExpand = url => {
  const imgWrapRef = useRef();
  const imgRef = useRef();
  const magnifierRef = useRef();
  const zoomWindowRef = useRef();
  const detailImgRef = useRef();

  const handleEnterEvent = () => {
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
    detailImgRef.current.width =
      imgRef.current.offsetWidth *
      (zoomWindowRef.current.offsetWidth / magnifierRef.current.offsetWidth);
    detailImgRef.current.height =
      imgRef.current.offsetHeight *
      (zoomWindowRef.current.offsetHeight / magnifierRef.current.offsetHeight);
    if (
      clientX >= imgOffLeft &&
      clientX <= imgOffLeft + imgOffWid &&
      clientY >= imgOffTop &&
      clientY <= imgOffHei + imgOffTop
    ) {
      magnifierRef.current.style.display = "block";
      zoomWindowRef.current.style.display = "block";
    } else {
      magnifierRef.current.style.display = "none";
      zoomWindowRef.current.style.display = "none";
    }
    if (clientX <= imgOffLeft + magOffWid / 2) {
      magnifierRef.current.style.left = imgOffLeft + "px";
    } else if (clientX >= imgOffLeft - magOffWid / 2 + imgOffWid) {
      magnifierRef.current.style.left =
        imgOffLeft + imgOffWid - magOffWid + "px";
    }
    if (clientY <= imgOffTop + magOffHei / 2) {
      magnifierRef.current.style.top = imgOffTop + "px";
    } else if (clientY >= imgOffTop - magOffHei / 2 + imgOffHei) {
      magnifierRef.current.style.top = imgOffTop + imgOffHei - magOffHei + "px";
    }
    if (detailImgRef.current) {
      detailImgRef.current.style.left =
        -(parseInt(magnifierRef.current.style.left) - imgOffLeft) *
          (detailImgRef.current.offsetWidth / imgOffWid) +
        "px";
      detailImgRef.current.style.top =
        -(parseInt(magnifierRef.current.style.top) - imgOffTop) *
          (detailImgRef.current.offsetHeight / imgOffHei) +
        "px";
    }
  };

  useEffect(() => {
    imgWrapRef.current.addEventListener("mouseenter", handleEnterEvent);
    imgWrapRef.current.addEventListener("mouseleave", handleLeaveEvent);
  });

  useEffect(() => {
    if (imgRef.current.clientWidth >= imgRef.current.clientHeight) {
      imgRef.current.style.width = "679px";
    } else {
      imgRef.current.style.height = "679px";
    }
  }, [imgRef]);

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
        />
        <div
          id="magnifier-lens"
          ref={magnifierRef}
          style={{
            display: "none",
            position: "absolute",
            backgroundImage:
              "url(https://images-na.ssl-images-amazon.com/images/G/01/apparel/rcxgs/tile._CB483369105_.gif)",
            width: "300px",
            height: "200px",
            left: 0,
            top: 0
          }}
        />
      </div>
      <div
        id="zoomWindow"
        ref={zoomWindowRef}
        style={{
          display: "none",
          position: "absolute",
          bottom: "5vh",
          right: "5vh",
          width: "600px",
          height: "400px",
          overflow: "hidden",
          border: "1px solid black"
        }}
      >
        <img
          id="detailImg"
          ref={detailImgRef}
          src={url}
          alt="detail img"
          style={{ display: "block", position: "absolute", top: 0, left: 0 }}
        />
      </div>
    </>
  );
};
export default useExpand;
