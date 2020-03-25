const changeTitle = () => {
    const title = document.querySelector('title');

    window.onblur = () => {
        title.innerText = 'Вернитесь 🙁';
    };

    window.onfocus = () => {
        title.innerText = 'Shop';
    };
};

const run = () => {
    changeTitle();
};

export {run as additional}