const sliderImages = [
    {
        image: '4b60cbef8493e46e',
        id: 1
    },
    {
        image: 'c966886a422abdad',
        id: 2
    },
    {
        image: '3c6a58870c01c5fc',
        id: 3
    },
    {
        image: '900fac11da4ba67b',
        id: 4
    },
    {
        image: '8cdf533eeaae47a9',
        id: 5
    },
    {
        image: 'fcf5c9764ce8d00d',
        id: 6
    },
    {
        image: '7014d3f9eeeed0ff',
        id: 7
    },
    {
        image: '812d34caa53146dd',
        id: 8
    },
    {
        image: '2d5d8ab6eea47454',
        id: 9
    },
    {
        image: 'c4b1cf1a2da7eae5',
        id: 10
    },
    {
        image: 'e5ebd9b9ad3bd7ab',
        id: 11
    },
    {
        image: 'f707ac69e217af06',
        id: 12
    },
    {
        image: '327bf3efde1e4bcf',
        id: 13
    },
    {
        image: '8b2b2b7f6ba5d8dd',
        id: 14
    },
    {
        image: '372af953b9b5e7ac',
        id: 15
    },
    {
        image: '94b20d57d1d15453',
        id: 16
    },
    {
        image: 'f4d45f96c4831a7a',
        id: 17
    },
    {
        image: '6431e29968fe9062',
        id: 18
    },
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

function run() {
    renderSlider();
    const slides = document.querySelectorAll('.slider-img');
    const index = {current: 0, previous: slides.length - 1};
    changeSlide(slides, index);
    setInterval(() => {changeSlide(slides, index)}, 5000);
}

export {run as slider}