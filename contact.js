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

// FORM ANIMATION
gsap.from("#contact-inner", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    delay: 0.3
});