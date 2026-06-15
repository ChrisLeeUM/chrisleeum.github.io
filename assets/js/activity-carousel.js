(function () {
  "use strict";

  function initializeCarousel(carousel) {
    var viewport = carousel.querySelector(".activity-carousel__viewport");
    var slides = carousel.querySelectorAll(".activity-slide");
    var previous = carousel.querySelector(".activity-carousel__button--previous");
    var next = carousel.querySelector(".activity-carousel__button--next");
    var dotsContainer = carousel.querySelector(".activity-carousel__dots");
    var dots = [];
    var currentIndex = 0;
    var scrollTimer;

    function updateControls(index) {
      currentIndex = index;

      dots.forEach(function (dot, dotIndex) {
        dot.classList.toggle("is-active", dotIndex === currentIndex);
        dot.setAttribute("aria-current", dotIndex === currentIndex ? "true" : "false");
      });
    }

    function showSlide(index) {
      var nextIndex = (index + slides.length) % slides.length;
      viewport.scrollTo({
        left: slides[nextIndex].offsetLeft,
        behavior: "smooth"
      });
      updateControls(nextIndex);
    }

    slides.forEach(function (_, index) {
      var dot = document.createElement("button");
      dot.className = "activity-carousel__dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "Show activity " + (index + 1));
      dot.addEventListener("click", function () {
        showSlide(index);
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    previous.addEventListener("click", function () {
      showSlide(currentIndex - 1);
    });

    next.addEventListener("click", function () {
      showSlide(currentIndex + 1);
    });

    viewport.addEventListener("scroll", function () {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(function () {
        var index = Math.round(viewport.scrollLeft / viewport.clientWidth);
        updateControls(Math.max(0, Math.min(index, slides.length - 1)));
      }, 80);
    });

    updateControls(0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var carousels = document.querySelectorAll("[data-activity-carousel]");
    Array.prototype.forEach.call(carousels, initializeCarousel);
  });
}());
