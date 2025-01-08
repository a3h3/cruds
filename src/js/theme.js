'use strict';

const toggleTheme = function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

const storedTheme = localStorage.getItem('theme');
const initialTheme = storedTheme || 'light';
document.documentElement.setAttribute('data-theme', initialTheme);

// Add an event listener to the 'DOMContentLoaded' event
window.addEventListener('DOMContentLoaded', () => {
    // Retrieve the theme button element using the '[data-theme-btn]' selector
    const $themeBtn = document.querySelector('[data-theme-btn]');
    // If the theme button element exists, add a click event listener to it
    // When the theme button is clicked, call the toggleTheme function
    if ($themeBtn) $themeBtn.addEventListener('click', toggleTheme);
});
