import React, { useState } from "react";

const FilterPopup = ({ onApply }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [filterCriteria, setFilterCriteria] = useState("hp");
    const [order, setOrder] = useState("asc");

    const togglePopup = () => setIsVisible(!isVisible);

    const applyFilter = () => {
        onApply({ filterCriteria, order });
        togglePopup();
    };

    return (
        <div>
            <button onClick={togglePopup} className="filter-button">
                Filter
            </button>

            {isVisible && (
                <div className="popup-container">
                    <div className="popup">
                        <h3>Filter Options</h3>
                        <div className="filter-options">
                            <label>
                                <input
                                    type="radio"
                                    value="name"
                                    checked={filterCriteria === "name"}
                                    onChange={(e) => setFilterCriteria(e.target.value)}
                                />
                                Name (A-Z)
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="model"
                                    checked={filterCriteria === "model"}
                                    onChange={(e) => setFilterCriteria(e.target.value)}
                                />
                                Model (A-Z)
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="hp"
                                    checked={filterCriteria === "hp"}
                                    onChange={(e) => setFilterCriteria(e.target.value)}
                                />
                                HP
                            </label>
                        </div>

                        <div className="order-options">
                            <label>
                                <input
                                    type="radio"
                                    value="asc"
                                    checked={order === "asc"}
                                    onChange={(e) => setOrder(e.target.value)}
                                />
                                Ascending
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="desc"
                                    checked={order === "desc"}
                                    onChange={(e) => setOrder(e.target.value)}
                                />
                                Descending
                            </label>
                        </div>

                        <button onClick={applyFilter} className="apply-button">
                            Apply Filter
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default FilterPopup;
