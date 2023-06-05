import React, { useState } from "react";
import "./header.css";

import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const Header = () => {
  const [openDate, setOpenDate] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOption, setOpenOption] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-list">
          <div className="header-list_item active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="header-list_item">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="header-list_item">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="header-list_item">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="header-list_item">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        <h1 className="header-title">A lifetime of discounts? It's Genius.</h1>
        <p className="header_desc">
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free Lamabooking account
        </p>
        <button className="header-btn">Sign in / Register</button>
        <div className="header-search">
          <div className="header-search_item">
            <FontAwesomeIcon icon={faBed} className="header-search_icon" />
            <input
              type="text"
              className="header-search_input"
              placeholder="Where are you going?"
              onChange={() => {}}
            />
          </div>
          <div className="header-search_item">
            <FontAwesomeIcon
              icon={faCalendarDays}
              className="header-search_icon"
            />
            <span
              className="header-search_text"
              onClick={() => setOpenDate(!openDate)}
            >
              {`${format(date[0].startDate, "MM-dd/yyy")} to ${format(
                date[0].endDate,
                "MM-dd/yyy"
              )}`}
            </span>
            {openDate && (
              <DateRange
                className="date"
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                onChange={(item) => setDate([item.selection])}
                ranges={date}
                minDate={new Date()}
              />
            )}
          </div>
          <div className="header-search_item">
            <FontAwesomeIcon icon={faPerson} className="header-search_icon" />
            <span
              className="header-search_text"
              onClick={() => setOpenOption(!openOption)}
            >
              {`${options.adult} adult . ${options.children} children . ${options.room} room`}
            </span>
            {openOption && (
              <div className="options">
                <div className="option-item">
                  <span className="option-text">Adult</span>
                  <div className="option-counter">
                    <button
                      className="option-counter_btn"
                      disabled={options.adult <= 1}
                      onClick={() => handleOption("adult", "d")}
                    >
                      -
                    </button>
                    <span className="option-counter_number">
                      {options.adult}
                    </span>
                    <button
                      className="option-counter_btn"
                      onClick={() => handleOption("adult", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* Children */}
                <div className="option-item">
                  <span className="option-text">Children</span>
                  <div className="option-counter">
                    <button
                      className="option-counter_btn"
                      disabled={options.children <= 1}
                      onClick={() => handleOption("children", "d")}
                    >
                      -
                    </button>
                    <span className="option-counter_number">
                      {options.children}
                    </span>
                    <button
                      className="option-counter_btn"
                      onClick={() => handleOption("children", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* room */}
                <div className="option-item">
                  <span className="option-text">Room</span>
                  <div className="option-counter">
                    <button
                      className="option-counter_btn"
                      disabled={options.room <= 1}
                      onClick={() => handleOption("room", "d")}
                    >
                      -
                    </button>
                    <span className="option-counter_number">
                      {options.room}
                    </span>
                    <button
                      className="option-counter_btn"
                      onClick={() => handleOption("room", "i")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
