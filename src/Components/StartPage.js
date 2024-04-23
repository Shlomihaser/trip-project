import React, { useState } from "react";
import loadingImg from '../loading.png'; // Import the image directly
import { Link } from 'react-router-dom';


const OLLAMA_URL = "http://localhost:11434/api/generate";

function StartPage() {
    const [country, setCountry] = useState("");
    const [tripKind, setTripKind] = useState("Bicycle");
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null); // State to hold fetched data

    const requestData = {
        model: "llama3",
        prompt: "",
        stream: false,
        format: "json"
    };

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        requestData.prompt = `3 ${tripKind} routes in ${country},format: {routes:[{name:,description:,distance:,start:{name:,lat:,lng:},end:{name:,lat:,lng:}}]}`;

        fetch(OLLAMA_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(JSON.parse(data.response));
                setLoading(false);
                setResponseData(JSON.parse(data.response));
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <div className="main-container">
            <h1>Pick your trip</h1>
            <form className="form-container">
                <div className="form-group">
                    <label htmlFor="countryInput">Country</label>
                    <input type="text" id="countryInput" placeholder="Enter country" onChange={(e) => setCountry(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="tripKind">Trip kind</label>
                    <select name="trip-kind" id="tripKind" onChange={(e) => setTripKind(e.target.value)}>
                        <option value="bicycle">Bicycle</option>
                        <option value="walking">Walking</option>
                        <option value="vehicle">Vehicle</option>
                    </select>
                </div>
                <div className="form-group">
                    <button id="button-run" onClick={handleSubmit}>
                        {!loading && <span>Find</span>}
                        {loading && <img src={loadingImg} alt="Loading..." id="loading-img" />} {/* Make sure to provide an alt text */}
                    </button>
                </div>
            </form>
            {responseData && // Render iframes if data is available
                <div className="iframe-container">
                    <ul>
                        {
                            responseData.routes.map((route, index) => (
                                <li key={index}><Link to={`/${route.name}`} state={{route:route}}>Route {index}</Link></li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    );
}

export default StartPage;
