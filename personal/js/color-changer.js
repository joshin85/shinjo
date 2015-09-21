
function colorChanger(target, alternet){
	var Target = $(target);
	var Alternet = $(alternet);
	var offsetTop = Target.offset().top;
	var offsetLeft = Target.offset().left;
	var width = Target.width();
	var height = Target.height();
	var bestChoice;
	$("div").each(function(){
		var iter = $(this);
		var iterTop = iter.offset().top;
		var iterLeft = iter.offset().left;
		var iterWidth = iter.width();
		var iterHeight = iter.height();
		if(iterTop < offsetTop && iterTop + iterHeight > offsetTop + height && offsetLeft > iterLeft && offsetLeft + width < iterLeft + iterWidth){
			var bg =  iter.css("background");	
			if(typeof bestChoice === "undefined")
				bestChoice = $(this)
			else if(iter.css("z-index") > bestChoice.css("z-index"))
				if(iter.css("background") !== "undefined" && bg.indexOf("rgba(0, 0, 0, 0)") == -1)
					bestChoice = $(this)
		}
	});
	var contrast = bestChoice.css("background");
	var split = contrast.split(")");
	var split2 = split[0].split("(");
	var colorArray = split2[1].split(",");
	Target.css("background", "RGB(" + (255 - colorArray[0]) + ", " + (255 -  colorArray[1]) + ", "+ (255 - colorArray[2]) + ")");
	Alternet.css("background","RGB(" + (colorArray[0]) + ", " + (colorArray[1]) + ", "+ (colorArray[2]) + ")");
	
}	