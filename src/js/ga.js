/* eslint-disable no-undef */
(($) => {
  $(document).ready(() => {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'UA-89548159-1');
    gtag('send', 'pageview');
  });
})(jQuery);
