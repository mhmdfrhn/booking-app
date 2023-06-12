import React from "react";
import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:8800/api/hotels?featured=true"
  );

  return (
    <div className="featured-properties">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="featured-properties_item" key={item._id}>
              <img src={item.photos[0]} alt="" className="featured_item-img" />
              <span className="featured_item-name">{item.name}</span>
              <span className="featured_item-city">{item.city}</span>
              <span className="featured_item-price">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="featured_item-rating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
