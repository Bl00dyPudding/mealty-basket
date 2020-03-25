const switchTheme = (time = null) => {
    if (time !== null) {
        if (time === 'night') {
            document.querySelector('#app').classList.add('night-theme');
        }
    } else {
        document.querySelector('#app').classList.toggle('night-theme');
    }
};

const buttonTheme = () => {
    document.querySelector('.theme').onclick = switchTheme;
};

const getTime = () => {
    let date = new Date();
    let time;
    if ((0 < date.getHours() && date.getHours() <= 7) || (18 <= date.getHours() && date.getHours() <= 23)) {
        time = 'night';
    } else {
        time = 'day';
    }
    switchTheme(time);
};

export {getTime as theme}