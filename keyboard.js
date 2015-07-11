var keyboard = (function (){
	var _keyState = [];

	var initialize = function(){
		//fill the _keystate array
		for(i=0;i<26;i++){
			_keyState[i]=0;
		}

		//Draw the Keyboard
		var keyboardDiv = document.createElement("div");
		keyboardDiv.id = "keyboard";
		keyboardDiv.innerHTML="<div class='keyboard-row'><span id='81'>Q</span> <span id='87'>W</span> <span id='69'>E</span> <span id='82'>R</span> <span id='84'>T</span> <span id='89'>Y</span> <span id='85'>U</span> <span id='73'>I</span> <span id='79'>O</span> <span id='80'>P</span> </div> \
							<div class='keyboard-row'><span id='65'>A</span> <span id='83'>S</span> <span id='68'>D</span> <span id='70'>F</span> <span id='71'>G</span> <span id='72'>H</span> <span id='74'>J</span> <span id='75'>K</span> <span id='76'>L</span> </div> \
							<div class='keyboard-row'><span id='90'>Z</span> <span id='88'>X</span> <span id='67'>C</span> <span id='86'>V</span> <span id='66'>B</span> <span id='78'>N</span> <span id='77'>M</span> </div>"
		document.body.appendChild(keyboardDiv);

		_setKeyboardHandler();
		_setMouseHandler();
	};

	var _setMouseHandler = function(){
		//seting mousey stuff here
		for(i=65;i<91;i++){
			var elem = document.getElementById(''+i+'');
			elem.addEventListener('mousedown',_mouseClicked);
			elem.addEventListener('mouseup',_mouseReleased);
		}
	}

	var _setKeyboardHandler = function(){
		document.addEventListener('keydown',_keyPressed);
		document.addEventListener('keyup',_keyReleased);
	}

	var _keyPressed = function(event){
		//console.log("key pressed was " + event.keyCode);
		_keyState[event.keyCode-65]=1;
		document.getElementById(''+event.keyCode+'').style.transition="background linear 0.1s";
		document.getElementById(''+event.keyCode+'').style.background="#fe1";
		console.log(_keyState);
	}

	var _keyReleased = function(event){
		//console.log("key released was " + event.keyCode);
		_keyState[event.keyCode-65]=0;
		document.getElementById(''+event.keyCode+'').style.transition="background linear 0.1s";
		document.getElementById(''+event.keyCode+'').style.background="#D9CB9E";
		console.log(_keyState);
	}

	var _mouseClicked = function(event){
		//console.log(event.srcElement.id);
		_keyState[event.srcElement.id-65]=1;
		document.getElementById(''+event.srcElement.id+'').style.transition="background linear 0.1s";
		document.getElementById(''+event.srcElement.id+'').style.background="#fe1";
		console.log(_keyState);
	}

	var _mouseReleased = function(event){
		//console.log(event.srcElement.id);
		_keyState[event.srcElement.id-65]=0;
		document.getElementById(''+event.srcElement.id+'').style.transition="background linear 0.1s";
		document.getElementById(''+event.srcElement.id+'').style.background="#D9CB9E";
		console.log(_keyState);
	}

	var setWidth = function(w){
		document.getElementById('keyboard').style.width = ''+w+'px';
	}

	return{
		initialize : initialize,
		setWidth : setWidth
	};
})();