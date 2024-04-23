import React from "react";
import { useLocation } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Popup, Marker, Tooltip } from 'react-leaflet'
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet/dist/images/marker-icon.png';
import marker from '../../node_modules/leaflet/dist/images/marker-icon-2x.png';
import { Icon } from 'leaflet'

const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [32, 32]
})


function TripInfo() {
    const location = useLocation();
    const route = location.state ? location.state.route : null;

    return (<div>
        <h1>TripInfo</h1>
        <p>{route.name}</p>
        <MapContainer
            style={{height: 500, width: 500}}
            center={[route.start.lat, route.start.lng]}
            attributionControl={true}
            zoom={10}
            minZoom={3}
            scrollWheelZoom={true}>
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


    </div>);
}

export default TripInfo;