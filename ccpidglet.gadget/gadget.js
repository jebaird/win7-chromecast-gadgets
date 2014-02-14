/*
 * show date in a fancy HUD fasion
 */


/*
 * in F
 */

//bg objects

var bg = document.getElementById("bg");
var body = document.body;

var xmlLastModified;

var settings ={};


// display

var display = {
	text: [],
	overlay: []
}
//store all of the contacts from xml
var contacts = [];

function init(){

	System.Gadget.settingsUI = "settings.html";
	System.Gadget.onSettingsClosed = function(){
		readSettings();
		updateList();
		
	};
	readSettings();
	
	xmlLastModified = new Date(0);
	checkForUpdates();
	//change this to like 30 seconds
	setInterval('checkForUpdates()', 1000 * 30);

}

function readSettings(){
	//TODO: add setting that lets the user filter out what buddies show it in this list
	//add opacity
	// add mouse over opacity
	// alignment left and right
	
	settings.fontFace = System.Gadget.Settings.readString("face") || 'arial';
	settings.fontColor = System.Gadget.Settings.readString("color") || 'whitesmoke';
	settings.fontSize = System.Gadget.Settings.readString("size") || 15;
	settings.alignment = System.Gadget.Settings.readString("alignment") || "right"; 
	settings.filter = System.Gadget.Settings.readString("filter") || ""; 
	
	settings.opacity = System.Gadget.Settings.readString("opacity") || 50; 
	settings.opacityMouseover = System.Gadget.Settings.readString("opacityMouseover") || 100; 
	
	var customPath = System.Gadget.Settings.readString('CustomPath');
	if(customPath != ''){
		settings.purplePath = customPath;
	} else {
		settings.purplePath = System.Environment.getEnvironmentVariable('APPDATA') + "\\.purple";
	}
}
	
function checkForUpdates(){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var mtime = new Date(fso.GetFile(settings.purplePath + "\\pidglet.xml").DateLastModified);
	if(mtime > xmlLastModified){
		xmlLastModified = mtime;
		updateList();
	}
}



function updateList(){
	var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc.async = false;
	xmlDoc.load(settings.purplePath + "\\pidglet.xml");
	var buddies = xmlDoc.getElementsByTagName('Buddy');
	
	//sortBuddies(buddies);
	
	template(buddies);
	
}

function template(buddies){
	//xml data format
	//name, id, status, idle
	//addBuddy(buddies[i].text, buddies[i].attributes[0].value, buddies[i].attributes[1].value, buddies[i].attributes[2].value);
	
	
	//clean up
	bg.removeObjects();
	//TODO: remove all bg objects
	var i = display.overlay.length;
	while(i--){
		body.removeChild(display.overlay[i]);
	}
	
	display.text =[];
	display.overlay = [];
	
	var bodyWidth = 0;
	
	//add filter
	if( settings.filter ){
		//buddies.filter()
		//buddies = buddies.filter('buddy',new Function(settings.filter));
		buddies = buddies.filter(function(b){
			return b.text.toLower() == 'travis fox';
		})
		
	}
	
	for(var i = 0; i < buddies.length; i++){
		var top = (i==0)?0:display.text[0].height*display.text.length;
		var text = bg.addTextObject(buddies[i].text, settings.fontFace, settings.fontSize, settings.fontColor, 0, top);
		var overlay = _createOverlay(text,buddies[i].attributes[0].value);
		
		//seems that setting the opacity messes with the z index
		//text.opacity = settings.opacity;
		
		if( bodyWidth < text.width ){
			bodyWidth = text.width
		}
		
		display.text.push(text);
		display.overlay.push(overlay);
		
		body.appendChild(overlay);
	}
	document.body.style.width = bodyWidth+'px' ;
	document.body.style.height = (display.text[0].height * display.text.length)+'px';
	
	if( settings.alignment == "right" ){
		var i = display.text.length;
		while(i--){
			var text = display.text[ i ],
				overlay = display.overlay[ i ],
				left = bodyWidth - text.width;
				
			overlay.style.left = left+'px';
			
			text.left = left;
		}
	}

}

function _createOverlay(textObj,buddyId){
	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.filter = "alpha(opacity=0)";
	div.style.backgroundColor = "black"
	div.style.width = textObj.width+'px';
	div.style.height = textObj.height+'px';
	div.style.top = textObj.top+'px';
	div.style.left = textObj.left+'px';
	div.className = 'buddy-overlay';
	var text = document.createElement('g:background');
	
	div.appendChild(text)
	//used to open chat
	div.buddyId = buddyId;
	
	//use event delegatsion?
	div.onclick = function(){
		openChat(buddyId);
	}

	div.onmouseover = function(){
		this.style.filter = 'alpha(opacity=1)';
		//textObj.opacity = settings.opacityMouseover;
	}
	div.onmouseleave = function(){
		//textObj.opacity = settings.opacity;
		this.style.filter = 'alpha(opacity=0)';
	}

	return div;
}

function openChat(id){
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var cmd = fso.CreateTextFile(settings.purplePath + "\\pidglet-cmd", true);
	cmd.WriteLine(id);
	cmd.Close();
}

function sortBuddies(a, b){
	if(a.innerText.toLowerCase() > b.innerText.toLowerCase()){
		return 1;
	} else if(a.innerText.toLowerCase() < b.innerText.toLowerCase()) {
		return -1;
	}
	return 0;
}

init();
