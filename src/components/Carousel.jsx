import React from "react";
import { Carousel } from "react-responsive-carousel";
import apiURL from "../constants/apiURL";

export default ({ images }) => (
  <Carousel autoPlay showThumbs={false}>
    {images.map((image) => (
      <div>
        <img alt={image.path} src={`${apiURL}/${image.path}`} />
      </div>
    ))}
  </Carousel>
);
