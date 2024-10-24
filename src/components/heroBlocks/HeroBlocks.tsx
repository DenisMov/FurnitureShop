import { Link } from "react-router-dom";
//@ts-ignore
import mainImg from "../../assets/images/1.jpg";
import "./heroBlocks.scss";

const HeroBlocks = () => {
  return (
    <div className="heroBlocks">
      <div className="heroBlocks__container">
        <div className="heroBlocks__info">
          <div className="heroBlocks__title">
            The furniture brand for the future, with timeless designs
          </div>
          <Link to="/products">
            <button className="heroBlocks__button">View collection</button>
          </Link>
          <div className="heroBlocks__descr">
            A new era in eco friendly furniture with Avelon, the French luxury
            retail brand with nice fonts, tasteful colors and a beautiful way to
            display things digitally using modern web technologies.
          </div>
        </div>
        <img className="heroBlocks__img" src={mainImg} />
      </div>
    </div>
  );
};

export default HeroBlocks;
