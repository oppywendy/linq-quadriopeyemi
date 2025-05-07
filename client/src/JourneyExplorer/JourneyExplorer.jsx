import React from "react";
import './journey.css';
import planePicture from '../assets/plane-taking-off-runway.jpg';
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

const JourneyExplorer = ({ journeys, page, setPage }) => {
  return (

    <div className="journey-page">
        <div className="journey-container">
      {/* Hero Section */}
      <div
        className="hero-container"
        style={{ backgroundImage: `url(${planePicture})` }}
      >
        <div className="hero-text">
          <h1>Explore Your Journey</h1>
          <p>Find the best routes, prices, and travel options for your journey.</p>
        </div>
      </div>

      {/* Content Section */}
      <h1 className="journey-heading">Journey Explorer</h1>
      <div className="all-journey-container">
        {journeys.map((journey, index) => (
          <div key={index} className="journey-div">
            <h2 className="font-bold text-lg">{journey.route.join(" ➝ ")}</h2>
            <p>Price: ${journey.price}</p>
            <p>Duration: {journey.duration} hours</p>
            <p>Exchanges: {journey.exchanges}</p>
          </div>
        ))}
      </div>
      <div className="btn-div">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="pag-btn"
        >
            <GrFormPrevious />
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="pag-btn"
        >
            
          Next
          <MdNavigateNext />
        </button>
      </div>
    </div>
    </div>
    
  );
};

export default JourneyExplorer;

// hello world
