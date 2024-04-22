import React, { useState } from "react";
import loadingImg from '../loading.png'; // Import the image directly

const OLLAMA_URL = "http://localhost:11434/api/generate";

function StartPage() {
    const [country, setCountry] = useState("");
    const [tripKind, setTripKind] = useState("Cycling");
    const [loading, setLoading] = useState(false);

    const requestData = {
        model: "llama3",
        prompt: "im gonna give you a country and a kind of trip, give me recommended route for the country and kind of trip,  answer me only with coordinates of waypoints along the route",
        stream: false
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        requestData.prompt += `\nCountry: ${country} \nTrip kind: ${tripKind}`;

        fetch(OLLAMA_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.response);
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            setLoading(false);
        });

        requestData.prompt = "";
    };

    return (
        <div>
            <h1>Pick your trip</h1>
            <form className="form-container">
                <div className="form-group">
                    <label htmlFor="countryInput">Country</label>
                    <input type="text" id="countryInput" placeholder="Enter country" onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="tripKind">Trip Kind</label>
                    <select name="trip-kind" id="tripKind" onChange={(e) => setTripKind(e.target.value)}>
                        <option value="cycling">Cycling</option>
                        <option value="walking">Walking</option>
                        <option value="vehicle">Vehicle</option>
                    </select>
                </div>
                <div className="form-group">
                    <button id="button-run" onClick={handleSubmit}>
                        {!loading && <span>Find</span>}
                        {loading && <img src={loadingImg} alt="Loading..." id="loading-img"/>} {/* Make sure to provide an alt text */}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default StartPage;
