import LegacyContent from "@/components/LegacyContent";

const PARTICLES_CONFIG = `{ "particles": { "number": { "value": 100, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 }, "image": { "src": "/assets/img/github.svg", "width": 100, "height": 100 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true }`;

/**
 * Shared chrome for the static marketing sub-pages (about, faqs, terms,
 * contact, get-started, affiliate): banner + breadcrumb + body, with the
 * back-to-top button and particles.js background wired up.
 */
export default function InfoPage({
  titleHtml,
  crumbHtml,
  bodyHtml,
  bannerContainer = "bodycontainer2",
}: {
  titleHtml: string;
  crumbHtml: string;
  bodyHtml: string;
  bannerContainer?: string;
}) {
  const html = `
    <div class="banner-area center">
      <div class="area">
        <div class="${bannerContainer}">
          <h1 class="tlt text-white" style="margin: 20px 0;">${titleHtml}</h1>
          <div class="banner-title"><span class="decor-equal"></span></div>
          <div style="margin: 20px 0;">${crumbHtml}</div>
        </div>
        <div id="particles-js"></div>
      </div>
    </div>
    ${bodyHtml}
    <a href="#" id="back-to-top" class="back-to-top fa fa-arrow-up show-back-to-top"></a>
    <script>
    $(window).on('scroll', function() {
        var ScrollTop = $('#back-to-top');
        if ($(window).scrollTop() > 500) { ScrollTop.fadeIn(1000); } else { ScrollTop.fadeOut(1000); }
    });
    </script>
    <script src="/assets/js/particle.js"></script>
    <script>
    if (typeof particlesJS === "function") { particlesJS("particles-js", ${PARTICLES_CONFIG}); }
    </script>
`;
  return <LegacyContent html={html} />;
}
