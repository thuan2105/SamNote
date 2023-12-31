import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
Footer.propTypes = {};

function Footer(props) {
  return (
    <div
      className='FooterNote'
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        background: "white",
        height: "64px",
        width: "calc(100vw - 251px)",
        textAlign: "center",
        padding: "8px",
      }}
    >
      <Typography variant='caption' display='block' style={{ color: "#44546F", cursor: "pointer" }}>
        <Link to='https://thinkdiff.us/'>Copyright ThinkDiff</Link>
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        <Typography
          variant='caption'
          display='block'
          style={{ color: "#626F86", marginRight: "5px" }}
        >
          Give feedback
        </Typography>
        <svg width='5' height='5' viewBox='0 0 3 3' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M0.638184 1.56836V1.34814C0.638184 1.0402 0.734863 0.78597 0.928223 0.585449C1.12516 0.384928 1.39193 0.284668 1.72852 0.284668C2.06868 0.284668 2.33724 0.384928 2.53418 0.585449C2.73112 0.78597 2.82959 1.0402 2.82959 1.34814V1.56836C2.82959 1.87272 2.73112 2.12516 2.53418 2.32568C2.34082 2.52262 2.07406 2.62109 1.73389 2.62109C1.3973 2.62109 1.13053 2.52262 0.933594 2.32568C0.736654 2.12516 0.638184 1.87272 0.638184 1.56836Z'
            fill='#626F86'
          />
        </svg>
        <Typography
          variant='caption'
          display='block'
          style={{ color: "#626F86", marginLeft: "5px" }}
        >
          Learn more
        </Typography>
      </Box>
    </div>
  );
}

export default Footer;
