// =====================
// PLAYGROUND HORIZONTAL SCROLL
// =====================
var track = document.querySelector("#playground-track");

if (track) {
    var isDown = false;
    var startX = 0;
    var currentX = 0;
    var startXpos = 0;

    function getMaxScroll() {
        return -(track.scrollWidth - window.innerWidth + 40);
    }

    // Mouse press
    track.addEventListener("mousedown", function (e) {
        isDown = true;
        track.style.cursor = "grabbing";
        startX = e.clientX;
        startXpos = currentX;
    });

    // Mouse chhoda
    window.addEventListener("mouseup", function () {
        isDown = false;
        if (track) track.style.cursor = "grab";
    });

    // Drag
    window.addEventListener("mousemove", function (e) {
        if (!isDown) return;
        var diff = e.clientX - startX;
        var newX = startXpos + diff;
        var max = getMaxScroll();
        newX = Math.min(0, Math.max(max, newX));
        currentX = newX;
        gsap.to(track, {
            x: currentX,
            duration: 0.4,
            ease: "power2.out"
        });
    });

    // Mouse wheel — upar neeche scroll left right mein convert
    window.addEventListener("wheel", function (e) {
        if (!document.querySelector("#playground-page")) return;
        e.preventDefault();
        var max = getMaxScroll();
        currentX -= e.deltaY * 2.5;
        currentX = Math.min(0, Math.max(max, currentX));
        gsap.to(track, {
            x: currentX,
            duration: 0.7,
            ease: "power3.out"
        });
    }, { passive: false });
}