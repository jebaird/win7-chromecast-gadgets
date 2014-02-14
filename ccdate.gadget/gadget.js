/*
 * show date in a fancy HUD fasion
 */


/*
 * in F
 */
var m = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
var d = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];

//bg objects
var date,month,day;
var bg = document.getElementById("bg");



System.Gadget.settingsUI = "settings.html";
System.Gadget.onSettingsClosed = function(){
	template();
};

	

function toUpper( string ){
	return string.toUpperCase();
}

function template( ){
	
	var fontFace = System.Gadget.Settings.readString("face") || 'arial',
	fontColor =System.Gadget.Settings.readString("color") || 'whitesmoke',
	fontSize = System.Gadget.Settings.readString("size") || 130;
	
	var current = System.Time.getLocalTime(System.Time.currentTimeZone);
	var dDateInfo = new Date(Date.parse(current));
	
	
	if(date == null)
	{
		date = bg.addTextObject(dDateInfo.getDate(), fontFace, fontSize, fontColor, 0, 0);
		//date.opacity = 30;
	}
	date.value = dDateInfo.getDate();
	
	date.color = fontColor;
	date.fontsize = fontSize;
	date.font = fontFace;
	


	if(day == null)
	{
		day = bg.addTextObject(d[dDateInfo.getDay()], fontFace, fontSize, fontColor, 0, 10);
		//day.opacity = 30;
	}
	day.value = d[dDateInfo.getDay()];
	day.left = date.left+date.width + -(fontSize * .25);
	day.color = fontColor;
	day.fontsize = fontSize  *.65;
	day.font = fontFace;
	

	if(month == null)
	{
		month = bg.addTextObject(m[dDateInfo.getMonth()], fontFace, fontSize * .4, fontColor, 0, fontSize *.75);
		
	}
	month.value = m[dDateInfo.getMonth()];
	month.left = date.left+date.width + -(fontSize * .25);
	month.top = day.height
	
	month.color = fontColor;
	month.fontsize = fontSize * .4;
	day.font = fontFace
	
	
	
	document.body.style.width = (day.width + date.width)+'px' ;
	document.body.style.height = (date.height + month.height)+'px';
	

}

template();
//update everyhour
setInterval('template()', 360*1000);
