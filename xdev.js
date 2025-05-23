let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slide = document.querySelector('.slide');

function updateVisualStates() {
    let items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next');

        if (index === 1) item.classList.add('active');
        else if (index === 0) item.classList.add('prev');
        else if (index === 2) item.classList.add('next');
    });
}

next.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    slide.appendChild(items[0]);
    updateVisualStates();
});

prev.addEventListener('click', function () {
    let items = document.querySelectorAll('.item');
    slide.prepend(items[items.length - 1]);
    updateVisualStates();
});
updateVisualStates();
