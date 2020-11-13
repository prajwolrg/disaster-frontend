import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
    <Carousel autoPlay showThumbs={false}>
        <div>
            <img
                alt=""
                src="http://lorempixel.com/output/cats-q-c-640-480-1.jpg"
            />
        </div>
        <div>
            <img
                alt=""
                src="http://lorempixel.com/output/cats-q-c-640-480-2.jpg"
            />
        </div>
        <div>
            <img
                alt=""
                src="http://lorempixel.com/output/cats-q-c-640-480-3.jpg"
            />
        </div>
        <div>
            <img
                alt=""
                src="http://lorempixel.com/output/cats-q-c-640-480-4.jpg"
            />
        </div>
        <div>
            <img
                alt=""
                src="http://lorempixel.com/output/cats-q-c-640-480-5.jpg"
            />
        </div>
    </Carousel>
);
