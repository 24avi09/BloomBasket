import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/meabhisingh";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://media.licdn.com/dms/image/D4D03AQEWg_Bk8-2nJA/profile-displayphoto-shrink_800_800/0/1672115938356?e=1678924800&v=beta&t=P-d4e--HMbHoc14QJVhL4_SOmnQKpqULHOpeiFYb0cU"
              alt="Founder"
            />
            <Typography>Abhishek Kumar Yadav</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a E-Commerce wesbite made by @abhishekhkumaryadav.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/channel/UCFApYSQrjsJqj4dD6SYATWQ"
              target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/avi_yd3/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
