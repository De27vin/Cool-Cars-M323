"use client"

import {useState} from "react";
import CarForm from "@/app/carform/page";
import Link from "next/link";
import FilterPopup from "./filter-popup";
import "./globals.css"

export default function Home() {
    const [cars, setCars] = useState([])

    const handleFilterApply = (filterOptions) => {
        console.log("Applied Filter:", filterOptions);
    };


    function buttonHandler() {
        fetch("http://localhost:8080/cars")
            .then(response => response.json())
            .then(data => setCars(data))
    }

    return (
        <div className="App-page-js">
            <h1>Cool Cars Project</h1>
            <FilterPopup onApply={handleFilterApply} />
            <button onClick={buttonHandler}>load cars</button>
            <br/>
            <ul>
                { cars.map(car =>
                    <li key={car.id}>
                        {car.brand + " " + car.model + ", " + car.horsePower + "HP"}
                    </li>
                )}
            </ul>
            <Link href="/carform">add a new car</Link>
        </div>
    )
}