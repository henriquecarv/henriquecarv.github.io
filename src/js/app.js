/* eslint-disable no-undef */
(($) => {
  $(document).ready(() => {
    const isMobile = $(window).width() < 480;
    const urlProfilePicture = 'https://www.gravatar.com/avatar/45dc36c036a3034db00361897cd500f0.jpg?s=';

    const changeWidth = () => {
      if (isMobile) {
        $('.btn')
          .removeClass('btn-lg')
          .addClass('btn-md');
        $('.img-fluid').attr('src', `${urlProfilePicture}130`);
      } else {
        $('.btn')
          .removeClass('btn-md')
          .addClass('btn-lg');
        $('.img-fluid').attr('src', `${urlProfilePicture}170`);
      }
    };

    changeWidth();
    $(window).resize(changeWidth);
  });
})(jQuery);
