import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import marker from 'leaflet/dist/images/marker-icon.png';
import { Icon } from 'leaflet';
import loadingImg from '../loading.png'; // Import the loading image

const apiKey = 'OPPfWY6R4eEiyOCxV88g9g';
const stableHordeUrl = 'https://stablehorde.net/api/v2/generate/async';
const stablePhotoGenerateURL = 'https://stablehorde.net/api/v2/generate/status/';
const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [32, 32]
});

function TripInfo() {
    const location = useLocation();
    const route = location.state ? location.state.route : null;
    const [photoUrl, setPhotoUrl] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchPhotoUrl();
     }, []);

    const fetchPhotoUrl = async () => {
        try {
            const response = await fetch(stableHordeUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    apiKey: apiKey
                },
                body: JSON.stringify({prompt:route.name})
            });
            const data = await response.json();
            await checkPhotoStatus(data.id);
        } catch (error) {
            console.error(error);
        }
    };

    const checkPhotoStatus = async (id) => {
        try {
            const response = await fetch(stablePhotoGenerateURL + id);
            const data = await response.json();
            if (data.generations.length === 0 || !data.generations[0].img) {
                setTimeout(() => checkPhotoStatus(id), 50000); // Check again after 1 minute
            } else {
                setPhotoUrl(data.generations[0].img);
                setLoading(false);
            }
        } catch (error) 
        {
            console.error(error);
        }
    };



    return (
        <div className="trip-info-container">
            <h1 style={{ textAlign: "center" }}>{route.name}</h1>
            <div className="route-info">
                <p>{route.description}</p>
                <p>Distance: {route.distance}</p>
            </div>
            <div className="map-photo-container">
                <div className="map-container">
                    <MapContainer
                        center={[route.start.lat, route.start.lng]}
                        zoom={10}
                        style={{ height: "400px", width: "100%" }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[route.start.lat, route.start.lng]} icon={myIcon}>
                            <Tooltip permanent>Start point</Tooltip>
                        </Marker>
                        <Marker position={[route.end.lat, route.end.lng]} icon={myIcon}>
                            <Tooltip direction="bottom" permanent>End point</Tooltip>
                        </Marker>
                    </MapContainer>
                </div>
                <div className="photo-container">
                    {loading ? (
                        <div className="loading-container">
                            <img id="loading-img"src={loadingImg} alt="Loading..." />
                            <p>Loading...</p>
                            <p>This may take up to 5 minutes.</p>
                        </div>
                    ) : (
                        <img src={photoUrl} alt="Route" style={{ maxWidth: "100%", maxHeight: "400px" }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default TripInfo;
