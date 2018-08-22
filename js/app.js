(function($) {
	$(document).ready(function() {
		(function(i, s, o, g, r, a, m) {
			i['GoogleAnalyticsObject'] = r;
			(i[r] =
				i[r] ||
				function() {
					(i[r].q = i[r].q || []).push(arguments);
				}),
				(i[r].l = 1 * new Date());
			(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
			a.async = 1;
			a.src = g;
			m.parentNode.insertBefore(a, m);
		})(
			window,
			document,
			'script',
			'https://www.google-analytics.com/analytics.js',
			'ga'
		);

		ga('create', 'UA-89548159-1', 'auto');
		ga('send', 'pageview');

		var changeWidth = function() {
			if ($(window).width() < 480) {
				$('.btn')
					.removeClass('btn-lg')
					.addClass('btn-md');
			} else {
				$('.btn')
					.removeClass('btn-md')
					.addClass('btn-lg');
			}
		};
		changeWidth();
		$(window).resize(changeWidth);
	});
})(jQuery);
