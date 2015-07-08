	$(document).ready(function() {
if(window.innerWidth > 768){		
$('.content-animate').toggleClass("container-out");
$('.menu-animate').toggleClass("menu-out");
$('.sidebar-animate').toggleClass("sidebar-out");
$('.navbar-toggle').toggleClass("navbar-open");
}
$('.navbar-toggle').click(function(){
	
	slideMenuIn();
});
});

function slideMenuOut() {
    $('.menu-animate').toggle("menu-out");

}

function slideMenuIn() {
	 $('.content-animate').toggleClass("container-out");
 $('.menu-animate').toggleClass("menu-out");
$('.sidebar-animate').toggleClass("sidebar-out");
$('.navbar-toggle').toggleClass("navbar-open");
}