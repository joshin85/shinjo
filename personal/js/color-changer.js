
function colorChanger(target, Alternate){
	var Target = $(target);
	var Alternate = $(Alternate);
	var offsetTop = Target.offset().top;
	var offsetLeft = Target.offset().left;
	var width = Target.width();
	var height = Target.height();
	var bestChoice;
	
	$("div, section").each(function(){
		var iter = $(this);
		var iterTop = iter.offset().top;
		var iterLeft = iter.offset().left;
		var iterWidth = iter.width();
		var iterHeight = iter.height();
		if(iterTop < offsetTop && iterTop + iterHeight > offsetTop + height && offsetLeft > iterLeft && offsetLeft + width < iterLeft + iterWidth){
			var bg =  iter.css("background");	
			if(typeof bestChoice === "undefined")
				if($(this).hasClass("ignore")){
			
				} else {
					bestChoice = iter;
				}
			else if(iter.css("z-index") > bestChoice.css("z-index") && !$(this).hasClass("ignore") && $(this).height())
				if(iter.css("background") != "undefined" && bg.indexOf("rgba(0, 0, 0, 0)") == -1){
					console.log( bg.indexOf("rgba(0, 0, 0, 0)"));
					bestChoice = iter;
					}
		}
	});
	console.log("id = " + bestChoice.attr("id") + " " + bestChoice.attr("class") + " " + bestChoice.css("background"));
	var contrast = bestChoice.css("background");
	var split = contrast.split(")");
	var split2 = split[0].split("(");
	var colorArray = split2[1].split(",");
	//rgb(41, 182, 246);
	var sum = (colorArray[0] - 1) + ( colorArray[1] - 1) + (colorArray[2] - 1); 
	var change = sum / 6;
	var red = getColor(0, change);
	var blue = getColor(150, change);
	var green = getColor(136, change);
	//console.log(change);
	//var invertedColor = "RGB(" + (255 - colorArray[0]) + ", " + (255 -  colorArray[1]) + ", "+ (255 - colorArray[2]) + ")";
	//var invertedColor = "RGB(" + (41 + (50 - )colorArray[0] - 50) + ", " + (colorArray[1] - 50) + ", "+ (colorArray[2] - 50) + ")";
	var invertedColor = "RGB(" + red + ", " + blue + ", "+  green + ")";
	//var color = "RGB(" + (colorArray[0]) + ", " + (colorArray[1]) + ", "+ (colorArray[2]) + ")";
	
	console.log(invertedColor);
	//var color = "RGB(" + (colorArray[0] + 100) + ", " + (colorArray[1] + 100) + ", "+ (colorArray[2] + 100) + ")";
	
	if(darkOrLight(red,blue,green)){	
		dark(Target);
		var color = "#fff";
	}else { 
		light(Target);
		var color = "#fff";
	}
	Target.css("background",invertedColor);
	Alternate.css("background",color);
	$(".stripe").css("background", color);
	$(".stripe").css("color", invertedColor);
//	$(".stripe").css("border", "1px solid #ddd");
	$(".icon-bar").css("background", color);
	if($(".header-small").length == 0){
		$(".stripe").css("background","none");
		$(".stripe").css("color","white");
		$(".stripe").css(" ","none");
		}
}
function getColor(val, change){
	
	return (((val - change) < 0) ? 0 : Math.floor((val - change))); 
}
function dark(){
	//$(".stripe").css("box-shadow","0px 0px 2px RGBA(0,0,0,.2)");
}
function light(){
	//$(".stripe").css("box-shadow","none");

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