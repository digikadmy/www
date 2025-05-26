// Load gtag script
(function() {
  var script = document.createElement('script');
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-8Y9YZV1LXF";
  document.head.appendChild(script);
})();

// Setup gtag
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-8Y9YZV1LXF');
