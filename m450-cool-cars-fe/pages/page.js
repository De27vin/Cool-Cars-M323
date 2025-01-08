"use client"

import { useState } from "react";
import Link from "next/link";
import FilterPopup from "../src/app/filter-popup"; // Stelle sicher, dass du den richtigen Pfad zu FilterPopup verwendest

export default function Home() {
  // Zustand für Autos und Filterkriterien
  const [cars, setCars] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({ filterCriteria: "hp", order: "asc" });

  // Funktion, die aufgerufen wird, wenn der Filter angewendet wird
  const handleFilterApply = (filterOptions) => {
    console.log("Applied Filter:", filterOptions);
    setFilterCriteria(filterOptions); // Setzt die Filterkriterien im Zustand
  };

  // Funktion zum Laden der Autos, wenn der Button gedrückt wird
  function buttonHandler() {
    let url = "http://localhost:8080/cars";
    
    // Wenn Filter angewendet wurde, füge die Filterparameter zur URL hinzu
    // if (filterCriteria) {
    //  url += `?filterBy=${filterCriteria.filterCriteria}&order=${filterCriteria.order}`;
    // }

    fetch(url)
      .then(response => response.json())
      .then(data => setCars(data)); // Setzt die Autos im Zustand
  }

  return (
    <div className="App">
      <h1>My Frontend - The very beginning</h1>

      {/* FilterPopup erhält die onApply-Funktion als Prop */}
      <FilterPopup onApply={handleFilterApply} />

      <button onClick={buttonHandler}>Load Cars</button>
      <br />

      
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            {car.brand + " " + car.model + ", " + car.horsePower + "HP"}
          </li>
        ))}
      </ul>

      {/* Link zum Hinzufügen eines neuen Autos */}
      <Link href="/carform">Add a new car</Link>
    </div>
  );
}
