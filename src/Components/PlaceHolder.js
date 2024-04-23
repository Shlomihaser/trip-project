import React from "react";
import {Routes,Route} from 'react-router-dom'
import StartPage from "./StartPage";
import TripInfo from "./TripInfo";

function PlaceHolder(){
    return (<div>
        <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/:name" element={<TripInfo/>}/>
        </Routes>
    </div>);
}

export default PlaceHolder;