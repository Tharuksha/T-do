import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p style={textStyle}>Made with ❤️ Tharuksha Wickramarachchi</p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#f9f9f9",
  textAlign: "center",
  padding: "10px 0",
  position: "fixed",
  bottom: 0,
  width: "100%",
  borderTop: "1px solid #e0e0e0",
};

const textStyle = {
  margin: 0,
  fontSize: "14px",
  color: "#555",
};

export default Footer;
