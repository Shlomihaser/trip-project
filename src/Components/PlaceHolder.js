import React from "react";
import {Routes,Route} from 'react-router-dom'
import StartPage from "./StartPage";
import TripPage from "./TripPage";

function PlaceHolder(){
    return (<div>
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/:name" element={<TripPage/>}/>
        </Routes>
    </div>);
}

export default PlaceHolder;