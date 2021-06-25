const stopWatch = {
    startPoint: 0,
    minutes: 0,
    lastLapM : '00',
    lastLapS : '00',
    contTimer() {
        document.querySelector('.stopwatch_control_start').disabled = true;
        this.startPoint += 0.01;
        if (this.startPoint.toFixed(2) > 59.99) this.startPoint -= 59.99, this.minutes++;
        this.updateTime(this.startPoint);
        this.rotateArrow(this.startPoint);
    },
    addLap() {
        let lapM = this.minutes - this.lastLapM;
        let lapS = this.startPoint - this.lastLapS;
        let li = document.createElement('li');
        if (lapM === 0 && lapS === 0) return;
        li.innerHTML = `
            <span class = 'stopwatch_laps_lap'>
                <span class = 'stopwatch_laps_time'>+ ${this.formatTime(lapM)}:${this.formatTime(lapS.toFixed(2))}</span>
                <span class = 'stopwatch_laps_lap_del'>DELETE</span>
            </span>`;
        this.lastLapM = this.minutes;
        this.lastLapS = this.startPoint;
        document.querySelector('.stopwatch_laps').append(li);
        document.querySelector('.stopwatch_laps').addEventListener('click', (e) => {
            if (e.target.innerHTML === 'DELETE') {
                e.target.parentElement.parentElement.remove();
                this.indicateResults();
            };
        });
        this.indicateResults(); 
    },
    indicateResults() {
        let lapsArr = [];
        document.querySelectorAll('.stopwatch_laps_time').forEach( elem => {
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
    },
    reset() {
        this.startPoint = 0;
        this.minutes = 0;
        this.updateTime(0);
        document.querySelector('.stopwatch_laps').innerHTML = '';
        this.lastLapM = 0;
        this.lastLapS = 0;
        this.rotateArrow(0);
    },
    stop() {
        clearInterval(startTimer);
        document.querySelector('.stopwatch_control_start').disabled = false;
    },
    start() {
        startTimer = setInterval(stopWatch.contTimer.bind(stopWatch),10); 
    },
    updateTime(seconds) {
        document.querySelector('.stopwatch_screen_output').innerHTML =  `${this.formatTime(this.minutes)}:${this.formatTime(seconds.toFixed(2))}`;
    },
    formatTime(time) {
        if (time < 10) return  time = `0${(time)}`;
        return time;
    },
    rotateArrow(seconds) {
        document.querySelector('.stopwatch_clock_clock_arrow').style.transform = `rotate(${(seconds * 6)}deg )`;
    }
};

document.querySelector('.stopwatch_control').addEventListener('click', (e) => {
    if (e.target.innerHTML === "Start") stopWatch.start();
    if (e.target.innerHTML === 'Stop') stopWatch.stop();
    if (e.target.innerHTML === 'Reset') stopWatch.reset();
    if (e.target.innerHTML === 'Lap') stopWatch.addLap();
});
