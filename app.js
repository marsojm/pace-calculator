
class PaceCalculator {
    constructor() {

    }

    calculateSwimPace(dist, h, m, s) {
        if (dist === 0) {
            return [0,0];
        }

        const totalSeconds = (h * 60 * 60) + (m * 60) + s;


        const paceInSeconds = (totalSeconds/dist) * 100;
        const minutes = Math.floor(paceInSeconds / 60);
        const seconds = Math.round(paceInSeconds - (minutes * 60));
        return [minutes, seconds];
    }

    calculateBikePace(dist, h, m, s) {
        if (dist === 0) {
            return 0.0;
        }

        const totalHours = h + (m / 60) + (s / 3600);


        const paceInHours = totalHours > 0 ? (dist/totalHours) : 0;

        return paceInHours;
    }
}

class UIController {
    constructor() {
        this.uiElements = {
            SWIM_DISTANCE: '#swim_distance',
            SWIM_HOURS: '#swim_hours',
            SWIM_MINUTES: '#swim_minutes',
            SWIM_SECONDS: '#swim_seconds',
            SWIM_PACE: '.swim-pace',
            SWIM_PACE_BTN: '.btn-calculate-swim-pace',

            BIKE_DISTANCE: '#bike_distance',
            BIKE_HOURS: '#bike_hours',
            BIKE_MINUTES: '#bike_minutes',
            BIKE_SECONDS: '#bike_seconds',
            BIKE_PACE: '.bike-pace',
            BIKE_PACE_BTN: '.btn-calculate-bike-pace'
        };
    }

    getSwimFieldValues() {
        let distance = document.querySelector(this.uiElements.SWIM_DISTANCE).value;
        let hours = document.querySelector(this.uiElements.SWIM_HOURS).value;
        let minutes = document.querySelector(this.uiElements.SWIM_MINUTES).value;
        let seconds = document.querySelector(this.uiElements.SWIM_SECONDS).value;

        return [distance, hours, minutes, seconds];
    }

    getBikeFieldValues() {
        let distance = document.querySelector(this.uiElements.BIKE_DISTANCE).value;
        let hours = document.querySelector(this.uiElements.BIKE_HOURS).value;
        let minutes = document.querySelector(this.uiElements.BIKE_MINUTES).value;
        let seconds = document.querySelector(this.uiElements.BIKE_SECONDS).value;

        return [distance, hours, minutes, seconds];
    }

    updateSwimPace(minutes, seconds) {
        let pace = null;
        if (minutes === undefined || seconds === undefined) {
            pace = "--:--"; 
        } else {
            pace = `${minutes}:${seconds}`;
        }
        document.querySelector(this.uiElements.SWIM_PACE).innerHTML = `${pace} min/100m`; 
    }

    updateBikePace(pace) {

        if (pace === undefined) {
            pace = "--"; 
        } 
        document.querySelector(this.uiElements.BIKE_PACE).innerHTML = `${pace} km/h`; 
    }
}

class App {
    constructor(paceCalculator, uiCtrl) {
        this.paceCalculator = paceCalculator;
        this.uiCtrl = uiCtrl;
    }

    toInt(s) {
        if (s === undefined || s === '') {
            return 0;
        } else {
            return parseInt(s);
        }
    }

    toFloat(s) {
        if (s === undefined || s === '') {
            return 0;
        } else {
            return parseFloat(s);
        }
    }

    calculateSwimPace() {
        const swimParams = this.uiCtrl.getSwimFieldValues().map(v => this.toInt(v));
        const swimValues = this.paceCalculator.calculateSwimPace(...swimParams);
        
        this.uiCtrl.updateSwimPace(...swimValues.map(v => v.toString()));
    }

    calculateBikePace() {
        const [distStr, hStr, mStr, sStr] = this.uiCtrl.getBikeFieldValues();
        const bikeParams = [this.toFloat(distStr), this.toInt(hStr), this.toInt(mStr), this.toInt(sStr)]

        const bikePace = this.paceCalculator.calculateBikePace(...bikeParams);
        this.uiCtrl.updateBikePace(bikePace.toFixed(2));
    }

    initEventHandlers() {
        let self = this;
        document.querySelector(this.uiCtrl.uiElements.SWIM_PACE_BTN).addEventListener('click', function() {
            self.calculateSwimPace();
        });

        document.querySelector(this.uiCtrl.uiElements.BIKE_PACE_BTN).addEventListener('click', function() {
            self.calculateBikePace();
        });
    }
}

const app = new App(new PaceCalculator(), new UIController());
app.initEventHandlers();