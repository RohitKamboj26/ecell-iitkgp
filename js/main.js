(function ($) {

	"use strict";

	var spinner = function () {
		setTimeout(function () {
			if ($('#unslate_co--overlayer').length > 0) {
				$('#unslate_co--overlayer').fadeOut('slow', function () {
					$(this).remove();
				});
			}
			if ($('.site-loader-wrap').length > 0) {
				$('.site-loader-wrap').fadeOut('slow', function () {
					$(this).remove();
				});
			}
		}, 1000);
	};
	spinner();


	var initAOS = function () {
		AOS.init({
			duration: 800,
			easing: 'ease',
			once: true,
			offset: -50
		});
	};
	initAOS();

	var initOwlCarousel = function () {
		$('.testimonial-slider').owlCarousel({
			center: true,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			smartSpeed: 1000,
			autoplay: true,
			dots: true,
			nav: true,
			navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">']
		});
	};
	initOwlCarousel();

	// Mobile Menu
	var siteMenuClone = function () {
		$('.js-clone-nav').each(function () {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-inner');
		});

		setTimeout(function () {
			var counter = 0;
			$('.site-mobile-inner .has-children').each(function () {
				var $this = $(this);

				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find('.arrow-collapse').attr({
					'data-toggle': 'collapse',
					'data-target': '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class': 'collapse',
					'id': 'collapseItem' + counter,
				});

				counter++;
			});
		}, 1000);

		$('body').on('click', '.arrow-collapse', function (e) {
			var $this = $(this);
			if ($this.closest('li').find('.collapse').hasClass('show')) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();

		});

		$(window).resize(function () {
			var $this = $(this),
				w = $this.width();

			if (w > 768) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($('body').hasClass('offcanvas-menu')) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function (e) {
			var container = $(".site-mobile-inner");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});
	};
	siteMenuClone();

	// Smooth scroll for links
	$('a[href^="#"]').on('click', function (event) {
		var target = $(this.getAttribute('href'));
		if (target.length) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top
			}, 1000);

			// Close mobile menu if open
			if ($('body').hasClass('offcanvas-menu')) {
				$('body').removeClass('offcanvas-menu');
				$('.js-menu-toggle').removeClass('active');
			}
		}
	});

})(jQuery);
