let startPoint = 0,
    minutes = '00',
    hours = '00',
    lastLapM = minutes;
    lastLapS = startPoint;
document.querySelector('.stopwatch_control').addEventListener('click', (e) => {
    if (e.target.innerHTML === "Start") { 
        startTimer = setInterval(contTimer,10); 
    };
    if (e.target.innerHTML === 'Stop') {
        clearInterval(startTimer);
        document.querySelector('.stopwatch_control_start').disabled = false;
    };
    if (e.target.innerHTML === 'Reset') {
        startPoint = 0;
        updateTime(0);
        document.querySelector('.stopwatch_laps').innerHTML = '';
        lastLapM = 0;
        lastLapS = 0;
    };
    if (e.target.innerHTML === 'Lap') {
        let lapM = minutes - lastLapM;
        let lapS = startPoint - lastLapS;
        let li = document.createElement('li');
        if (lapM === 0 && lapS === 0) return;
        li.innerHTML = `
            <span class = 'stopwatch_laps_lap'>
                <span class = 'stopwatch_laps_time'>+ ${formatTimeM(lapM)}:${formatTimeS(lapS)}</span>
                <span class = 'stopwatch_laps_lap_del'>DELETE</span>
            </span>`;
        lastLapM = minutes;
        lastLapS = startPoint;
        document.querySelector('.stopwatch_laps').append(li);
        document.querySelector('.stopwatch_laps').addEventListener('click', (e) => {
            if (e.target.innerHTML === 'DELETE') {
                e.target.parentElement.parentElement.remove();
                indicateResults();
            };
        });
        indicateResults(); 
    };
});
function contTimer() {
    document.querySelector('.stopwatch_control_start').disabled = true;
    startPoint += 0.01;
    if (startPoint.toFixed() > 59) startPoint -= 59, minutes++;
    updateTime(startPoint);
};
function updateTime(seconds) {
    document.querySelector('.stopwatch_screen_output').innerHTML =  `${formatTimeM(minutes)}:${formatTimeS(seconds)}`;
};
function formatTimeM(minutes) {
    if (typeof minutes === 'string' || minutes > 9) return minutes;
    if (minutes < 10) return  minutes = `0${(minutes).toString()}`;
};
function formatTimeS(seconds) {
    seconds = seconds.toFixed(2);
    if (seconds < 10) return seconds = `0${seconds}`;
    return seconds;
};
function indicateResults() {
    let lapsArr = [];
    document.querySelectorAll('.stopwatch_laps_time').forEach( elem => {
       elem.classList.remove('best_lap');
       elem.classList.remove('worst_lap');
       let elemTime = [...elem.innerHTML];
       elemTime = elemTime.filter( item => {
          if (item === '0') return item;
          if (Number(item) !== NaN) return Number(item);
       })
       elemTime = elemTime.reduce((prev,curr) => '' + prev + curr);
       lapsArr.push([elem, elemTime]);
    });
    if (lapsArr.length === 0) return;
    if (lapsArr.length === 1) return lapsArr[0][0].classList.add('best_lap');
    lapsArr.sort( (a, b) => a[1] - b[1])
    lapsArr[0][0].classList.add('worst_lap');
    lapsArr[lapsArr.length -1][0].classList.add('best_lap');
};