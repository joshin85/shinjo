
function colorChanger(target, Alternate){
	var Target = $(target);
	var Alternate = $(Alternate);
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
	var invertedColor = "RGB(" + (255 - colorArray[0]) + ", " + (255 -  colorArray[1]) + ", "+ (255 - colorArray[2]) + ")";
	var color = "RGB(" + (colorArray[0]) + ", " + (colorArray[1]) + ", "+ (colorArray[2]) + ")";
	
	Target.css("background", invertedColor);
	Alternate.css("background",color);
	$(".header-text-container").css("background", color);
	$(".stripe").css("color", invertedColor);
	if(darkOrLight(colorArray[0], colorArray[1], colorArray[2])){	
		dark(Target);
	}else { 
		light(Target);
}
}

function dark(){
	$(".header-text-container").css("box-shadow","0px 5px 2px RGBA(0,0,0,.2)");
}
function light(){
	$(".header-text-container").css("box-shadow","none");

}
//taken from http://stackoverflow.com/questions/5650924/javascript-color-contraster
var darkOrLight = function(red, green, blue) {
  var brightness;
  brightness = (red * 299) + (green * 587) + (blue * 114);
  brightness = brightness / 255000;

  // values range from 0 to 1
  // anything greater than 0.5 should be bright enough for dark text
  if (brightness >= 0.5) {
    return true;//"dark-text";
  } else {
    return false;//"light-text";
  }
}