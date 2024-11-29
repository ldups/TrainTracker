import './styles/Home.css';
import React, {useState} from 'react'

import TrainMap from './components/TrainMap.js';
import TrainList from './components/TrainList.js';
import Search from './components/Search.js';
import TrainPopup from './components/TrainPopup.js';

import { IoClose } from "react-icons/io5";

function Home({userLocation}){

    // popup modal
    const [selectedTrain, setSelectedTrain] = useState({});
    const [showModal, setShowModal] = useState(false);

    // Modal Functions
    function handleTrainClick(train){
        setShowModal(true);
        setSelectedTrain(train);
    }

    const handleModalClose = () => {
        setShowModal(false);
    };

    const closeButton = (<div>
        <div onClick={handleModalClose} className='close-button'><IoClose size={'3rem'}/></div>
    </div>);

    const modal = <TrainPopup onClose={handleModalClose} actionBar={closeButton} train={selectedTrain}/>
    return (
        <div className='home-page'>
            <div className='search-container'>
              <Search className='Search'
              />
              </div>
              <div className='app-train-list-container'>
                <TrainList className = 'TrainList' 
                    handleTrainClick={handleTrainClick}
                />
              </div>
              <div className='map-container'>
                <TrainMap className = 'Map' 
                    userLocation={userLocation}
                />
              </div>
              <div>
                {showModal && modal}
              </div>
        </div>
    )
}

export default Home;