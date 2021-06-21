let startPoint = 0;
document.querySelector('.stopwatch_control_start').addEventListener('click', () => {
    let start = setTimeout(function go() {
        startPoint += 0.01;
        updateTime(startPoint);
        start = setTimeout(go, 10);
    },10);
    document.querySelector('.stopwatch_control_stop').addEventListener('click', () => {
        clearTimeout(start);
    });  
});
document.querySelector('.stopwatch_control_reset').addEventListener('click', () => {
    startPoint = 0;
    updateTime(0);
    document.querySelector('.stopwatch_laps').innerHTML = '';
});
document.querySelector('.stopwatch_control_lap').addEventListener('click', () => {
    createLap(startPoint);
});
function updateTime(time) {
    document.querySelector('.stopwatch_screen_output').innerHTML = time.toFixed(2);
};
function createLap(time) {
    let li = document.createElement('li');
    li.innerHTML = time.toFixed(2);
    document.querySelector('.stopwatch_laps').append(li);
};



