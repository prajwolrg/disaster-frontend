import React from "react";
import { Carousel } from "react-responsive-carousel";

export default ({ images }) => (
  <Carousel autoPlay showThumbs={false}>
    {images.map((image) => (
      <div>
        <img alt={image.path} src={`http://localhost:5000/${image.path}`} />
      </div>
    ))}
  </Carousel>
);
