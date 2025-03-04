function adjustImageHeight() {
    const imageContent = document.querySelector('.image-content');

    if (window.innerWidth > 900) {
        // Keep aspect ratio by setting height equal to width
        imageContent.style.height = `${imageContent.offsetWidth}px`;
    } else {
        // ✅ Let CSS handle stacking below 900px
        imageContent.style.height = "auto";
    }
}

// Run function on window resize
window.addEventListener("resize", adjustImageHeight);

// Trigger once on page load
window.addEventListener("load", adjustImageHeight);
