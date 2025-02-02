// If you want to add any JS functionality, for example, for animations or interactivity, you can add it here
// Example: Handle opening and closing sidebars, etc.

document.querySelector('.sidebar').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        e.target.style.backgroundColor = '#4e37c2';
    }
});