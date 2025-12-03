function autoFitText(textElement, maxHeight, maxFontSize = 100) {
    let fontSize = parseFloat(window.getComputedStyle(textElement).fontSize);

    // Shrink if too tall
    while (textElement.scrollHeight > maxHeight && fontSize > 5) {
        fontSize -= 1;
        textElement.style.fontSize = fontSize + "px";
    }

    // Enlarge if too small
    while (textElement.scrollHeight < maxHeight && fontSize < maxFontSize) {
        fontSize += 1;
        textElement.style.fontSize = fontSize + "px";

        // stop if it overflows
        if (textElement.scrollHeight > maxHeight) {
            fontSize -= 1;
            textElement.style.fontSize = fontSize + "px";
            break;
        }
    }
}

function adjustParchmentText() {
    document.querySelectorAll(".popup-parchment").forEach(parchment => {

        const textElement = parchment.querySelector(".parchment-text");
        const img = parchment.querySelector("img");

        if (!textElement || !img) return;

        const maxHeight = img.clientHeight - 20;

        autoFitText(textElement, maxHeight, 60); 
    });
}

// Run AFTER transition completes (popup slides down)
document.addEventListener("transitionend", event => {
    if (event.target.classList.contains("popup-parchment")) {
        adjustParchmentText();
    }
});
