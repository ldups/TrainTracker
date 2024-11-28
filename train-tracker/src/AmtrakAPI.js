const API_HOST = process.env.REACT_APP_API_HOST;

class Stop {
    constructor() {
        this.stationCode = null;

        this.hasArrived = false;
        this.hasDeparted = false;

        this.arrivalTime = null;
        this.departureTime = null;

        this.arrivalPunctuality = null;
        this.departurePunctuality = null;
    }
}

class Station {
    constructor() {
        this.stationCode = null;
        this.name = null;

        this.addr1 = null;
        this.addr2 = null;
        this.city = null;
        this.state = null;
        this.zip = null;

        this.lat = null;
        this.lon = null;
    }
}

class Train {
    constructor() {
        this.number = null;
        this.routeName = null;
        this.from = null;
        this.to = null;
        this.speed = null;
        this.heading = null;
        this.lastUpdate = null;
        this.lastVisitedStation = null;
        this.punctuality = null;
        this.lat = null;
        this.lon = null;
        this.state = null;
        this.stations = []; //of type Stop[]
    }
}

export function stationFromRaw(data) {
    const station = new Station();

    station.stationCode = data.Code;
    station.name = data.StationName;
    station.addr1 = data.Address1;
    station.addr2 = data.Address2;
    station.city = data.City;
    station.state = data.State;
    station.zip = data.Zipcode;
    station.lon = data.lon;
    station.lat = data.lat;

    return station;
}

async function getTrainsJSONData() {
    return fetch(API_HOST + "/getTrains").then(
        res => res.json()
    )
}

export async function getRoutesJSONData() {
    return fetch(API_HOST + "/getRoutes").then(
        res => res.json()
    )
}

export async function getStationsJSONData() {
    return fetch(API_HOST + "/getStations").then(
        res => res.json()
    )
}


export async function getTrainList() {
    let apiData = await getTrainsJSONData();

    let trainList = new Array(apiData.features.length);

    for(let i = 0; i < apiData.features.length; i++) {
        let train = apiData.features[i].properties;

        let lastStationReport = null;
        let nextStationReport = null;
        let lastStationIndex = -1;

        for(let stationNumber = 1; stationNumber <= 20; stationNumber++) {
            let currentStation = train["Station"+stationNumber];
            if(currentStation == null) break;
            currentStation = JSON.parse(currentStation);

            if(currentStation.postdep == null) {
                lastStationIndex = stationNumber - 2;
                nextStationReport = currentStation;
                break;
            }
            lastStationReport = currentStation;
        }

        let stations = [];
        for(let stationNum = 1; stationNum <= 40; stationNum++) {
            let currentStation = train["Station"+stationNum];
            currentStation = JSON.parse(currentStation);
            if(currentStation == null) break;

            let station = new Stop();
            station.stationCode = currentStation.code;
            station.hasArrived = currentStation.postarr != null;
            station.hasDeparted = currentStation.postdep != null;
            if(station.hasArrived) {
                station.arrivalTime = currentStation.postarr;
            } else {
                station.arrivalTime = currentStation.estarr;
                station.arrivalPunctuality = currentStation.estarrcmnt
            }
            if(station.hasDeparted) {
                station.departureTime = currentStation.postdep;
            } else {
                station.departureTime = currentStation.estdep;
                station.departurePunctuality = currentStation.estdepcmnt;
            }
            stations.push(station);
        }

        if(lastStationReport == null) {
            lastStationReport = nextStationReport
        }


        const tempTrain = new Train()
        tempTrain.number = train.TrainNum;
        tempTrain.routeName = train.RouteName
        tempTrain.speed = train.Velocity;
        tempTrain.heading = train.Heading;
        tempTrain.from = train.OrigCode;
        tempTrain.to = train.DestCode;
        tempTrain.scheduledDeparture = train.OrigSchDep;
        tempTrain.lastUpdate = train.updated_at;
        tempTrain.punctuality = lastStationReport.postcmnt;
        tempTrain.lastVisitedStation = lastStationIndex;
        tempTrain.state = train.TrainState;
        tempTrain.lat = apiData.features[i].geometry.coordinates[1]; //Flipped because AmtrakAPI has flipped lat-long
        tempTrain.lon = apiData.features[i].geometry.coordinates[0]; //Flipped because AmtrakAPI has flipped lat-long
        tempTrain.stations = stations;

        trainList[i] = tempTrain;
    }

    return trainList;
}