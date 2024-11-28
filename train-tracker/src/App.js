import './styles/App.css';
import {getRoutesJSONData, getStationsJSONData, getTrainList, stationFromRaw} from './AmtrakAPI';
import train_icon from './images/train_icon.png';
import React, {useState, useEffect} from 'react'
import { Link, Routes, Route, HashRouter, useNavigate } from 'react-router-dom';

import Home from './Home';
import TrainPage, {TrainForm} from './TrainPage';

import { getClosestStation } from './functionality/app';

function App() {
    const [userLocation, setUserLocation] = useState(null);
    const [selectedStation, setSelectedStation] = useState("");
    const [selectedRoute, setSelectedRoute] = useState("");

    const [allTrains, setAllTrains] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);
    const [allStations, setAllStations] = useState([]);

    useEffect(() => {
        async function getRoutes(){
            const routes = await getRoutesJSONData();
            setAllRoutes(routes);
        }
        
        async function getStations(){
            const stations = await getStationsJSONData();
            setAllStations(stations.StationsDataResponse.features.map(m => stationFromRaw(m.properties)));
        }
        
        async function getTrains(){
            const trains = await getTrainList();
            setAllTrains(trains);
        }
        getRoutes();
        getStations();
        getTrains();
    },[]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                setUserLocation(pos);
                if (allStations.length > 0 && pos){
                    setSelectedStation(getClosestStation(allStations, pos).stationCode);
                }
            }, 
            (error) => console.log('error' + error));
        }
        
    }, [allStations]);


    function TrainForm(){
        const [selectedNumber, setSelectedNumber] = useState("");

        const navigate = useNavigate();

        function handleNumber(e){ setSelectedNumber(e.target.value); }

        function search(event){
            event.preventDefault();
            navigate("/train/"+selectedNumber);
        }

        return (
            <form onSubmit={search}>
                <input className="select-box" value={selectedNumber} placeholder="Search by Number" onChange={handleNumber} type="number" min='1'></input>
            </form>
        )
    }
  
    const HomePage = <Home
        allTrains={allTrains}
        allRoutes={allRoutes}
        allStations={allStations}
        userLocation={userLocation}
        selectedStation={selectedStation}
        setSelectedStation={setSelectedStation}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
    />;
    
  return (
    <HashRouter>
        <div className="App">
          <div className="header">
              <Link to="/">
                <div className="heading-box">
                    <img src={train_icon} alt="Train Icon" className="train_icon" />
                    <h1>TrainTracker</h1>
                </div>
              </Link>
              
              <TrainForm/>
          </div>
              
          <div className='content'>
                <Routes>
                    <Route path="/" element={HomePage}/>
                    <Route path="/home" element={HomePage}/>
                    <Route path="/train/:trainInfo" element={<TrainPage allTrains={allTrains}/>}/>

                </Routes>
              </div> 
          </div>
    </HashRouter>
  );
}

export default App;
