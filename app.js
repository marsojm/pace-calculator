
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
}

class UIController {
    constructor() {
        this.uiElements = {
            SWIM_DISTANCE: '#swim_distance',
            SWIM_HOURS: '#swim_hours',
            SWIM_MINUTES: '#swim_minutes',
            SWIM_SECONDS: '#swim_seconds',
            SWIM_PACE: '.swim-pace',
            SWIM_PACE_BTN: '.btn-calculate-swim-pace'
        };
    }

    getSwimFieldValues() {
        let distance = document.querySelector(this.uiElements.SWIM_DISTANCE).value;
        let hours = document.querySelector(this.uiElements.SWIM_HOURS).value;
        let minutes = document.querySelector(this.uiElements.SWIM_MINUTES).value;
        let seconds = document.querySelector(this.uiElements.SWIM_SECONDS).value;

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

    calculateSwimPace() {
        const swimParams = this.uiCtrl.getSwimFieldValues().map(v => this.toInt(v));
        const swimValues = this.paceCalculator.calculateSwimPace(...swimParams);
        
        this.uiCtrl.updateSwimPace(...swimValues.map(v => v.toString()));
    }

    initEventHandlers() {
        let self = this;
        document.querySelector(this.uiCtrl.uiElements.SWIM_PACE_BTN).addEventListener('click', function() {
            self.calculateSwimPace();
        });
    }
}

const app = new App(new PaceCalculator(), new UIController());
app.initEventHandlers();