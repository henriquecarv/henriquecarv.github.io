/* eslint-disable no-undef */
(($) => {
  $(document).ready(() => {
    const changeWidth = () => {
      const urlProfilePicture = 'https://www.gravatar.com/avatar/45dc36c036a3034db00361897cd500f0.jpg?s=';
      if ($(window).width() < 480) {
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
