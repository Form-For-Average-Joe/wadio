import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PushupsAssessment from './PushupsAssessment';
import PushupsTraining from './PushupsTraining';
import SitupsAssessment from './SitupsAssessment';
import SitupsTraining from './SitupsTraining';


ReactDOM.render((
    <BrowserRouter>
    <div>
        <Routes>
            <Route exact path="/" element={<App />}/>
            <Route exact path="/pushupsassessment" element={<PushupsAssessment />}/>
            <Route exact path="/pushupstraining" element={<PushupsTraining />}/>
            <Route exact path="/situpsassessment" element={<SitupsAssessment />}/>
            <Route exact path="/situpstraining" element={<SitupsTraining />}/>
         </Routes>
    </div>
    </BrowserRouter>),
   document.getElementById('root'));