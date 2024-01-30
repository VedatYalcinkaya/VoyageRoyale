import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";

export default class CarCarousel extends Component {
  render() {
    const images = [
      "https://i.ibb.co/Wc7XQZj/Bentley.png",
      "https://i.ibb.co/5Lwg9kv/Tesla.png",
      "https://i.ibb.co/1XsfR6p/Bmw.png",
      "https://i.ibb.co/QvnMX9R/Mercedes.png",
      "https://i.ibb.co/NSVJWRJ/Volvo.png",
      "https://i.ibb.co/jJN4PBd/Togg.png",
      "https://i.ibb.co/4pXbwdS/Rolls-Royce.png",
      "https://i.ibb.co/bg2wRfj/Cadillac.png",
      "https://i.ibb.co/kGGR5WT/Lucid.png",
      "https://i.ibb.co/cg52C7F/Porsche.png",
      "https://i.ibb.co/5hw7c71/Land-Rover.png",
      "https://i.ibb.co/rMHrrcR/Rivian.png",
      "https://i.ibb.co/swmNGPm/Jaguar.png",
      "https://i.ibb.co/P57n4ZQ/Maserati.png",
      "https://i.ibb.co/C6Yjr6R/Audi.png",
    ];

    const settings: any = {
      dots: "true",
      className: "center",
      infinite: true,
      centerMode: true,
      speed: 500,
      centerPadding: "60px",
      slidesToShow: 4,
      autoplay: true,
      swipeToSlide: true,
      autoplaySpeed: 1300
    };

    return (
      <div>
        <Box
        sx={{
          
          borderRadius:4,
          paddingTop:10,
          paddingBottom:10,
          mt:10,
          
        }}
      >
          <Typography sx={{ fontSize: 40, fontWeight: "bold", color:"#0f4037", mt:5, textAlign:"center"}}>
            Discover Automotive Prestige
          </Typography>
          <Typography sx={{ fontSize: 25,color:"#0f4037", textAlign:"center"}}>
            Embrace the Legacy of Iconic Brands.
          </Typography>
          <Slider {...settings}>
            {images.map((image, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
                bgcolor="transparent"
                sx={{
                  filter: "grayscale(100%)",
                  alignItems: "center",
                  transition: "filter 0.3s ease",
                  mt: 5,
                  padding:5,
                  "&:hover": {
                    filter: "grayscale(0%)",
                  },
                }}
              >
                <img
                  src={image}
                  alt={`Car ${index}`}
                  style={{ maxWidth: "100%", maxHeight: "100%"}}
                />
              </Box>
            ))}
          </Slider>
          <Typography sx={{ fontSize: 15,color:"#0f4037", textAlign:"center",mb:10}}>
            Swipe to Slide
          </Typography>
        </Box>
      </div>
    );
  }
}
