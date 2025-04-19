import React from "react";
import homeImg from './img/home.png';
import Products from "./Products";

const Home = () => {

  return (
    <div className="hero">
      <div className="card text-bg-dark border-0">
        <img src={homeImg} className="card-img" alt="Backgroud" height="550px"/>
          <div className="card-img-overlay d-flex flex-column justify-content-around">
            <div className="container">
              <h5 className="card-title display-3 fw-bolder mb-0" >NEW SEASON ARRIVALS</h5>
              <p className="card-text lead fs-2">
                CHECK OUT ALL THE TRENDS
              </p>
            </div>
          </div>
      </div>
      <Products />
    </div>
  );
}

export default Home;