// Ensures image-content maintains 1:1 aspect ratio
window.addEventListener('resize', function () {
    const imageContent = document.querySelector('.image-content');
    if (window.innerWidth > 900) {
        imageContent.style.height = `${imageContent.offsetWidth}px`;
    } else {
        imageContent.style.height = 'auto';
    }
});

// Trigger resize once on load
window.dispatchEvent(new Event('resize'));
