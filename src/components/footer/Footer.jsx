import { FaLinkedin } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSkype } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { AiFillPinterest } from "react-icons/ai";

import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__up">
        <div className="footer__block">
          <h2>Avion</h2>
          <p className=" nocursor">21 New York Street</p>
          <p className=" nocursor">New York City</p>
          <p className=" nocursor">United States of America </p>
          <p className=" nocursor">432 34</p>
        </div>
        <div className="footer__block">
          <p className="size20 nocursor">Social links</p>
          <div className="footer__socialBlock">
            <FaLinkedin className="social-icon" />
            <FaFacebookSquare className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaSkype className="social-icon" />
            <FaTwitter className="social-icon" />
            <AiFillPinterest className="social-icon" />
          </div>
        </div>
        <div className="footer__block">
          <p className="size20 nocursor">Menu</p>
          <p>New arrivals</p>
          <p>Best sellers</p>
          <p>Recently viewed</p>
          <p>Popular this week</p>
          <p>All products</p>
        </div>
        <div className="footer__block">
          <p className="size20 nocursor">Careers</p>
          <p>Crockery</p>
          <p>Furniture</p>
          <p>Homeware</p>
          <p>Plant pots</p>
          <p>Chairs</p>
          <p>Crockery</p>
        </div>
        <div className="footer__block">
          <p className="size20 nocursor">Our company</p>
          <p>About us</p>
          <p>Vacancies</p>
          <p>Contact us</p>
          <p>Privacy</p>
          <p>Returns policy</p>
        </div>
      </div>
      <span></span>
      <p className="mgleft0">Copyright 2022 Avion LTD</p>
    </div>
  );
};

export default Footer;
