import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";

const AnimalGallery = () => {
  const { animalType } = useParams();
  const [animals, setAnimals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [setLoading] = useState(true);
  Modal.setAppElement("#root");

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(
          `https://freetestapi.com/api/v1/${animalType}`
        );
        setAnimals(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };
    fetchAnimals();
  }, [animalType]);

  const filteredAnimals = animals.filter((animal) =>
    animal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="gallery">
        {filteredAnimals.map((animal) => (
          <div
            key={animal.id}
            className="gallery-card"
            onClick={() => setSelectedAnimal(animal)}
          >
            <img src={animal.image} alt={animal.name} />
            <div className="card-details">
              <h3>{animal.name}</h3>
              <p>{animal.origin}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedAnimal && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedAnimal(null)}
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <div>{selectedAnimal.name}</div>
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setSelectedAnimal(null)}
            />
          </div>
          <div className="modal-body">
            <img src={selectedAnimal.image} alt={selectedAnimal.name} className="modal-image" />
            <div>
              <p><span className="modal-label">Origin:</span> {selectedAnimal.origin ? selectedAnimal.origin : "Origin not provided"}</p>
              <p><span className="modal-label">Temperament:</span> {selectedAnimal.temperament}</p>
              <p><span className="modal-label">Colors:</span> {selectedAnimal.colors ? selectedAnimal.colors.join(", ") : "No color available"}</p>
              <p><span className="modal-label">Description:</span> {selectedAnimal.description}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AnimalGallery;
