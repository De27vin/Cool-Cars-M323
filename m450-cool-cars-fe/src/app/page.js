"use client";

import { useState } from "react";
import FilterPopup from "./filter-popup";
import "./globals.css";

export default function Home() {
    const [cars, setCars] = useState([]);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5); // Fixed size per page
    const [totalPages, setTotalPages] = useState(10); // Fixed total pages

    const loadData = () => {
        fetch(`http://localhost:8080/cars/search?query=${query}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setCars(data); // Update the cars with the fetched data
            })
            .catch((error) => console.error("Error fetching cars:", error));
    };
    
    // Fetch the data for cars based on query and current page
    const fetchCars = () => {
        fetch(`http://localhost:8080/cars/search?query=${query}&page=${page}`)
            .then(response => response.json())
            .then(data => {
                setCars(data); // Update cars list with data from the backend
            })
            .catch((error) => console.error("Error fetching cars:", error));
    };

    // Handle the "Next Page" button
    const nextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
            loadData();
        }
    };

    // Handle the "Previous Page" button
    const prevPage = () => {
        if (page > 0) {
            setPage(page - 1);
            loadData();
        }
    };

    // Apply filters to the cars
    const handleFilterApply = (filterOptions) => {
        const { filterCriteria, order } = filterOptions;

        // Send chosen filter criteria and order asc/desc with the URL to the backend
        fetch(`http://localhost:8080/cars/sorted?criteria=${filterCriteria}&order=${order}`)
            .then(response => response.json())
            .then(data => {
                setCars(data); // Update cars list with filtered data
            })
            .catch((error) => console.error("Error fetching sorted cars:", error));
    };

    // Handle search query on form submit
    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        fetchCars(); // Fetch cars based on the query and current page
    };

    // Get all cars (no search or filter)
    function buttonHandler() {
        fetch("http://localhost:8080/cars")
            .then(response => response.json())
            .then(data => setCars(data))
            .catch((error) => console.error("Error fetching all cars:", error));
    }

    return (
        <div className="App-page-js">
            <h1>Cool Cars Project</h1>

            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update query on input change
                    placeholder="Search..."
                    aria-label="Search field"
                />
                <button type="submit" aria-label="Submit search">Search</button>
            </form>

            {/* imported FilterPopup component */}
            <FilterPopup onApply={handleFilterApply} />
            <button onClick={buttonHandler}>Load all cars</button>
            <br />

            <ul>
                {cars.map((car) => (
                    <li key={car.id}>
                        {car.brand} {car.model}, {car.horsePower} HP
                    </li>
                ))}
            </ul>
                <br/>
                <div>
                    <button onClick={prevPage} disabled={page <= 0}>Previous</button>
                    <span>Page {page + 1} of {totalPages}</span>
                    <button onClick={nextPage} disabled={page >= totalPages - 1}>Next</button>
                </div>
            </div>
    );
}
