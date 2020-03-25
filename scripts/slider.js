const sliderImages = [
    {
        id: 6,
        image: 'fcf5c9764ce8d00d',
    },
    {
        id: 17,
        image: 'f4d45f96c4831a7a',
    },
    {
        id: 18,
        image: '6431e29968fe9062',
    }
];

const createSliderElements = obj => {
    let img = document.createElement('div');
    img.classList.add('slider-img');
    img.style.backgroundImage = `url(img/${obj.image}.jpeg)`;
    img.classList.add('hidden-slider-img');
    img.id = `slider-${obj.id}`;
    return img;
};

const renderSlider = () => {
    document.querySelector('.slider').append(
        ...sliderImages.map(element => createSliderElements(element))
    );
};

const changeSlide = (slides, index) => {
    slides[index.current].classList.remove('hidden-slider-img');
    slides[index.previous].classList.add('hidden-slider-img');
    index.previous = index.current;
    index.current === slides.length - 1 ? index.current = 0 : index.current++;
};

const runSlider = () => {
    const slides = document.querySelectorAll('.slider-img');
    const index = {current: 0, previous: slides.length - 1};
    changeSlide(slides, index);
    setInterval(() => {changeSlide(slides, index)}, 5000);
};

const run = () => {
    renderSlider();
    runSlider();
};

export {run as slider}