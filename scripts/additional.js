const run = () => {
    const title = document.querySelector('title');

    window.onblur = () => {
        title.innerText = 'Вернитесь 🙁';
    };

    window.onfocus = () => {
        title.innerText = 'Shop';
    };
};

export {run as additional}