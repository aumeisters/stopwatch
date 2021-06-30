class StopWatch {
    constructor(selector) {
        this.startPoint = 0;
        this.minutes = 0;
        this.lastLapM = 0;
        this.lastLapS = 0;
        this.rotationMinutes = 0;
        this.startTimer;
        this.selector = selector;
    }
    contTimer() {
        document.querySelector(`.${this.selector}_stopwatch_control_start`).disabled = true;
        if (sessionStorage[`${this.selector}_seconds`]) this.startPoint = Number(sessionStorage[`${this.selector}_seconds`]);
        if (sessionStorage[`${this.selector}_minutes`]) this.minutes = Number(sessionStorage[`${this.selector}_minutes`]);
        this.startPoint += 0.01;
        this.rotationMinutes += 0.01;
        if (this.startPoint.toFixed(2) > 59.99) this.startPoint = 0.01, this.minutes ++;
        this.updateTime(this.startPoint);
        this.rotateArrow(this.startPoint,`.${this.selector}_stopwatch_clock_clock_arrow`);
        this.rotateArrow((this.rotationMinutes / 60 ),`.${this.selector}_stopwatch_clock_clock_arrow_minutes`);
        this.saveData(this.startPoint,this.minutes);
    }
    addLap() {
        let lapM = this.minutes - this.lastLapM;
        let lapS = this.startPoint - this.lastLapS;
        if (this.lastLapS > this.startPoint ) lapS = this.startPoint + (this.minutes * 60) - this.lastLapS, lapM = 0;
        let li = document.createElement('li');
        if (lapM === 0 && lapS === 0) return;
        li.innerHTML = `
            <span class = 'stopwatch_laps_lap'>
                <span class = '${this.selector}_stopwatch_laps_time stopwatch_laps_time'>+ ${this.formatTime(lapM)}:${this.formatTime(lapS.toFixed(2))}</span>
                <span class = 'stopwatch_laps_lap_del'>DELETE</span>
            </span>`;
        this.lastLapM = this.minutes;
        this.lastLapS = this.startPoint;
        document.querySelector(`.${this.selector}_stopwatch_laps`).append(li);
        document.querySelector(`.${this.selector}_stopwatch_laps`).addEventListener('click', (e) => {
            if (e.target.innerHTML === 'DELETE') {
                e.target.parentElement.parentElement.remove();
                this.indicateResults();
            };
        });
        this.indicateResults(); 
    }
    indicateResults() {
        let lapsArr = [];
        document.querySelectorAll(`.${this.selector}_stopwatch_laps_time`).forEach( elem => {
            elem.classList.remove('best_lap');
            elem.classList.remove('worst_lap');
            let elemTime = [...elem.innerHTML];
            elemTime = elemTime.filter( item => {
                if (item === '0') return item;
                if (Number(item) !== NaN) return Number(item);
            });
            elemTime = elemTime.reduce((prev,curr) => '' + prev + curr);
            lapsArr.push([elem, elemTime]);
        });
        if (lapsArr.length === 0) return;
        if (lapsArr.length === 1) return lapsArr[0][0].classList.add('best_lap');
        lapsArr.sort( (a, b) => a[1] - b[1]);
        lapsArr[0][0].classList.add('worst_lap');
        lapsArr[lapsArr.length -1][0].classList.add('best_lap');
    }
    reset() {
        this.startPoint = 0;
        this.minutes = 0;
        this.updateTime(0);
        this.rotationMinutes = 0;
        document.querySelector(`.${this.selector}_stopwatch_laps`).innerHTML = '';
        this.lastLapM = 0;
        this.lastLapS = 0;
        this.rotateArrow(0,`.${this.selector}_stopwatch_clock_clock_arrow`);
        this.rotateArrow(0,`.${this.selector}_stopwatch_clock_clock_arrow_minutes`);
        sessionStorage.removeItem(`${this.selector}_seconds`);
        sessionStorage.removeItem(`${this.selector}_minutes`);
    }
    stop() {
        clearInterval(this.startTimer);
        document.querySelector(`.${this.selector}_stopwatch_control_start`).disabled = false;
    }
    start() {
        this.startTimer = setInterval(this.contTimer.bind(this),10); 
    }
    updateTime(seconds) {
        document.querySelector(`.${this.selector}_stopwatch_screen_output`).innerHTML =  `${this.formatTime(this.minutes)}:${this.formatTime(seconds.toFixed(2))}`;
    }
    formatTime(time) {
        if (time < 10) return  time = `0${(time)}`;
        return time;
    }
    rotateArrow(time,selector) {
        document.querySelector(selector).style.transform = `rotate(${(time * 6)}deg) translateY(-50%)`;
    }
    init() {
        let div = document.createElement('div');
        div.classList.add(this.selector);
        document.body.append(div);
        document.querySelector(`.${this.selector}`).innerHTML = `
            <div class="stopwatch">
            <div class="stopwatch_screen">
                <p class="${this.selector}_stopwatch_screen_output stopwatch_screen_output">00:00.00</p>
            </div>
            <div class="${this.selector}_stopwatch_control stopwatch_control">
                <button class="${this.selector}_stopwatch_control_start">Start</button>
                <button>Stop</button>
                <button>Reset</button>
                <button>Lap</button>
            </div>
            <div class="stopwatch_clock">
                <div class="stopwatch_clock_clock">
                    <div class="${this.selector}_stopwatch_clock_clock_arrow stopwatch_clock_clock_arrow"></div>
                    <div class="stopwatch_clock_clock_minutes">
                        <div class="${this.selector}_stopwatch_clock_clock_arrow_minutes stopwatch_clock_clock_arrow_minutes"></div>
                    </div>
                </div>
            </div>
            <ol class="${this.selector}_stopwatch_laps stopwatch_laps"></ol>
        </div>
        `;
        document.querySelector(`.${this.selector}_stopwatch_control`).addEventListener('click', (e) => {
            if (e.target.innerHTML === "Start") this.start();
            if (e.target.innerHTML === 'Stop') this.stop();
            if (e.target.innerHTML === 'Reset') this.reset();
            if (e.target.innerHTML === 'Lap') this.addLap();
        });
    }
    saveData(seconds,minutes) {
        sessionStorage.setItem(`${this.selector}_seconds`, seconds);
        sessionStorage.setItem(`${this.selector}_minutes`, minutes);
    }
};
const stopwatch1 = new StopWatch('output1');
stopwatch1.init();
// const stopwatch2 = new StopWatch('output2');
// stopwatch2.init();