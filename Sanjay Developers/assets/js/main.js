(function ($) {
  "use strict";

  var $window = $(window),
    $body = $("body");

  /*----------------------------------
# header sticky 
-----------------------------------*/

  var activeSticky = $("#sticky-header"),
    $winDow = $($window);
  $winDow.on("scroll", function () {
    var scroll = $($window).scrollTop(),
      isSticky = activeSticky;

    if (scroll < 1) {
      isSticky.removeClass("is-sticky");
    } else {
      isSticky.addClass("is-sticky");
    }
  });

  //  Off Canvas toggler Function
  var $offCanvasToggle = $(".offcanvas-toggle"),
    $offCanvas = $(".offcanvas"),
    $offCanvasOverlay = $(".offcanvas-overlay"),
    $mobileMenuToggle = $(".mobile-menu-toggle");
  $offCanvasToggle.on("click", function (e) {
    e.preventDefault();
    var $this = $(this),
      $target = $this.attr("href");
    $body.addClass("offcanvas-open");
    $($target).addClass("offcanvas-open");
    $offCanvasOverlay.fadeIn();

    if ($this.parent().hasClass("mobile-menu-toggle")) {
      $this.addClass("close");
    }
  });
  $(".offcanvas-close, .offcanvas-overlay").on("click", function (e) {
    e.preventDefault();
    $body.removeClass("offcanvas-open");
    $offCanvas.removeClass("offcanvas-open");
    $offCanvasOverlay.fadeOut();
    $mobileMenuToggle.find("a").removeClass("close");
  });

  // Off Canvas Menu
  function mobileOffCanvasMenu() {
    var $offCanvasNav = $(".offcanvas-menu, .overlay-menu"),
      $offCanvasNavSubMenu = $offCanvasNav.find(".offcanvas-submenu");
    /*Add Toggle Button With Off Canvas Sub Menu*/

    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"></span>');
    /*Category Sub Menu Toggle*/

    $offCanvasNav.on("click", "li a, .menu-expand", function (e) {
      var $this = $(this);

      if ($this.attr("href") === "#" || $this.hasClass("menu-expand")) {
        e.preventDefault();

        if ($this.siblings("ul:visible").length) {
          $this.parent("li").removeClass("active");
          $this.siblings("ul").slideUp();
          $this.parent("li").find("li").removeClass("active");
          $this.parent("li").find("ul:visible").slideUp();
        } else {
          $this.parent("li").addClass("active");
          $this
            .closest("li")
            .siblings("li")
            .removeClass("active")
            .find("li")
            .removeClass("active");
          $this.closest("li").siblings("li").find("ul:visible").slideUp();
          $this.siblings("ul").slideDown();
        }
      }
    });
  }

  mobileOffCanvasMenu();

  $.fn.elExists = function () {
    return this.length > 0;
  };

  if ($(".nice-select").elExists()) {
    $(".nice-select").selectric();
  }

  /*-----------------------------------
  # hero-slider
  ------------------------------ */

  var heroSlider = new Swiper(".hero-slider .swiper-container", {
    loop: true,
    speed: 600,
    autoplay: true,
    lazy: true,
    spaceBetween: 0,
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".hero-slider .swiper-pagination",
      clickable: true,
    },
    navigation: false,
  });

  // Initialize hero slider 2 only if the element exists
  if ($(".hero-slider2 .swiper").length) {
    var heroSlider2 = new Swiper(".hero-slider2 .swiper", {
      loop: true,
      speed: 600,
      autoplay: true,
      lazy: true,
      spaceBetween: 0,
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      navigation: false,
    });
  }

  /*-----------------------------------
  # cities slider
  ------------------------------ */

  // Initialize cities slider only if the element exists
  if ($(".cities-slider .swiper").length) {
    var citiesSlider = new Swiper(".cities-slider .swiper", {
      loop: true,
      speed: 600,
      lazy: true,
      watchSlidesProgress: true,
      spaceBetween: 30,
      pagination: {
        el: ".cities-slider .swiper-pagination",
        clickable: true,
      },
      navigation: false,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
      },
    });
  }

  /*-----------------------------------
  # Properties slider
  ------------------------------ */

  // Initialize properties slider only if the element exists
  if ($(".properties-slider .swiper").length) {
    var propertiesSlider = new Swiper(".properties-slider .swiper", {
      loop: true,
      speed: 600,
      lazy: true,
      watchSlidesProgress: true,
      spaceBetween: 30,
      speed: 1000,
      autoplay: {
        delay: 2000,
      },
      pagination: {
        el: ".properties-slider .swiper-pagination",
        clickable: true,
      },
      navigation: false,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },
    });
  }

  /*-----------------------------------
  # brand slider
  ------------------------------ */

  // Initialize brand slider only if the element exists
  if ($(".brand-slider .swiper").length) {
    var BrandCarousel = new Swiper(".brand-slider .swiper", {
      loop: false,
      speed: 600,
      lazy: true,
      watchSlidesProgress: true,
      spaceBetween: 30,
      pagination: false,
      navigation: false,
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        576: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
        992: {
          slidesPerView: 5,
        },
      },
    });
  }

  /*-----------------------------------
  # testimonial carousel
  ------------------------------ */

  // Initialize testimonial carousel only if the element exists
  if ($(".testimonial-carousel-one .swiper").length) {
    var testimonialCarousel = new Swiper(".testimonial-carousel-one .swiper", {
      loop: true,
      watchSlidesProgress: true,
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 1000,
      autoplay: {
        delay: 5000,
      },
      lazy: true,
      pagination: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 1,
        },
      },
    });
  }

  /*-----------------------------------
  # testimonial carousel 2
  ------------------------------ */

  // Initialize testimonial carousel 2 only if the element exists
  if ($(".testimonial-carousel-two .swiper").length) {
    var testimonialCarousel2 = new Swiper(".testimonial-carousel-two .swiper", {
      loop: true,
      watchSlidesProgress: true,
      slidesPerView: 1,
      spaceBetween: 30,
      speed: 1000,
      autoplay: {
        delay: 5000,
      },
      lazy: true,
      pagination: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 1,
        },
      },
    });
  }

  /*-----------------------------------
  # Interior carousel
  ------------------------------ */

  // Initialize interior carousel only if the element exists
  if ($(".interior-carousel .swiper").length) {
    var Interior = new Swiper(".interior-carousel .swiper", {
      slidesPerView: "auto",
      slidesPerGroup: 3,
      spaceBetween: 25,
      speed: 1000,
      autoplay: {
        delay: 5000,
      },
      lazy: true,
      pagination: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  /*-----------------------------------
  # latest properties slider
  ------------------------------ */

  // Initialize latest properties slider only if the element exists
  if ($(".latest-prorperties-slider .swiper").length) {
    var latestProrpertiesSlider = new Swiper(
      ".latest-prorperties-slider .swiper",
      {
        loop: true,
        spaceBetween: 6,
        speed: 600,
        autoplay: {
          delay: 5000,
        },
        lazy: true,
        fadeEffect: {
          crossFade: true,
        },
        pagination: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
          1500: {
            slidesPerView: 4,
          },
          1920: {
            slidesPerView: 5,
          },
        },
      }
    );
  }

  /*-----------------------------------
  # sidebar carousel
  ------------------------------ */

  // Initialize sidebar carousel only if the element exists
  if ($(".sidebar-carousel .swiper").length) {
    var sidebarCarousel = new Swiper(".sidebar-carousel .swiper", {
      loop: true,
      spaceBetween: 20,
      slidesPerView: 1,
      speed: 600,
      autoplay: {
        delay: 5000,
      },
      lazy: true,
      fadeEffect: {
        crossFade: true,
      },
      pagination: false,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  // search tab
  function searchTab() {
    $(".search-tab li").on("click", function () {
      var tab_id = $(this).attr("data-tab");
      $(".search-tab li").removeClass("active");
      $(".tab-content").removeClass("active");
      $(this).addClass("active");
      $("#" + tab_id).addClass("active");
    });
  }

  searchTab();

  function PropertiesTab() {
    $(".all-properties li").on("click", function () {
      var tab_id = $(this).attr("data-tab");
      $(".all-properties li").removeClass("active");
      $(".properties-tab-content").removeClass("active");
      $(this).addClass("active");
      $("#" + tab_id).addClass("active");
    });
  }

  PropertiesTab();

  function GridTab() {
    $(".grid-tab-menu li").on("click", function () {
      var tab_id = $(this).attr("data-grid");
      $(".grid-tab-menu li").removeClass("active");
      $(".grid-tab-content").removeClass("active");
      $(this).addClass("active");
      $("#" + tab_id).addClass("active");
    });
  }

  GridTab();

  function PropertiesTabTwo() {
    $(".all-properties li").on("click", function () {
      var tab_id = $(this).attr("data-tab");
      $(".all-properties li").removeClass("active");
      $(".properties-tab-content").removeClass("active");
      $(this).addClass("active");
      $("." + tab_id).addClass("active");
    });
  }

  PropertiesTabTwo();

  function GridTabTwo() {
    $(".grid-tab-menu li").on("click", function () {
      var tab_id = $(this).attr("data-grid");
      $(".grid-tab-menu li").removeClass("active");
      $(".grid-tab-content").removeClass("active");
      $(this).addClass("active");
      $("." + tab_id).addClass("active");
    });
  }

  GridTabTwo();

  function myFunction(x) {
    if (x.matches) {
      // If media query matches
      var scene = document.querySelectorAll(".scene");
      if (scene.length > 0 && typeof Parallax !== "undefined") {
        scene.forEach((el) => {
          var parallaxInstance = new Parallax(el);
        });
      }
    }
  }

  var x = window.matchMedia("(min-width: 992px)");
  myFunction(x); // Call listener function at run time
  x.addListener(myFunction); // Attach listener function on state changes

  // Initialize magnific popup only if the element exists
  if ($(".play-button").length && $.fn.magnificPopup) {
    $(".play-button").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: true,
      fixedContentPos: true,
    });
  }

  // Initialize gallery only if the element exists
  if ($(".gallery-image").length && $.fn.magnificPopup) {
    $(".gallery-image").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
      },
    });
  }

  // Fix for tab toggle button
  $(document).ready(function () {
    // Safely handle tab toggle button click
    var tabToggleButtons = document.querySelectorAll(".tab-toggle-btn");
    if (tabToggleButtons.length > 0) {
      tabToggleButtons.forEach(function (element) {
        element.addEventListener("click", function () {
          var searchButtons = document.querySelectorAll(".search-btn");
          if (searchButtons.length > 0) {
            searchButtons.forEach(function (btn) {
              btn.classList.toggle("active");
              if (btn.classList.contains("active")) {
                btn.style.display = "none";
              } else {
                btn.style.display = "block";
              }
            });
          }

          element.classList.toggle("active");

          var advancedSearchHidden = document.querySelectorAll(
            ".advanced-searrch-hidden"
          );
          if (advancedSearchHidden.length > 0) {
            advancedSearchHidden.forEach(function (el) {
              if (el.style.maxHeight) {
                el.style.maxHeight = null;
                el.classList.remove("active");
              } else {
                el.style.maxHeight = el.scrollHeight + "px";

                setTimeout(function () {
                  el.classList.add("active");
                }, 200);
              }
            });
          }
        });
      });
    }
  });

  /*---------------------------------
    MailChimp
  -----------------------------------*/
  // if ($("#mc-form").length && $.fn.ajaxChimp) {
  //   $("#mc-form").ajaxChimp({
  //     language: "en",
  //     callback: mailChimpResponse,
  //     // ADD YOUR MAILCHIMP URL BELOW HERE!
  //     url: "http://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef",
  //   });
  //   function mailChimpResponse(resp) {
  //     if (resp.result === "success") {
  //       $(".mailchimp-success")
  //         .html("" + resp.msg)
  //         .fadeIn(900);
  //       $(".mailchimp-error").fadeOut(400);
  //     } else if (resp.result === "error") {
  //       $(".mailchimp-error")
  //         .html("" + resp.msg)
  //         .fadeIn(900);
  //     }
  //   }
  // }

  /*---------------------------------
    Scroll Up
  -----------------------------------*/
  function scrollToTop() {
    var $scrollUp = $("#scrollUp");
    if ($scrollUp.length) {
      var $lastScrollTop = 0;

      $window.on("scroll", function () {
        var st = $(this).scrollTop();
        if (st > $lastScrollTop || st > 0) {
          // User is scrolling down or is not at the top, show the button
          $scrollUp.css({ bottom: "60px" });
        }
        if (st === 0) {
          // User is at the top of the page, hide the button
          $scrollUp.css({ bottom: "-60px" });
        }
        $lastScrollTop = st;
      });

      $scrollUp.on("click", function (evt) {
        $("html, body").animate({ scrollTop: 0 }, 600);
        evt.preventDefault();
      });
    }
  }
  scrollToTop();

  // Advanced search toggle - only if elements exist
  $(".search-tab button").on("click", function () {
    var tabToggleBtn = $(".tab-toggle-btn");
    if (tabToggleBtn.length) {
      tabToggleBtn.toggleClass("active");

      var advancedSearchHidden = $(".advanced-searrch-hidden");
      if (advancedSearchHidden.length) {
        advancedSearchHidden.each(function () {
          var el = $(this)[0];
          if (el.style.maxHeight) {
            el.style.maxHeight = null;
            $(el).removeClass("active");
          } else {
            el.style.maxHeight = el.scrollHeight + "px";
            $(el).addClass("active");
          }
        });
      }
    }
  });

  /*---------------------------------
    Popup
  -----------------------------------*/
  $(document).ready(function () {
    // Only run popup code if elements exist
    var popup = $("#popup");
    var closePopupButton = $("#closePopup");
    var acceptTermsCheckbox = $("#acceptTerms");

    if (popup.length && closePopupButton.length) {
      // Show popup and lock scrolling
      setTimeout(function () {
        popup.addClass("show");
        $body.addClass("lock-scroll");
      }, 3000); // Delay of 3000ms to show the popup

      // Enable or disable the "I Agree" button based on checkbox state
      if (acceptTermsCheckbox.length) {
        acceptTermsCheckbox.on("change", function () {
          if (this.checked) {
            closePopupButton.prop("disabled", false);
          } else {
            closePopupButton.prop("disabled", true);
          }
        });
      }

      // Close popup and unlock scrolling
      closePopupButton.on("click", function () {
        popup.removeClass("show");
        $body.removeClass("lock-scroll");
      });
    }
  });

  // Counter
  $(document).ready(function () {
    var counters = $(".count");
    if (counters.length) {
      var observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };

      var handleIntersect = function (entries, observer) {
        entries.forEach(function (entry) {
          var counter = entry.target;
          var target = Number($(counter).attr("data-target"));

          if (entry.isIntersecting) {
            var count = Number($(counter).text());

            var updateCount = function () {
              var inc = target / 100;
              if (count < target) {
                count += inc;
                $(counter).text(Math.floor(count));
                setTimeout(updateCount, 15);
              } else {
                $(counter).text(target);
              }
            };

            updateCount();
          } else {
            $(counter).text("0");
          }
        });
      };

      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(
          handleIntersect,
          observerOptions
        );
        counters.each(function () {
          observer.observe(this);
        });
      }
    }
  });

  // Cloudinary form handling
  $(document).ready(function () {
    // File input preview functionality
    const fileInput = $('input[type="file"]');
    if (fileInput.length) {
      fileInput.on("change", function () {
        const fileName = this.files[0]
          ? this.files[0].name
          : "No file selected";
        const fileSize = this.files[0] ? this.files[0].size : 0;
        const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);

        // Display file info
        const fileInfoElement = $("<p></p>")
          .text(`Selected: ${fileName} (${fileSizeMB} MB)`)
          .addClass("text-xs mt-1 text-gray-700 file-info");

        // Remove previous info if exists
        $(this).parent().find(".file-info").remove();
        $(this).parent().append(fileInfoElement);
      });
    }

    // Handle form submission status
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");

    if (status === "success") {
      showNotification(
        "Application submitted successfully. We will contact you soon.",
        "success"
      );
    } else if (status === "error") {
      showNotification(
        "There was an error submitting your application. Please try again.",
        "error"
      );
    }

    function showNotification(message, type) {
      const notification = $("<div></div>")
        .addClass(
          type === "success"
            ? "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-md z-50"
            : "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-md z-50"
        )
        .text(message);

      $("body").append(notification);

      // Remove notification after 5 seconds
      setTimeout(function () {
        notification.remove();
      }, 5000);
    }
  });
})(jQuery);
