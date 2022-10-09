import './style.css';

function test() {
    const test = document.createElement('h1');
    test.textContent = "Hello, world!";
    test.classList.add('hello');
    return test;
}

document.body.appendChild(test());