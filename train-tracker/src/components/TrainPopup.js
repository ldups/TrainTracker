import ReactDOM from "react-dom";
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../styles/TrainPopup.css'
import TrainInfo from "./TrainInfo";

function TrainPopup({onClose, children, actionBar, train}){
    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return ReactDOM.createPortal(<div>
        <div onClick={onClose} className='overlay' ></div> 
        <div className='inner-modal-container'>
        <div className='action-bar'>
            {actionBar}
        </div> 
            <div className='modal-content'>
                {children}
                <Link to={"/train/"+train.number+"?date="+encodeURIComponent(train.scheduledDeparture)} target="_blank">Open in New Tab</Link>
                <TrainInfo train={train}/>   
            </div>  
        </div>
    </div>,
    document.querySelector('.modal-container')
    );
}

export default TrainPopup;