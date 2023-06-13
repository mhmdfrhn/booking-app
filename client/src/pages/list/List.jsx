import React, { useState } from "react";
import "./list.css";

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";

import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";

import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetchData } = useFetch(
    `http://localhost:8800/api/hotels?city=${destination}&min=${min || 0}&max=${
      max || 999
    }`
  );

  const handleClick = () => {
    reFetchData();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search">
            <h1 className="list-title">Search</h1>
            <div className="list-item">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="list-item">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{` ${format(
                dates[0].startDate,
                "MM-dd/yyy"
              )} to ${format(dates[0].endDate, "MM-dd/yyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="list-item">
              <label>Options</label>
              <div className="list-option">
                <div className="list-option_item">
                  <span className="list_item-text">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="list_item-input"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="list-option_item">
                  <span className="list_item-text">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="list_item-input"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="list-option_item">
                  <span className="list_item-text">Adult</span>
                  <input
                    type="number"
                    className="list_item-input"
                    min={1}
                    placeholder={options.adult}
                  />
                </div>
                <div className="list-option_item">
                  <span className="list_item-text">Children</span>
                  <input
                    type="number"
                    className="list_item-input"
                    min={0}
                    placeholder={options.children}
                  />
                </div>
                <div className="list-option_item">
                  <span className="list_item-text">Room</span>
                  <input
                    type="number"
                    className="list_item-input"
                    min={1}
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="list-result">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
