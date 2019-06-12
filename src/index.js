import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import useExpand from "./useExpand";

const App = () => {
  const productImage = useExpand('https://images-na.ssl-images-amazon.com/images/I/71UHAUyQ-BL._SX679_.jpg','https://images-na.ssl-images-amazon.com/images/I/71UHAUyQ-BL._SL1500_.jpg');
  return (
    <>
      {productImage}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
