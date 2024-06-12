import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AnimalGallery from "./AnimalGallery";
import "./App.css";
import catImage from "./gallery/cat.webp";
import dogImage from "./gallery/dog.jpg";
import birdImage from "./gallery/bird.jpg";

const Home = () => (
  <div className="main-content">
    <header className="App-header">
      <Link to="/" className="logo">
        Erisa's Zoo
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
    <Link to="/gallery/dogs" className="animal-card big-card">
      <img src={dogImage} alt="Dog" />
      <h2>Dog</h2>
    </Link>
    <Link to="/gallery/cats" className="animal-card big-card">
      <img src={catImage} alt="Cat" />
      <h2>Cat</h2>
    </Link>
    <Link to="/gallery/birds" className="animal-card big-card">
      <img src={birdImage} alt="Bird" />
      <h2>Bird</h2>
    </Link>
  </div>
);

const About = () => (
  <div className="about-section">
    <h2>About Us</h2>
    <p>Information about us.</p>
  </div>
);

const Contact = () => (
  <div className="contact-section">
    <h2>Contact Us</h2>
    <p>Contact information.</p>
  </div>
);

const App = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery/:animalType" element={<AnimalGallery />} />
      </Routes>
    </div>
  </Router>
);

export default App;
