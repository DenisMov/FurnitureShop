import { useDispatch } from "react-redux";

import { setFilter, removeFilter } from "../../slices/productsSlice";

import "./filters.scss";

const Filters = () => {
  const dispatch = useDispatch();

  return (
    <div className="filters">
      <div className="filters__wrapper">
        <div className="filters__title">Product type</div>
        <ul className="filters__list">
          <li>
            <input
              type="checkbox"
              id="furnitureCheckbox"
              name="Furniture"
              value="Furniture"
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(setFilter("Furniture"));
                } else {
                  dispatch(removeFilter("Furniture"));
                }
              }}
            />
            <label htmlFor="furnitureCheckbox">Furniture</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="homewareCheckbox"
              name="Homeware"
              value="Homeware"
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(setFilter("Homeware"));
                } else {
                  dispatch(removeFilter("Homeware"));
                }
              }}
            />
            <label htmlFor="homewareCheckbox">Homeware</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="sofasCheckbox"
              name="Sofas"
              value="Sofas"
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(setFilter("Sofas"));
                } else {
                  dispatch(removeFilter("Sofas"));
                }
              }}
            />
            <label htmlFor="sofasCheckbox">Sofas</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="lightFittingsCheckbox"
              name="Light fittings"
              value="Light fittings"
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(setFilter("Light fittings"));
                } else {
                  dispatch(removeFilter("Light fittings"));
                }
              }}
            />
            <label htmlFor="lightFittingsCheckbox">Light fittings</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="accessoriesCheckbox"
              name="Accessories"
              value="Accessories"
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(setFilter("Accessories"));
                } else {
                  dispatch(removeFilter("Accessories"));
                }
              }}
            />
            <label htmlFor="accessoriesCheckbox">Accessories</label>
          </li>
        </ul>
      </div>

      <div className="filters__wrapper">
        <div className="filters__title">Price</div>
        <ul className="filters__list">
          <li>
            <input
              type="checkbox"
              id="range0-100"
              name="0-100"
              value="0-100"
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(setFilter("0-100"));
                } else {
                  dispatch(removeFilter("0-100"));
                }
              }}
            />
            <label htmlFor="range0-100">0-100</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="range101-250"
              name="101-250"
              value="101-250"
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(setFilter("101-250"));
                } else {
                  dispatch(removeFilter("101-250"));
                }
              }}
            />
            <label htmlFor="range101-250">101-250</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="range250Plus"
              name="250+"
              value="250+"
              onChange={(e) => {
                if (e.target.checked) {
                  dispatch(setFilter("250+"));
                } else {
                  dispatch(removeFilter("250+"));
                }
              }}
            />
            <label htmlFor="range250Plus">250+</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
