/*
 * take in string and display it
 */


/*
 * in F
 */

//bg objects
var _text,_title;
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
	fontSize = System.Gadget.Settings.readString("size") || 24,
	text = System.Gadget.Settings.readString("text") || 'change this in the settings';
	
	
	
	if(_text == null)
	{
		_text = bg.addTextObject('d', fontFace, fontSize, fontColor, 0, 0);
		//date.opacity = 30;
	}
	
	_text.value =text;
	_text.color = fontColor;
	_text.fontsize = fontSize;
	_text.font = fontFace;
	
	// if(_title == null)
	// {
		// _title = bg.addTextObject('', fontFace, fontSize, fontColor, 0, 0);
		// //date.opacity = 30;
	// }
// 	
	// _title.value =text;
	// _title.color = fontColor;
	// _title.fontsize = fontSize;
	// _title.font = fontFace;
	
	
// 	
	document.body.style.width = ( _text.width)+'px' ;
	document.body.style.height = (_text.height)+'px';
	

}

template();
