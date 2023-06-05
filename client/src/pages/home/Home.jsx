import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import PropertyList from "../../components/propertyList/PropertyList";

import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      {/* <div className="home-container">
        <Featured />
        <h1 className="home-title">Browse By Property type</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div> */}
    </div>
  );
};

export default Home;
