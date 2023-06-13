import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="search-item">
      <img src={item.photos[0]} alt="" className="item_img" />
      <div className="item_desc">
        <h1 className="item_title">{item.name}</h1>
        <span className="item_distance">{item.distance}m from center</span>
        <span className="item_taxi-op">Free airport taxi</span>
        <span className="item_subtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="item_features">{item.desc}</span>
        <span className="item_cancel-op">Free cancellation </span>
        <span className="cancel-op_subtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="item_details">
        {item.rating && (
          <div className="item_rating">
            <span>Excellent</span>
            <button>{item.rating}</button>
            console.log(item.rating)
          </div>
        )}
        <div className="item_detail-text">
          <span className="item_price">${item.cheapestPrice}</span>
          <span className="item_tax-op">Includes taxes and fees</span>
          <Link to={`/hotels/find/${item._id}`}>
            <button className="item_check-btn">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
