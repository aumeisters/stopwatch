let startPoint = 0,
    minutes = '00',
    hours = '00',
    lastLapM = '00',
    lastLapS = '00';
document.querySelector('.stopwatch_control_start').addEventListener('click', () => {
    let startTimer = setTimeout(function contTimer() {
        startPoint += 0.01;
        if (startPoint.toFixed() > 59) startPoint -= 59, minutes++;
        updateTime(startPoint);
        startTimer = setTimeout(contTimer, 10);
    },10);
    document.querySelector('.stopwatch_control_stop').addEventListener('click', () => {
        clearTimeout(startTimer);
    });  
});
document.querySelector('.stopwatch_control_reset').addEventListener('click', () => {
    startPoint = 0;
    minutes = '00';
    hours = '00';
    lastLapM = '00';
    lastLapS = '00';
    updateTime(0);
    document.querySelector('.stopwatch_laps').innerHTML = '';
});
document.querySelector('.stopwatch_control_lap').addEventListener('click', () => {
    let lapM = minutes - lastLapM;
    let lapS = startPoint - lastLapS;
    let li = document.createElement('li');
    li.innerHTML = `
        <span class = 'stopwatch_laps_lap'>
            <span class = 'stopwatch_laps_time'>+ ${formatTimeM(lapM)}:${formatTimeS(lapS)}</span>
            <span class = 'stopwatch_laps_lap_del'>DELETE</span>
        </span>`;
    lastLapM = minutes;
    lastLapS = startPoint;
    document.querySelector('.stopwatch_laps').append(li);
    document.querySelectorAll('.stopwatch_laps_lap_del').forEach(elem => elem.addEventListener('click', (e) => {
        e.target.parentElement.parentElement.remove();
    }));
});

function updateTime(seconds) {
    document.querySelector('.stopwatch_screen_output').innerHTML =  `${formatTimeM(minutes)}:${formatTimeS(seconds)}`;
};
function formatTimeM(minutes) {
    if (typeof minutes === 'string') return minutes ;
    if (minutes < 10) return  minutes = `0${(minutes).toString()}`;
}
function formatTimeS(seconds) {
    seconds = seconds.toFixed(2);
    if (seconds < 10) return seconds = `0${seconds}`;
    return seconds;
}


