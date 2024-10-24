import { ColorRing } from "react-loader-spinner";

import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner">
      <ColorRing
        visible={true}
        height="180"
        width="180"
        ariaLabel="color-ring-loading"
        wrapperClass="color-ring-wrapper"
        colors={["#cac6da", "#cac6da", "#505977", "#cac6da", "#cac6da"]}
      />
    </div>
  );
};

export default Spinner;
