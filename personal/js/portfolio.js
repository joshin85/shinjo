$(document).ready(function() {
    var headerOffset = parseInt($(".stripe").offset().top);
/* Change position of title to fixed based on scroll */
    $(window).scroll(function() {
        if ($(".stripe").offset().top - $(window).scrollTop() < 0 && !$(".header-style").is(".header-fixed")) {
            $(".header-style").addClass("header-fixed");
			$(".header").addClass("header-down");
        } else if ($(window).scrollTop() < headerOffset) {
            $(".header-style").removeClass("header-fixed");
			$(".header").removeClass("header-down");
        }
    });
/* Onclick open Side Menu */
    $('.navbar-toggle').click(function() {
        slideMenu();
    });
/* Style clicked side item */
    $('.side-item-style > a').click(function() {
        $('.side-item-style > a').removeClass('notice-lg');
        $(this).toggleClass('notice-lg');
    });
/* Close Side Menu */
    $(".offclick").click(function() {
        $(".sidebar-animate").toggleClass("sidebar-out");
        $(".offclick").toggleClass("hide");

    });
	
/* Toggle send mail menu */
    $(".mail").click(function() {
        $(".header-style").toggleClass("hide");
        $(".bottom-bar").toggleClass("mail-open");
        $(".mail").toggleClass("mail-button-open");
        $(".mail-div").toggleClass("hidden-mail");
        $(".mail-bottom-bar").toggleClass("mail-bottom-height");

    });
   
    var parent, ink, d, x, y;
    $("ul li a, div .material-button").click(function(e) {

        parent = $(this).parent();
        //create .ink element if it doesn't exist
        if (parent.find(".ink").length == 0)
            parent.prepend("<span class='ink'></span>");

        ink = parent.find(".ink");
        //incase of quick double clicks stop the previous animation
        ink.removeClass("animate");

        //set size of .ink
        if (!ink.height() && !ink.width()) {
            //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            d = Math.max(parent.outerWidth(), parent.outerHeight());
            ink.css({
                height: d,
                width: d
            });
        }

        //get click coordinates
        //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
        x = e.pageX - parent.offset().left - ink.width() / 2;
        y = e.pageY - parent.offset().top - ink.height() / 2;

        //set the position and add class .animate
        ink.css({
            top: y + 'px',
            left: x + 'px'
        }).addClass("animate");
    })

    $('li .notice').click(function() {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: (parseInt($($anchor.attr('href')).offset().top) - $(".header").height()) + "px"
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });


});

/* Open side menu */
function slideMenu() {
    $(".offclick").toggleClass("hide");
    $(".close-menu").toggleClass("close-full-size")
    $('.menu-animate').toggleClass("menu-out");
    $('.sidebar-animate').toggleClass("sidebar-out");
    $('.navbar-toggle').toggleClass("navbar-open");

}
//jQuery to collapse the navbar on scroll
$(window).scroll(function() {

});