var keyboard = (function (){

	var initialize = function(){

		
		var keyboardDiv = document.createElement("div");
		keyboardDiv.id = "keyboard";
		keyboardDiv.innerHTML="<div class='keyboard-row'><span id='49'>1</span> <span id='50'>2</span> <span id='51'>3</span> <span id='52'>4</span> <span id='53'>5</span> <span id='54'>6</span> <span id='55'>7</span></div> \
							<div class='keyboard-row'><span id='81'>Q</span> <span id='87'>W</span> <span id='69'>E</span> <span id='82'>R</span> <span id='84'>T</span> <span id='89'>Y</span> <span id='85'>U</span> <span id='73'>I</span> <span id='79'>O</span> <span id='80'>P</span> </div> \
							<div class='keyboard-row'><span id='65'>A</span> <span id='83'>S</span> <span id='68'>D</span> <span id='70'>F</span> <span id='71'>G</span> <span id='72'>H</span> <span id='74'>J</span> <span id='75'>K</span> <span id='76'>L</span> </div> \
							<div class='keyboard-row'><span id='90'>Z</span> <span id='88'>X</span> <span id='67'>C</span> <span id='86'>V</span> <span id='66'>B</span> <span id='78'>N</span> <span id='77'>M</span> </div>"

		document.body.appendChild(keyboardDiv);

		_setKeyboardHandler();
		_setMouseHandler(keyboardDiv);
	};

	var _setMouseHandler = function(aDiv){
		var rows = aDiv.children;

		for (var i = 0; i < rows.length; i++) {
			rows[i].setAttribute('data-col', String(i) );

			for (var j = 0; j < rows[i].children.length; j++) {
				var elem = rows[i].children[j];
				elem.addEventListener('mousedown',_mouseClicked);
				elem.addEventListener('mouseup',_mouseReleased);

				
				elem.setAttribute('data-row', String(j) );
			}
		}
	};

	var _setKeyboardHandler = function(){
		document.addEventListener('keydown',_keyPressed);
		document.addEventListener('keyup',_keyReleased);
	};

	var _keyPressed = function(event){
		var el = document.getElementById(''+event.keyCode+'');
		if (!el) return;

		triggerKeyDown(el);
	};

	var _keyReleased = function(event){
		var el = document.getElementById(''+event.keyCode+'');
		if (!el) return;

		triggerKeyUp(el);
	};

	var _mouseClicked = function(event){
		var el = document.getElementById(''+event.srcElement.id+'');

		triggerKeyDown(el);
	};

	var _mouseReleased = function(event){
		var el = document.getElementById(''+event.srcElement.id+'');
		if (!el) return;
		triggerKeyUp(el);
	};

	var setWidth = function(w){
		document.getElementById('keyboard').style.width = ''+w+'px';
	};

	// called by both mouse and key events
	var triggerKeyDown = function(el) {
		if (el.getAttribute('data-pressed') === '1') {
			return;
		}

		el.setAttribute('data-pressed', '1');
		el.style.transition="background linear 0.1s";
		el.style.background="#fe1";

		// dispatch custom event
		var customKeyDown = new Event('customkeydown', {
				'view': window,
		    'bubbles': true
		});
		customKeyDown.colIndex = el.parentElement.getAttribute('data-col');
		customKeyDown.rowIndex = el.getAttribute('data-row');
		el.dispatchEvent(customKeyDown);
	};

	// called by both mouse and key events
	var triggerKeyUp = function(el) {
		el.setAttribute('data-pressed', '0');
		el.style.transition="background linear 0.1s";
		el.style.background="#D9CB9E";

		
		var customKeyUp = new Event('customkeyup', {
				'view': window,
		    'bubbles': true
		});

		customKeyUp.colIndex = el.parentElement.getAttribute('data-col');
		customKeyUp.rowIndex = el.getAttribute('data-row');
		el.dispatchEvent(customKeyUp);
	};

	return{
		initialize : initialize,
		setWidth : setWidth
	};
})();