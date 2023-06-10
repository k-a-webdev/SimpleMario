const player = document.querySelector('.player');
const damper = document.querySelector('.damper');
const btn = document.querySelector('.start');
btn.innerHTML = 'Start<div class="start_bg"></div>';
const counterBlock = document.querySelector('.counter');
const timerBlock = document.querySelector('.timer');

let isStart = false;
let interval, interval2, timerTimout;
let count = 0, timer = 0;
counterBlock.textContent = 'Score: ' + count;
timerBlock.textContent = 'Time: 00:00';


const activeJump = () => {
    if (isStart) {
        if (!player.classList.contains('active')) {
            player.classList.add('active');
        }

        setTimeout(() => {
            player.classList.remove('active');
        }, 300);
    }
}

const startGame = () => {
    if (isStart) {
        endGame();
    } else {
        isStart = true;

        btn.innerHTML = 'End<div class="start_bg"></div>';
        btn.blur();
        
        damper.classList.add('animate');

        interval = setInterval(() => {
            let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
            let damperLeft = parseInt(window.getComputedStyle(damper).getPropertyValue('left'));

            if (damperLeft < 50 && damperLeft > 0 && playerTop >= 140) {
                endGame();
            }
        }, 10);

        timerTimout = setTimeout(function tick() {
            timerAdd();
            timerTimout = setTimeout(tick, 1000);
        }, 1000);

        interval2 = setInterval(counter, 2000);
    }
    
}

const counter = () => {
    count++;
    counterBlock.textContent = 'Score: ' + count;
}
const timerAdd = () => {
    let time = '00:00';
    timer++;
    if (timer < 60) {
        if (timer <= 9) time = `00:0${timer}`;
        else time = `00:${timer}`;
    }
    else if (Math.floor(timer / 60) <= 9) {
        if (timer % 60 <= 9) time = `0${Math.floor(timer / 60)}:0${timer % 60}`;
        else time = `0${Math.floor(timer / 60)}:${timer % 60}`;
    } else {
        if (timer % 60 <= 9) time = `${Math.floor(timer / 60)}:0${timer % 60}`;
        else time = `${Math.floor(timer / 60)}:${timer % 60}`;
    }

    timerBlock.textContent = 'Time: ' + time;
}

const endGame = () => {
    isStart = false;

    clearInterval(interval);
    clearInterval(interval2);
    clearTimeout(timerTimout);

    timer = 0;
    timerBlock.textContent = 'Time: 00:00';

    damper.classList.remove('animate');
    
    count = 0;
    counterBlock.textContent = 'Score: ' + count;

    btn.innerHTML = 'Start<div class="start_bg"></div>';

    alert('GAME OVER!');
}

document.addEventListener('keydown', activeJump);
document.addEventListener('click', (event) => {
    if (event.target != btn) activeJump()
});

btn.addEventListener('click', () => {
    startGame()
})