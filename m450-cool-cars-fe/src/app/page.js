"use client"

import {useState} from "react";
import CarForm from "@/app/carform/page";
import Link from "next/link";
import FilterPopup from "./filter-popup";
import "./globals.css"

export default function Home() {
    const [cars, setCars] = useState([])
    const [query, setQuery] = useState("")

    const handleFilterApply = (filterOptions) => {
        const { filterCriteria, order } = filterOptions;

        fetch(`http://localhost:8080/cars/sorted?criteria=${filterCriteria}&order=${order}`)
            .then((response) => response.json())
            .then((data) => setCars(data))
            .catch((error) => console.error("Error fetching sorted cars:", error));
    };

    const handleSearch = (e) => {
        e.preventDefault()
        fetch(`http://localhost:8080/cars/search?query=${query}`)
            .then((response) => response.json())
            .then((data) => setCars(data))
            .catch((error) => console.error("Error fetching cars containing search query:", error));
    };

    function buttonHandler() {
        fetch("http://localhost:8080/cars")
            .then(response => response.json())
            .then(data => setCars(data))
    }

    return (
        <div className="App-page-js">
            <h1>Cool Cars Project</h1>
            
        <form class="search-form" action="#" method="get"
        onSubmit={handleSearch}
        >
        <input 
        type="text" 
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Suchfeld"
        />
        <button type="submit" aria-label="Suche abschicken"></button>
        </form>

            <FilterPopup onApply={handleFilterApply} />
            <button onClick={buttonHandler}>load cars</button>
            <br/>
            <ul>
                { cars.map (car =>
                    <li key={car.id}>
                        {car.brand + " " + car.model + ", " + car.horsePower + "HP"}
                    </li>
                )}
            </ul>
            <Link href="/carform">add a new car</Link>
        </div>
    )
}