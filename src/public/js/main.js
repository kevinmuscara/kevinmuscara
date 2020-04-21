function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add("animated", animationName);

    function handleAnimationEnd() {
        node.classList.remove("animated", animationName);
        node.removeEventListener("animationend", handleAnimationEnd);

        if (typeof callback === "function") callback();
    }

    node.addEventListener("animationend", handleAnimationEnd);
}

$(document).ready(function() {
    animateCSS(".content", "zoomIn", function() {
        $(".content").removeClass("zoomIn");
    });
    animateCSS(".social", "fadeInDown", function() {
        $(".social").removeClass("fadeInDown");
    });
});
