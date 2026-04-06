const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Mouse Circle
var timeout;
function circleMouseFollower(xscale, yscale) {
    document.querySelector("#minicircle").style.transform =
        `translate(${window.mouseX}px, ${window.mouseY}px) scale(${xscale}, ${yscale})`;
}
function circleSkew() {
    var xscale = 1, yscale = 1, xprev = 0, yprev = 0;
    window.addEventListener("mousemove", function (dets) {
        window.mouseX = dets.clientX;
        window.mouseY = dets.clientY;
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);
        xprev = dets.clientX;
        yprev = dets.clientY;
        circleMouseFollower(xscale, yscale);
        timeout = setTimeout(function () {
            document.querySelector("#minicircle").style.transform =
                `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        }, 100);
    });
}
circleSkew();

// Menu
var menuBtn = document.querySelector("#menu-btn");
var closeBtn = document.querySelector("#close-btn");
var navLinks = document.querySelector("#nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.add("active");
    menuBtn.classList.add("hide");
});
closeBtn.addEventListener("click", function () {
    navLinks.classList.remove("active");
    menuBtn.classList.remove("hide");
});

// =====================
// IMAGE HOVER
// work-container (list) ya playground-container dono pe chalega
// =====================
var workContainer = document.querySelector("#work-container");
var playgroundContainer = document.querySelector("#playground-container");

// Jo bhi container page pe maujood hai usko activeContainer banao
var activeContainer = workContainer || playgroundContainer;

// Sirf tab chalao jab:
// 1. Playground page ho — hamesha list style
// 2. Work page ho — sirf list mode mein
var shouldEnableHover = false;

if (playgroundContainer) {
    // Playground pe hamesha hover enable
    shouldEnableHover = true;
} else if (workContainer && workContainer.classList.contains("list")) {
    // Work pe sirf list mode mein
    shouldEnableHover = true;
}

if (shouldEnableHover) {
    document.querySelectorAll(".elem").forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            elem.querySelector("h1").style.opacity = 0.2;
            elem.querySelector("h5").style.opacity = 0.2;
        });
        elem.addEventListener("mouseleave", function () {
            elem.querySelector("h1").style.opacity = 0.7;
            elem.querySelector("h5").style.opacity = 1;
            gsap.to(elem.querySelector("img"), { opacity: 0, duration: 0.5 });
        });
        elem.addEventListener("mousemove", function (dets) {
            var diff = dets.clientY - elem.getBoundingClientRect().top;
            gsap.to(elem.querySelector("img"), {
                opacity: 1,
                top: diff,
                left: dets.clientX,
            });
        });
    });
}
if (workContainer && workContainer.classList.contains("grid")) {
    document.querySelectorAll(".elem").forEach(function (elem) {
        var video = elem.querySelector("video");
        if (!video) return;

        elem.addEventListener("mouseenter", function () {
            video.play();
        });

        elem.addEventListener("mouseleave", function () {
            video.pause();
            video.currentTime = 0;
        });
    });
}