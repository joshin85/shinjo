//vars
var loadPath = "192.168.1.61/shinjo/personal/"

$(document).ready(function() {

/* Change position of title to fixed based on scroll */
    attachEventListeners();
	
});
function message(respObj){
	alert("Message Sent");
}
function doPost(url, method, callback, data){
	phr = new XMLHttpRequest();
	phr.open(method, loadPath + url, true);
	phr.send(data);
	phr.onreadystatechange = function() {
		if (phr.readyState == 4 && phr.status == 200) {
			callback(phr.responseText);
		}
	}
}
function attachEventListeners(){
	var headerOffset = parseInt($(".stripe").offset().top);
	var i = 0;
	var scrollEnabled = true;
	$(".send-button").click(function(){
		var formid = document.getElementById("msgForm");
		var formdata = new FormData(formid);
		doPost("post/sendMessage.php", "post", message, formdata)
	});
	$(window).scroll(function() {
		if(scrollEnabled){
        if ($(".stripe").offset().top - $(window).scrollTop() < 0 && !$(".header-style").is(".header-fixed")) {
            $(".header-style").addClass("header-fixed");
			$(".header").addClass("header-down");
			$(".stripe").addClass("header-small");
        } else if ($(window).scrollTop() < headerOffset) {
            $(".header-style").removeClass("header-fixed");
			$(".header").removeClass("header-down");
			$(".header-small").removeClass("header-small");
			$(".stripe").css("border", "");
			$(".stripe").css("background","none");
		}
		i++;
		if(i % 1 == 0)
			colorChanger(".navmenu-button", ".icon-bar");
		$("section").each(function(){
			if($(".stripe").offset().top + $(".header-body").height() + 10 > $(this).offset().top &&  $(".stripe").offset().top < $(this).offset().top + $(this).height()){
				var text = $(this).prev().find(".header-body-text").text();
				if(text.length > 0){
				if(window.innerWidth > 10){
					console.log("sdf");
					$(".stripe").html("Shinjo Melosh <span class='fa fa-chevron-right header-fa'></span> " + text)
				}else
					$(".stripe").html(text)
					}
				else 
				$(".stripe").html("Shinjo Melosh");	
			}
		});
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
		scrollEnabled = false;
        $('html, body').stop().animate({
            scrollTop: (parseInt($($anchor.attr('href')).offset().top) ) - $(".header").height() - $(".header-body").height() + "px"
			
        }, 1500, 'easeInOutExpo',function(){
			scrollEnabled = true;
		});
        event.preventDefault();
    });

}
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