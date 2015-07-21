	$(document).ready(function() {
if(window.innerWidth > 768){		
$('.menu-animate').toggleClass("menu-out");

$('.sidebar-animate').toggleClass("sidebar-out");
$('.navbar-toggle').toggleClass("navbar-open");
}
$('.navbar-toggle').click(function(){
	slideMenu();
});
$('.side-item-style > a').click(function(){
	$('.side-item-style > a').removeClass('notice-lg');
	$(this).toggleClass('notice-lg');
});
$(".mail").click(function(){
	$(".bottom-bar").toggleClass("mail-open");
	$(".mail").toggleClass("mail-button-open");
	$(".mail-div").toggleClass("hidden-mail");
	
	
});
//http://thecodeplayer.com/walkthrough/ripple-click-effect-google-material-design
//jQuery time
var parent, ink, d, x, y;
$("ul li a").click(function(e){

	parent = $(this).parent();
	//create .ink element if it doesn't exist
	if(parent.find(".ink").length == 0)
		parent.prepend("<span class='ink'></span>");
		
	ink = parent.find(".ink");
	//incase of quick double clicks stop the previous animation
	ink.removeClass("animate");
	
	//set size of .ink
	if(!ink.height() && !ink.width())
	{
		//use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
		d = Math.max(parent.outerWidth(), parent.outerHeight());
		ink.css({height: d, width: d});
	}
	
	//get click coordinates
	//logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
	x = e.pageX - parent.offset().left - ink.width()/2;
	y = e.pageY - parent.offset().top - ink.height()/2;
	
	//set the position and add class .animate
	ink.css({top: y+'px', left: x+'px'}).addClass("animate");
})


});


function slideMenu() {
	$('.nav-animate').toggleClass("nav-out");
	 $('.content-animate').toggleClass("container-out");
 $('.menu-animate').toggleClass("menu-out");
$('.sidebar-animate').toggleClass("sidebar-out");
$('.navbar-toggle').toggleClass("navbar-open");
}
