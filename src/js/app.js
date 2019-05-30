/* eslint-disable no-undef */
(($) => {
  $(document).ready(() => {
    const isMobile = $(window).width() < 480;
    const urlProfilePicture = '/img/profile';

    const changeWidth = () => {
      if (isMobile) {
        $('.btn')
          .removeClass('btn-lg')
          .addClass('btn-md');
        $('.img-fluid').attr('src', `${urlProfilePicture}_130.jpeg`);
      } else {
        $('.btn')
          .removeClass('btn-md')
          .addClass('btn-lg');
        $('.img-fluid').attr('src', `${urlProfilePicture}_170.jpeg`);
      }
    };

    changeWidth();
    $(window).resize(changeWidth);
  });
})(jQuery);
