$(function(){
	$(window).scroll(function() {
		offsetTop = $(window).scrollTop();
	/*	$("section").each(function(){
			var wind = (($(this).offset().top - window.innerHeight) - offsetTop);
			
			if(wind < 0 && -window.innerHeight < wind){
				console.log("Offsettop = " + offsetTop + " div = " + $(this).attr("id") + " top = " +  wind)
			}
		});*/
	$(".fixed-background").each(function(){
		parentDiv = $("#" + $(this).data("section")).offset().top ;
		$(this).css("top", parentDiv  - offsetTop);
		/** /
		parentDiv = $("#" + $(this).data("section")).offset().top ;
		console.log( parentDiv + " = " + offsetTop);
		if(parentDiv  < offsetTop + 100 && parentDiv > offsetTop - 100){
			$(".fixed").removeClass("fixed");
			$(this).addClass("fixed");
			$(this).css("top", parentDiv  - offsetTop);
		}
		else
			if(!$(this).hasClass("fixed"))
				$(this).css("top", parentDiv  - offsetTop);
		//if()
	});	
/**/
});	
	});

});