/*
 * http://api.openweathermap.org/data/2.5/forecast?q=iowa%20city,us&mode=json
 * 
 * on click http://forecast.io/#/f/41.6436,-91.6047
 */

System.Gadget.settingsUI = "settings.html";
System.Gadget.onSettingsClosed = function(){
	update();
};
	
var DEG = "°";
	
bg = $("#bg")[0];


/*
 * value vars
 */
var _temp,
	_tempDeg,
	_locName,
	_wind,
	_humdity,
	_desc;


function template( data ){
	
	
	var fontFace = System.Gadget.Settings.readString("face") || 'arial',
		fontColor =System.Gadget.Settings.readString("color") || 'whitesmoke',
		fontSize = System.Gadget.Settings.readString("size") || 130,
		lineSpace = fontSize * .13;
	
	
	//find elements and udpate the display	
	var locName = data.name,
		//temps	
		cTemp = Math.floor(data.main.temp),
		humidity = 'HUMIDITY: '+data.main.humidity+"%",
		//wind
		windSpeed = "WIND: "+Math.floor(data.wind.speed)+" mph"


	//########
	if(_temp==null){
		_temp = bg.addTextObject('pla', fontFace, fontSize, fontColor, 0, 0 );
	}
	_temp.value = cTemp;
	
	_temp.color = fontColor;
	_temp.fontsize = fontSize;
	_temp.font = fontFace;
	
	//########
	if(_tempDeg==null){
		_tempDeg = bg.addTextObject('pla', fontFace, fontSize/2, fontColor, 0, 0 );
	}
	_tempDeg.value = DEG;
	_tempDeg.left = _temp.width - fontSize /3;
	
	_tempDeg.color = fontColor;
	_tempDeg.fontsize = fontSize * .5;
	_tempDeg.font = fontFace;
	
	
	if(_desc==null){
		_desc = bg.addTextObject('pla', fontFace, fontSize*.3, fontColor, 0, lineSpace );
	}
	_desc.value = data.weather[0].description.toUpperCase();
	_desc.left = _temp.width;
	
	_desc.color = fontColor;
	_desc.fontsize = fontSize * .3;
	_desc.font = fontFace;
	
	
	if(_wind==null){
		_wind = bg.addTextObject('pla', fontFace, fontSize*.18, fontColor, 0, 0 );
	}
	_wind.value = windSpeed.toUpperCase();
	_wind.left = _temp.width;
	_wind.top = _desc.height + lineSpace;
	
	
	_wind.color = fontColor;
	_wind.fontsize = fontSize * .18;
	_wind.font = fontFace;
	
	if(_humdity==null){
		_humdity = bg.addTextObject('pla', fontFace, fontSize*.18, fontColor, 0, 0 );
	}
	_humdity.value = humidity;
	_humdity.left = _temp.width;
	_humdity.top = _desc.height + _wind.height + lineSpace;
	
	_humdity.color = fontColor;
	_humdity.fontsize = fontSize * .18;
	_humdity.font = fontFace;
	
	if(_locName==null){
		_locName = bg.addTextObject('pla', fontFace, fontSize*.12, fontColor, 0, 0 );
	}
	_locName.value = locName.toUpperCase();
	_locName.left = _temp.width + _wind.width + fontSize * .18;
	_locName.top = _desc.height  + lineSpace * 1.6
	
	_locName.color = fontColor;
	_locName.fontsize = fontSize * .12;
	_locName.font = fontFace;
	
	var tempAndDecWidth = _temp.width + _desc.width,
		locWidth = _locName.left + _locName.width;
	
	document.body.style.width = ((tempAndDecWidth > locWidth )? tempAndDecWidth : locWidth)+'px' ;
		
}

function update(){

	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/weather",
		data: {
			q: System.Gadget.Settings.readString("loc") || "iowa city,ia" ,
			mode: "json",
			units: "imperial"
		},
		dataType: 'jsonp'
	})
	.success(function(data){
		
		template(data)
		
	})
	.error(function(){
		console.log( error)
	})

//template({"coord":{"lon":-91.53,"lat":41.66},"sys":{"message":0.1066,"country":"United States of America","sunrise":1387027550,"sunset":1387060594},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"gdps stations","main":{"temp":30.59,"pressure":1019,"humidity":79,"temp_min":266.15,"temp_max":267.15},"wind":{"speed":6.7,"deg":320,"gust":10.3},"snow":{"3h":0},"clouds":{"all":90},"dt":1387061520,"id":4862034,"name":"Iowa City","cod":200})		
}

//TODO: settimeout
setInterval('update()',360*1000);
