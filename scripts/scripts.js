"use strict";

const winner = document.getElementById("eT7RBsXFIwV1");
const gorodkiLeft1 = document.getElementById("eFRXbx5mp1l1");
const gorodkiLeft2 = document.getElementById("eLlbpE5cNCh1");
const gorodkiLeft3 = document.getElementById("eb1xD9VCAM71");
const gorodkiRight1 = document.getElementById("e2kGyfrgE5b1");
const gorodkiRight2 = document.getElementById("eWj3J9z5EZI1");
const gorodkiRight3 = document.getElementById("ehOK4zvcwVY1");
const topFormAnimation = document.getElementById("ez6pCIRgsxO1");
const bottomFormAnimation = document.getElementById("ernsSRPiYQf1");

AOS.init();

const upButton = $(".up-button"),
  header = $("#header"),
  navbar = $("#navbar"),
  rules = $(".rule-text"),
  modal = $("#modalInfo"),
  slider = $(".facts-slider");

function mobileOnlySlider() {
  slider.slick({
    infinite: false,
    dots: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.15,
          slidesToScroll: 1,
        }
      }
    ]
  });
}

const tabletWidth = 1024;
let isSmallDevice = $(window).width() < tabletWidth;

isSmallDevice && mobileOnlySlider();

let lastId,
  navbarHeight = navbar.outerHeight() + 15,
  menuItems = navbar.find("a"),
  scrollItems = menuItems.map(function () {
    let item = $("#" + $(this).attr("data-attr-scroll"));
    if (item.length) {
      return item;
    }
  });

$(".show-rule").click(function () {
  let rule = $("#" + $(this).attr("data-rule"));
  rule.fadeIn(300);
});

let counterClick = 0,
  currentAnimationLeft = gorodkiLeft1,
  currentAnimationRight = gorodkiRight1;

$("#switch").click(function () {
  switch (counterClick) {
    case 1:
      $(".svg").hide();
      currentAnimationLeft = gorodkiLeft2;
      currentAnimationRight = gorodkiRight2;
      break;
    case 2:
      $(".svg").hide();
      currentAnimationLeft = gorodkiLeft3;
      currentAnimationRight = gorodkiRight3;
      break;
    default:
      $(".svg").hide();
      currentAnimationLeft = gorodkiLeft1;
      currentAnimationRight = gorodkiRight1;
  }
  currentAnimationLeft.style.display = "block";
  currentAnimationRight.style.display = "block";
  currentAnimationLeft.svgatorPlayer.ready(function () {
    this.play();
  });
  currentAnimationRight.svgatorPlayer.ready(function () {
    this.play();
  });
  counterClick = (counterClick + 1) % 3;
});

$("#info").click(function () {
  modal.fadeIn(300);
});

$("#closeModal").click(function () {
  modal.fadeOut(300);
});

$(".form").each(function () {
  $(this).submit(function (e) {
    e.preventDefault();
    if ($(this).find('input[type="email"]').val() === "") {
      return false;
    }
    $(this).addClass("submitted");
    $(this).find('button[type="submit"]').text("Подписка оформлена");
    $(this).find("input").val("").prop("disabled", true);

    if ($(this).hasClass("form-small")) {
      $(this)
        .siblings(".show-form")
        .fadeIn()
        .text("Подписка оформлена")
        .addClass("success");
      $(this).siblings(".form-decoration").fadeIn();
      $(this).hide();
    }

    if ($(this).parent().hasClass("intro")) {
      topFormAnimation.svgatorPlayer.ready(function () {
        this.play();
      });
    } else {
      bottomFormAnimation.svgatorPlayer.ready(function () {
        this.play();
      });
    }

    var thisForm = $(this);
    setInterval(function () {
      if (thisForm.parent().hasClass("intro")) {
        topFormAnimation.classList.add('playByClick');
      } else {
        bottomFormAnimation.classList.add('playByClick');
      }
    }, 1000);
  });
});

topFormAnimation.addEventListener('click', function () {
  if ($(this).hasClass('playByClick')) {
    topFormAnimation.svgatorPlayer.ready(function () {
      this.play();
    });
  }
});

bottomFormAnimation.addEventListener('click', function () {
  if ($(this).hasClass('playByClick')) {
    bottomFormAnimation.svgatorPlayer.ready(function () {
      this.play();
    });
  }
});

$(".show-form").click(function () {
  $(this).hide();
  $(this).siblings(".form-decoration").hide();
  $(this).siblings(".form-small").fadeIn(300);
});

$("#toggleMenu").click(function () {
  header.toggleClass("menu-opened");
  if (header.hasClass("menu-opened")) {
    $(".logo").hide();
    navbar.fadeIn(300);
  } else {
    navbar.hide();
    $(".logo").fadeIn(300);
  }
});

$(window).resize(function () {
  isSmallDevice = $(window).width() < tabletWidth;
  if (isSmallDevice) {
    navbar.hide();
    $(".rule-text").hide();
    $(".logo, .show-form, .form-decoration").show();
    if (!slider.hasClass('slick-initialized')){
      mobileOnlySlider();
    }
  } else {
    $(".logo, #navbar, .form-decoration, .rule-text:not(.hidden)").show();
      if (slider.hasClass('slick-initialized')) {
        slider.slick('unslick');
      }
  }

  $(".form-small").hide();
  winner.svgatorPlayer.ready(function () {
    this.stop();
  });
});

$(document).mouseup(function (e) {
  if (!modal.is(e.target) && modal.has(e.target).length === 0) {
    modal.fadeOut(300);
  }

  if (!rules.is(e.target) &&
    rules.has(e.target).length === 0 &&
    isSmallDevice) {
    rules.fadeOut(300);
  }
});

$(window).scroll(function () {
  let fromTop = $(this).scrollTop() + navbarHeight;
  let cur = scrollItems.map(function () {
    if ($(this).offset().top - 30 < fromTop) return this;
  });

  cur = cur[cur.length - 1];
  let id = cur && cur.length ? cur[0].id : "";
  let topOffset =
    $(document).height() - $("#stay-in-touch").height() - $("footer").height();

  if ($(this).scrollTop() + $(this).height() > topOffset) {
    id = "stay-in-touch";
  }

  if (lastId !== id) {
    lastId = id;
    menuItems
      .parent()
      .removeClass("current")
      .end()
      .filter("[data-attr-scroll='" + id + "']")
      .parent()
      .addClass("current");
  }
});

$.fn.isInViewport = function () {
  let elementTop = $(this).offset().top;
  let elementBottom = elementTop + $(this).outerHeight();
  let viewportTop = $(window).scrollTop();
  let viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

let isAnimates = false;

$(window).scroll(function () {
  if (isSmallDevice && !isAnimates && $("#eT7RBsXFIwV1").isInViewport()) {
    winner.svgatorPlayer.ready(function () {
      this.set("iterations", 0).set("alternate", true);
      this.play();
    });
    isAnimates = true;
  }

  if (isSmallDevice && isAnimates && !$("#eT7RBsXFIwV1").isInViewport()) {
    winner.svgatorPlayer.ready(function () {
      this.stop();
    });
    isAnimates = false;
  }
});

menuItems.click(function (e) {
  let href = $(this).attr("data-attr-scroll"),
    offsetTop =
      href === "#" ? 0 : $("#" + href).offset().top - navbarHeight + 1;
  $("html, body")
    .stop()
    .animate({ scrollTop: offsetTop - 30 }, 1000);
  e.preventDefault();
});

$(window).scroll(function () {
  if ($(this).scrollTop()) {
    upButton.fadeIn();
    upButton
      .find(".text")
      .css("transform", "rotate(" + $(window).scrollTop() / 400 + "rad)");
  } else {
    upButton.fadeOut();
  }
});

$(document).ready(function () {
  upButton.click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });
});

$(".rule-8")
  .mouseenter(function (e) {
    winner.svgatorPlayer.ready(function () {
      this.play();
    });
  })
  .mouseleave(function (e) {
    winner.svgatorPlayer.ready(function () {
      this.reverse();
    });
  });
