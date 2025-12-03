const sections = document.querySelectorAll(".section");
const container = document.getElementById("scroll-container");
let currentIndex = 0;


function setActiveSlide(index) {
    currentIndex = index;

    container.scrollTo({
        left: index * window.innerWidth,
        behavior: "smooth"
    });

    sections.forEach((sec, i) => sec.classList.toggle("active", i === index));

    popupStage = 0;
    hideAllPopups();
}

function hideAllPopups() {
    document.querySelectorAll(".popup-parchment").forEach(p => {
        p.classList.remove("active-popup");
    });
}

// Show popup(s) inside the current section
function showPopup() {
    const sec = sections[currentIndex];
    const popup = sec.querySelector(".popup-parchment");
    if (popup) popup.classList.add("active-popup");
}


document.addEventListener("DOMContentLoaded", () => setActiveSlide(0));

// Arrow buttons
document.getElementById("rightBtn").onclick = () => {
    if (currentIndex < sections.length - 1) setActiveSlide(currentIndex + 1);
};
document.getElementById("leftBtn").onclick = () => {
    if (currentIndex > 0) setActiveSlide(currentIndex - 1);
};

// Adjust scroll on resize
window.addEventListener("resize", () => {
    container.scrollTo({ left: currentIndex * window.innerWidth });
});

document.getElementById("showBtn").onclick = () => {
    showPopup();

    const popup = sections[currentIndex].querySelector(".popup-left");
    popup.classList.add("active-popup");
    adjustParchmentText()

};

document.getElementById("hideBtn").onclick = () => {
    hideAllPopups();

};

document.addEventListener("keydown", (event) => {
    switch(event.key) {
        case "ArrowRight": // go to next section
            if (currentIndex < sections.length - 1) setActiveSlide(currentIndex + 1);
            break;
        case "ArrowLeft": // go to previous section
            if (currentIndex > 0) setActiveSlide(currentIndex - 1);
            break;
        case "ArrowUp": // show popup
            showPopup();
            const popup = sections[currentIndex].querySelector(".popup-left");
            if (popup) {
                popup.classList.add("active-popup");
                adjustParchmentText();
            }
            break;
        case "ArrowDown": // hide popup
            hideAllPopups();
            break;
    }
});

