/*
CHANGELOG:

alpha 5:
oha...wo soll ich anfangen...
also erstmal, einen preloader erstellt, der angezeigt wird bis die seite fertig geladen ist um so html "glitches" zu vermeiden
den hintergrund von schwarz (#141414) zu weiß (#f7f7f7) geändert, dementsprechend alle anderen farben auch angepasst und generell alles bisschen verschönert und an die offiziellen farben von genius angepasst
schatten nach innen für die gesamte map hinzugefügt...sieht ein bissl nicer aus einfach
rapper wurden diesmal noch immer keine implementiert (sorry timo), dafür ist funktional trotzdem auch einiges geschehen
ich hab erstmal alle jahreslisten der features aus dem hauptcode rausgetan und als einzelne dateien abgespeichert...die dann im hauptcode abrufen zu können, tjaaa, das war ein krampf, aber geschafft
die semi-eleganten "about"- und "help"-buttons da links oben im eck durch ein super elegantes menü oben in der mitte ausgetauscht...ist doch einfach auch viel geiler, außerdem hat jetzt der zeitraumslider links mehr platz
das erste mal probiert, den ganzen code zu komprimieren...geil...läuft viel flüssiger...ab der beta komprimier ich das jedes mal vor release
den zeitraumslider NOCH interaktiver gemacht (krass krass krass), nämlich ändert sich die anzeige jetzt *während* man rumslidet und nicht erst *nachdem* man zu ende geslidet hat...der slidegrind am start, sheesh
die möglichkeit eingebaut, alles glitzern zu lassen
na spaß, hab ich nicht gmacht
plis dont het mi nau, sina
- 12.7.16 - 16.7.16

alpha 4:
mutterficki endlich...man kann jetzt endlich zeiträume auswählen...1 nices feature (erklärung: im collab-plan geht es um features)
außerdem ist das projekt jetzt auf github unter "https://github.com/nnmrts/collab-plan"...ist auch nice, da red ich bissl über bugs und so, aber englisch, weil ich die language skillz am stizzle hab
- 10.7.16 - 12.7.16

alpha 3:
linien die vom mittelpunkt ausgehen sind jetzt ENDLICH farbig und dicker und so und linien auf dem zweiten kreis haben andere farbe (ich hab den fucking source code in der library umändern müssen, pfff, das war langwierig)
changelog erstellt
sido erstmal entfernt, weil alles viel zu langsam ist oida
wieder hinzugefügt, weils doch scheißegal ist
wieder weggegeben, weil keinen bock, alle jahreszahlen zu seinen features rauszusuchen
jahreszahlen zu jedem feature eingetragen...alter...ich bin tot...das traurigste ist ja, dass man die gerade gemachte arbeit gar nicht sieht, also man sieht gar keinen unterschied auf der website...aber nur derweil, da kommt was ganz ganz großes bald, in version alpha 4 oder so hoffentlich
- 9.7.16 - 10.7.16

alpha 2:
alles bissl verschönert
log bissl verändert
popup, about und hilfe hinzugefügt und endlich geschafft das rapperbild da rechts über den features anzuzeigen
das erste mal einen versionsnamen ausgedacht und alpha 2 für richtig empfunden
- irgendwann zwischen 23.6.16 - 9.7.16

alpha 1:
grundcode geschrieben und paar rapper als test schon mal eingefügt (alligatoah, bartek, edgar wasser, fatoni, k.i.z., kaas, maeckes, sido, tua, weekend)
- 23.6.16
*/



var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
  }
};

function init(){
	var modalclass = $("body").hasClass("modal-open");
	startactive = function(){
		$("#aboutli").removeClass("active");
		$("#helpli").removeClass("active");
		$("#startli").addClass("active");
		$('.slippery').remove();
		$('.twiceBorder').hoverSlippery({
			border: true,
			twiceBorder : true
		})
	}
	//- Default 
	$('.default').hoverSlippery();
	//- Twice border
	$('.twiceBorder').hoverSlippery({
	  border: true,
	  twiceBorder : true
	})
	//- Underline
	$('.underline').hoverSlippery({
	  border: true,
	  underline: true
	})
	//- Overline
	$('.overline').hoverSlippery({
	  border: true,
	  overline: true
	})

	var logger = function()
	{
		var oldConsoleLog = null;
		var pub = {};

		pub.enableLogger =  function enableLogger() 
							{
								if(oldConsoleLog == null)
									return;

								window['console']['log'] = oldConsoleLog;
							};

		pub.disableLogger = function disableLogger()
							{
								oldConsoleLog = console.log;
								window['console']['log'] = function() {};
							};

		return pub;
	}();

	logger.disableLogger();
	
	// logger.enableLogger();
	
	
	// --------------------------------------------
	
	var zeitraum = document.getElementById('zeitraum');

	noUiSlider.create(zeitraum, {
		start: [ 2005, 2016 ], // Handle start position
		step: 1, // Slider moves in increments of '10'
		margin: 0, // Handles must be more than '20' apart
		connect: true, // Display a colored bar between the handles
		direction: 'rtl',
		format: wNumb({
			decimals: 0
		}),
		orientation: 'vertical', // Orient the slider vertically
		behaviour: 'tap-drag', // Move handle on tap, bar is draggable
		range: { // Slider can select '0' to '100'
			'min': 2005,
			'max': 2016
		},
		pips: { // Show a scale with the slider
			mode: 'steps',
			density: 2
		}
	});
	jahr1text = document.getElementById('jahr1');
	jahr2text = document.getElementById('jahr2');
	function leftValue ( handle ) {
		return handle.parentElement.style.left;
	}
	
	var lowerValue = document.getElementById('jahr1'),
	lowerOffset = document.getElementById('lower-offset'),
	upperValue = document.getElementById('jahr2'),
	upperOffset = document.getElementById('upper-offset'),
	handles = zeitraum.getElementsByClassName('noUi-handle');
	
	// When the slider value changes, update the input and span
	zeitraum.noUiSlider.on('update', function ( values, handle ) {
		if ( !handle ) {
			lowerValue.innerHTML = values[handle];
		} else {
			upperValue.innerHTML = "- " + values[handle];
		}
	});
	
	(function($){$.concat||$.extend({concat:function(b,c){var a=[];for(var x in arguments)if(typeof a=='object')a=a.concat(arguments[x]);return a}});})(jQuery);
	
	index = 0;
	
	zeitraum.noUiSlider.on('slide', function(){
		jahr1 = zeitraum.noUiSlider.get()[0];
		jahr2 = zeitraum.noUiSlider.get()[1];
		if (jahr1 == 1995) {
			if (jahr2 == 1995) {
				json = json1995;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 1996) {
				json = $.concat(json1995, json1996 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 1997) {
				json = $.concat(json1995, json1996, json1997 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 1998) {
				json = $.concat(json1995, json1996, json1997, json1998 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 1999) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2000) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2001) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2002) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2003) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2004) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2005) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json1995, json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 1996) {
			if (jahr2 == 1996) {
				json = json1996;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 1997) {
				json = $.concat(json1996, json1997 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 1998) {
				json = $.concat(json1996, json1997, json1998 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 1999) {
				json = $.concat(json1996, json1997, json1998, json1999 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2000) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2001) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2002) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2003) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2004) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2005) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json1996, json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 1997) {
			if (jahr2 == 1997) {
				json = json1997;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 1998) {
				json = $.concat(json1997, json1998 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 1999) {
				json = $.concat(json1997, json1998, json1999 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2000) {
				json = $.concat(json1997, json1998, json1999, json2000 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2001) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2002) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2003) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2004) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2005) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat( json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json1997, json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 1998) {
			if (jahr2 == 1998) {
				json = json1998;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 1999) {
				json = $.concat(json1998, json1999 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2000) {
				json = $.concat(json1998, json1999, json2000 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2001) {
				json = $.concat(json1998, json1999, json2000, json2001 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2002) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2003) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2004) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2005) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json1998, json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 1999) {
			if (jahr2 == 1999) {
				json = json1999;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2000) {
				json = $.concat(json1999, json2000 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2001) {
				json = $.concat(json1999, json2000, json2001 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2002) {
				json = $.concat(json1999, json2000, json2001, json2002 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2003) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2004) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2005) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json1999, json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2000) {
			if (jahr2 == 2000) {
				json = json2000;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2001) {
				json = $.concat(json2000, json2001 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2002) {
				json = $.concat(json2000, json2001, json2002 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2003) {
				json = $.concat(json2000, json2001, json2002, json2003 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2004) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2005) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2000, json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2001) {
			if (jahr2 == 2001) {
				json = json2001;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2002) {
				json = $.concat(json2001, json2002 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2003) {
				json = $.concat(json2001, json2002, json2003 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2004) {
				json = $.concat(json2001, json2002, json2003, json2004 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2005) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2001, json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2002) {
			if (jahr2 == 2002) {
				json = json2002;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2003) {
				json = $.concat(json2002, json2003 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2004) {
				json = $.concat(json2002, json2003, json2004 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2005) {
				json = $.concat(json2002, json2003, json2004, json2005 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2002, json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2003) {
			if (jahr2 == 2003) {
				json = json2003;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2004) {
				json = $.concat(json2003, json2004 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2005) {
				json = $.concat(json2003, json2004, json2005 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json2003, json2004, json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2003, json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2004) {
			if (jahr2 == 2004) {
				json = json2004;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2005) {
				json = $.concat(json2004, json2005 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json2004, json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json2004, json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2004, json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2005) {
			if (jahr2 == 2005) {
				json = json2005;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2006) {
				json = $.concat(json2005, json2006 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json2005, json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json2005, json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2005, json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2006) {
			if (jahr2 == 2006) {
				json = json2006;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2007) {
				json = $.concat(json2006, json2007 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json2006, json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json2006, json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2006, json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2007) {
			if (jahr2 == 2007) {
				json = json2007;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2008) {
				json = $.concat(json2007, json2008 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json2007, json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json2007, json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2007, json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2007, json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2007, json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2007, json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2008) {
			if (jahr2 == 2008) {
				json = json2008;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2009) {
				json = $.concat(json2008, json2009 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json2008, json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2008, json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2008, json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2008, json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2008, json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2008, json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2009) {
			if (jahr2 == 2009) {
				json = json2009;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2010) {
				json = $.concat(json2009, json2010 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2009, json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2009, json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2009, json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2009, json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2009, json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2009, json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2010) {
			if (jahr2 == 2010) {
				json = json2010;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2011) {
				json = $.concat(json2010, json2011 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2010, json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2010, json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2010, json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2010, json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2010, json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2010, json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2011) {
			if (jahr2 == 2011) {
				json = json2011;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2012) {
				json = $.concat(json2011, json2012 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2011, json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2011, json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2011, json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2011, json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2011, json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2011, json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2012) {
			if (jahr2 == 2012) {
				json = json2012;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2013) {
				json = $.concat(json2012, json2013 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2012, json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2012, json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2012, json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2012, json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2012, json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2012, json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2013) {
			if (jahr2 == 2013) {
				json = json2013;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2014) {
				json = $.concat(json2013, json2014 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2013, json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2013, json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2013, json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2013, json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2013, json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2013, json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2014) {
			if (jahr2 == 2014) {
				json = json2014;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2015) {
				json = $.concat(json2014, json2015 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2014, json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2014, json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2014, json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2014, json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2014, json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2015) {
			if (jahr2 == 2015) {
				json = json2015;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2016) {
				json = $.concat(json2015, json2016 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2015, json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2015, json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2015, json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2015, json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2016) {
			if (jahr2 == 2016) {
				json = json2016;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2017) {
				json = $.concat(json2016, json2017 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2016, json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2016, json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2016, json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2017) {
			if (jahr2 == 2017) {
				json = json2017;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2018) {
				json = $.concat(json2017, json2018 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2017, json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2017, json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2018) {
			if (jahr2 == 2018) {
				json = json2018;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2019) {
				json = $.concat(json2018, json2019 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2018, json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2019) {
			if (jahr2 == 2019) {
				json = json2019;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
			else if (jahr2 == 2020) {
				json = $.concat(json2019, json2020 );
				rgraph.loadJSON(json, index);
				rgraph.refresh();				jsontext = JSON.stringify(json);
				console.log(jsontext);				json = jsonleer;
			}
		}
		else if (jahr1 == 2020) {
			if (jahr2 == 2020) {
				json = json2020;
				rgraph.loadJSON(json, index);
				rgraph.refresh();
				jsontext = JSON.stringify(json);
				console.log(jsontext);
				json = jsonleer;
			}
		}
	});
    
	//init data
    //If a node in this JSON structure
    //has the "$type" or "$dim" parameters
    //defined it will override the "type" and
    //"dim" parameters globally defined in the
    //RGraph constructor.
	

	$.get("json1995.js", function(response) {		json1995 = eval ("(" + response + ")");	});	$.get("json1996.js", function(response) {		json1996 = eval ("(" + response + ")");	});	$.get("json1997.js", function(response) {		json1997 = eval ("(" + response + ")");	});	$.get("json1998.js", function(response) {		json1998 = eval ("(" + response + ")");	});	$.get("json1999.js", function(response) {		json1999 = eval ("(" + response + ")");	});	$.get("json2000.js", function(response) {		json2000 = eval ("(" + response + ")");	});	$.get("json2001.js", function(response) {		json2001 = eval ("(" + response + ")");	});	$.get("json2002.js", function(response) {		json2002 = eval ("(" + response + ")");	});	$.get("json2003.js", function(response) {		json2003 = eval ("(" + response + ")");	});	$.get("json2004.js", function(response) {		json2004 = eval ("(" + response + ")");	});
	
	$.get("json2005.js", function(response) {
		json2005 = eval ("(" + response + ")");
	});
	
	$.get("json2006.js", function(response) {
		json2006 = eval ("(" + response + ")");
	});	
	$.get("json2007.js", function(response) {		json2007 = eval ("(" + response + ")");	});	
	$.get("json2008.js", function(response) {		json2008 = eval ("(" + response + ")");	});	
	$.get("json2009.js", function(response) {		json2009 = eval ("(" + response + ")");	});	
	$.get("json2010.js", function(response) {		json2010 = eval ("(" + response + ")");	});	
	$.get("json2011.js", function(response) {		json2011 = eval ("(" + response + ")");	});	
	$.get("json2012.js", function(response) {		json2012 = eval ("(" + response + ")");	});	
	$.get("json2013.js", function(response) {		json2013 = eval ("(" + response + ")");	});	
	$.get("json2014.js", function(response) {		json2014 = eval ("(" + response + ")");	});	
	$.get("json2015.js", function(response) {		json2015 = eval ("(" + response + ")");	});	
	$.get("json2016.js", function(response) {		json2016 = eval ("(" + response + ")");	});	
	$.get("json2017.js", function(response) {		json2017 = eval ("(" + response + ")");	});	
	$.get("json2018.js", function(response) {		json2018 = eval ("(" + response + ")");	});	
	$.get("json2019.js", function(response) {		json2019 = eval ("(" + response + ")");	});	
	$.get("json2020.js", function(response) {		json2020 = eval ("(" + response + ")");	});
	
	$.get("jsonleer.js", function(response) {		jsonleer = eval ("(" + response + ")");	});
	
	//{ JSONALL
	jsonall = [
		// ----- RAPPER -----
		// MAECKES
		{
			"id": "Maeckes",
			"name": "Maeckes",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "Gerard",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Laas Unltd.",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Edgar Wasser",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Bartek",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "true",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kaas",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Tua",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Marteria",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Enoq",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Fatoni",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kool Savas",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Vega",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Germany",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Phreaky Flave",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jifusi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Franky Kubrick",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kid Kobra",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Ercandize",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "MoTrip",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Caput",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Favorite",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Olli Banjo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Amar",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Affenboss",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Biztram",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Casper",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "E-Rich",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Marsimoto",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "JAW",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				
			]
		},
		// BARTEK
		{
			"id": "Bartek",
			"name": "Bartek",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "Palina Power",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kool Savas",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Vega",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Germany",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Phreaky Flave",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jifusi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Franky Kubrick",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kid Kobra",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Ercandize",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "MoTrip",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Caput",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Favorite",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Olli Banjo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Amar",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Maeckes",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "true",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Denyo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "ASD",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jan Delay",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Megaloh",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Laas Unltd.",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sido",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Cro",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Celo & Abdi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008":
"false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Prinz Pi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Afrob",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Teesy",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
			]
		},
		// EDGAR WASSER
		{
			"id": "Edgar Wasser",
			"name": "Edgar Wasser",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "Johnny Rakete",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Morlockk Dilemma",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Marz",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "LUX",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "true",
						"$2014": "true",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Cap Kendricks",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Juse Ju",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Gossenboss mit Zett",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Tufu",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Fatoni",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "true",
						"$2014": "true",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sickless",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Dobbo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Emkay",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Weekend",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "true",
						"$2014": "true",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "E-Rich",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Maeckes",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "3Plusss",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Slowy",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Dr. Lucs",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jay",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Prezident",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Schote",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
			]
		},
		// WEEKEND
		{
			"id": "Weekend",
			"name": "Weekend",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "3Plusss",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "257ers",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "4Tune",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Alligatoah",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Arbok48",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "AudioMax",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Battleboi Basti",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "true",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Crystal F",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Daniel Gun",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Djin",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Dobbo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "true",
						"$2013": "true",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Donetasy",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Duzoe",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Edgar Wasser",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "true",
						"$2014": "true",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Emkay",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "true",
						"$2013": "true",
						"$2014": "true",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Fatoni",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "FiST",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Gold Roger",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Großmaul",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Illoyal",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jephza",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Johnzen",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kaas",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kex Kuhl",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Laca",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Lakmann",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Lance Butters",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Mach One",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Marz",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Meister Elch",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Mikzn 70",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Milo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Mr. Mike",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Naya Isso",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Nikiz",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Olson",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Pat Riot",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Patrick mit Absicht",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Pimf",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Rako",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Rockstah",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Schote",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Schwartz",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Serious Dan",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sickless",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sido",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sime",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Spello",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sudden",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Timi Hendrix",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Veedel Kaztro",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
			]
		},
		// KAAS
		{
			"id": "Kaas",
			"name": "Kaas",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "Amar",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Bartek",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Caput",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Curse",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Dervizz",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Ercandize",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Favorite",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Fiva",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Franky Kubrick",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Germany",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jifusi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kid Kobra",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kitty Kat",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kool Savas",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "true",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Laas Unltd.",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "MoTrip",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Olli Banjo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Patrick mit Absicht",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Phreaky Flave",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Schwesta Ewa",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sinan",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Tone",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Tua",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Vega",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Wandam",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
			]
		},
		// FATONI
		{
			"id": "Fatoni",
			"name": "Fatoni",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "3Plusss",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Audio88",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Audio88 & Yassin",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Danger Dan",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Dexter",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Edgar Wasser",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "true",
						"$2014": "true",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Enoq",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Felix Brummer",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Johnny Rakete",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Juse Ju",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Koljah",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kryptik Joe",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "LUX",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Maeckes",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Marz",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Panik Panzer",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sir Serch",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
			]
		},
		// ALLIGATOAH
		{
			"id": "Alligatoah",
			"name": "Alligatoah",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "ATM",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Arbok48",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "AudioMax",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Battleboi Basti",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Blumentopf",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Crystal F",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Curse",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Daniel Gun",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Dendemann",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Dima Richman",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "DNP",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Dude",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "G-o'style",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "HD",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Hassler Scrub",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Illoyal",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jamal",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jan Böhmermann",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jan Delay",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Johnzen",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "King Malice",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kollegah",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "MC Alfredo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "MC Komplex",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Meister Elch",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Mighty Morris",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Morlockk Dilemma",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Nikiz",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Olson",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Paff Meisi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "ParaDogg",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Patrick mit Absicht",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Philliz",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Pimpulsiv",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Prayamond",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Prinz Pi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Rako",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Rockstah",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Samy Deluxe",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Schwartz",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Selbstjustizz",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Serious Dan",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Shneezin 257",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sime",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Smudo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Snew",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Spello",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Spittfaia",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sudden",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Talent",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Testo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Timi Hendrix",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "true",
						"$2014": "true",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Tobi-Tait",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "true",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Weekend",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
			]
		},
		// K.I.Z.
		{
			"id": "K.I.Z.",
			"name": "K.I.Z.",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "Akes",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Atek",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Audio88 & Yassin",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Basstard",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Boba Fettt",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Bärbel",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kannibal Rob",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Casper",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Corus 86",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Defi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Drama Kuba",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Felix Brummer",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Flexis",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Frauenarzt",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jan Delay",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jesse MC",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jimi Blu",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "June",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kalusha",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "King Orgasmus One",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "MC Bogy",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "MC Bomber",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "MC Motherfucker",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Mach One",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Manny Marc",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Massimo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Mo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Mr. Hyde",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Reko MC",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Rhymin Simon",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Said",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Schnicki Schnacki Schnura",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Shacke One",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sido",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Smoky",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Spleen",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Tony D",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Tua",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Vork",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Wilson Gonzales",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
			]
		},
		// TUA
		{
			"id": "Tua",
			"name": "Tua",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "Amar",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Bartek",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Chakuza",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Chefket",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Curse",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "D-Bo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Emory",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Ercandize",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Fiva",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Franky Kubrick",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "JokA",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "K.I.Z.",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kaas",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kitty Kat",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Kool Savas",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Maeckes",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "MoTrip",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Mädness",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Patrick mit Absicht",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Samy Deluxe",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Silla",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sinan",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sucuk Ufuk",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Tarek K.I.Z.",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Tone",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Vasee",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Vega",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
			]
		},
		/*// CRO
		{
			"id": "Cro",
			"name": "Cro",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "Danju",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "true",
						"$2011": "true",
						"$2012": "true",
						"$2013": "true",
						"$2014": "true",
						"$2015": "true",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Haftbefehl",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Marteria",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Jan Delay",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Max Herre",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Bizzy Bernhard",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Die Orsons",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Teesy",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "true",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Ahzumjot",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Rockstah",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				
				{
					"nodeTo": "Casper",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Sido",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "MoTrip",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Celo & Abdi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Prinz Pi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Afrob",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Olli Banjo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Bartek",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Megaloh",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
				{
					"nodeTo": "Capo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
			]
		},
		// KOLLEGAH
		{
			"id": "Kollegah",
			"name": "Kollegah",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "Favorite",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "true",
						"$2008": "true",
						"$2009": "true",
						"$2010": "true",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "DeineLtan",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Farid Bang",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "true",
						"$2011": "true",
						"$2012": "true",
						"$2013": "true",
						"$2014": "true",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Casper",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "true",
						"$2007": "false",
						"$2008": "true",
						"$2009": "true",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Haftbefehl",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Hollywood Hank",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Sahin",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Toony",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Bass Sultan Hengzt",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Tarek K.I.Z.",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "K.I.Z.",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Slick One",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "true",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Ol Kainry",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Sun Diego",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "true",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Locke",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "John Webber",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "true",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "The Game",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Mr. Chissmann",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Shiml",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "true",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Sarah",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "true",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Prinz Harry",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Seyed",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Massiv",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "true",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Ali As",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "true",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Genetikk",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Karate Andi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "SSIO",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Bushido",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Majoe",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "KC Rebell",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Jason",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Marsin",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "true",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Morbid",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Animus",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Sinan-G",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "true",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Migo",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Affenboss",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Summer Cem",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Fard",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Eurogang",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Sunshine Boy",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Snaga",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Celo & Abdi",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Marsimoto",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Get No Sleep Collective",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Sensation",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Aleks M.",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "true",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Jewlz da Hoodwatcha",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Al-Gear",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Koree",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Amok & Omega",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Prinz Porno",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Mr. Da-Nos",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Alexis Troy",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "true",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Shindy",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "RAF Camora",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "true",
						"$2011": "false",
						"$2012": "false",
						"$2013": "true",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Too $hort",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Problem",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Eric Bellinger",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Die Götzfried Girls",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "true",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "Baenkhog",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
				{
					"nodeTo": "DJ Crest",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "true",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",

					}
				},
			]
		},
		*/
		// ALPA GUN
		{
			"id": "Alpa Gun",
			"name": "Alpa Gun",
			"data": {
				"some other key": "some other value"
			},
			"adjacencies": [
				{
					"nodeTo": "Sido",
					"data": {
						"$lineWidth": 1.1,
						"$1995": "false",
						"$1996": "false",
						"$1997": "false",
						"$1998": "false",
						"$1999": "false",
						"$2000": "false",
						"$2001": "false",
						"$2002": "false",
						"$2003": "false",
						"$2004": "false",
						"$2005": "false",
						"$2006": "false",
						"$2007": "false",
						"$2008": "false",
						"$2009": "false",
						"$2010": "false",
						"$2011": "false",
						"$2012": "false",
						"$2013": "false",
						"$2014": "false",
						"$2015": "false",
						"$2016": "false",
						"$2017": "false",
						"$2018": "false",
						"$2019": "false",
						"$2020": "false",
					}
				},
			]
		},
	];
	//}
	
    //end
    //init RGraph
    var rgraph = new $jit.RGraph({
      'injectInto': 'infovis',
      //Optional: Add a background canvas
      //that draws some concentric circles.
      'background': {
        'CanvasStyles': {
          'strokeStyle': '#555',
        }
      },
	  'width': 2500,
	  'height': 2500,
	  'left': '-20%',
	  Navigation: {
	  'enable': true,
	  'panning': true,
	  'zooming': 20,
	  
	  },
        //Nodes and Edges parameters
        //can be overridden if defined in 
        //the JSON input data.
        //This way we can define different node
        //types individually.
        Node: {
            'overridable': true,
			 'alpha': 1,
			 'dim': 0,
			 'width': 0,
			 'height': 0,
        },
        Edge: {
            'overridable': true,
            'color': 'rgba(41, 41, 41, 0.5)',
			'type': 'line',
			'lineWidth': 0.3,
        },
		Label: {
            'overridable': true,
			'type': 'HTML',
        },
		NodeStyles: {  
			'enable': true,
			'type': 'HTML',
			'stylesHover': {
			'color': '#ffffff',
		},  
		duration: 600
		},
        //Set polar interpolation.
        //Default's linear.
        interpolation: 'polar',
        //Change the transition effect from linear
        //to elastic.
        transition: $jit.Trans.linear,
        //Change other animation parameters.
        duration: 2000,
        fps: 30,
        //Change father-child distance.
        levelDistance: 200,
        //This method is called right before plotting
        //an edge. This method is useful to change edge styles
        //individually.
        onBeforePlotLine: function(adj, node) {
            if (node._depth===0) {  
                adj.data.$color = "rgba(255, 20, 100, 1)";  
                adj.data.$lineWidth = 2;  
            }
			else if (adj.nodeFrom._depth===1 && adj.nodeTo._depth===0) {
				adj.data.$color = "rgba(255, 20, 100, 1)";  
                adj.data.$lineWidth = 2;  
			}
			else if (adj.nodeFrom._depth===1 && adj.nodeTo._depth===1) {
				adj.data.$color = "rgba(153, 167, 238, 0.5)";
				adj.data.$lineWidth = 1.5;
			}
			else if (node._depth>=2 && adj.nodeTo._depth>=3) {
				adj.data.$color = "rgba(41, 41, 41, 0.2)";
				adj.data.$lineWidth = 0.2;
			}
			else if (node._depth===3 && adj.nodeTo._depth===2) {
				adj.data.$color = "rgba(41, 41, 41, 0.2)";
				adj.data.$lineWidth = 0.2;
			}
			else {  
                delete adj.data.$color;  
                delete adj.data.$lineWidth;  
            } 
		},
		onAfterPlotLine: function(adj) {
		
		},
		onBeforePlotNode: function(node){  
			//add some color to the nodes in the path between the  
			//root node and the selected node.  
			if (node.selected) {  
				node.data.$color = "#ff7";  
			}  
			else {  
				delete node.data.$color;  
				//if the node belongs to the last plotted level  
				if(!node.anySubnode("exist")) {  
					//count children number  
					var count = 0;  
					node.eachSubnode(function(n) { count++; });  
					//assign a node color based on  
					//how many children it has  
					node.data.$color = ['#aaa', '#baa', '#caa', '#daa', '#eaa', '#faa'][count];
				}  
			}  
		}, 
        onBeforeCompute: function(node){
            Log.write("alpha log: centering " + node.name + "...");
			
			
			//--------------------------------------------------
			// NACH ZEITRAUMAUSWAHL GLEICHE NODE ZENTRIEREN:
			function findWithAttr(array, attr, value) {
				for(var i = 0; i < array.length; i += 1) {
					if(array[i][attr] === value ) {
						return i;
					}
				}
			}
			
			index = findWithAttr(jsonall, "id", node.id);
			//--------------------------------------------------
            
			
            //Make right column relations list.
			var html = "<img style='width: 100px;' src='/pumpn/mag/images/" + node.id + ".jpg'></img>";
            html += "<h4 id='title'>" + node.name + "</h4><b>Kollaborationen:</b>";
            html += "<ul id='myUL' style='margin-left: -20px;'>";
            node.eachAdjacency(function(adj){
                var child = adj.nodeTo;
                html += "<li>" + child.name + "</li>";
            });
            html += "</ul>";
            $jit.id('inner-details').innerHTML = html;
			
			var mylist = $('#myUL');
			var listitems = mylist.children('li').get();
			listitems.sort(function(a, b) {
			   return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
			})
			$.each(listitems, function(idx, itm) { mylist.append(itm); });
        },
        //Add node click handler and some styles.
        //This method is called only once for each node/label crated.
		onCreateLabel: function(domElement, node){
            domElement.innerHTML = node.name;
            domElement.onclick = function () {
                rgraph.onClick(node.id, { 
                    hideLabels: false,
                    onComplete: function() {
                        Log.write("alpha log: done");
                    }
                });
            };
            var style = domElement.style;
            style.cursor = 'pointer';
			
			var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / (Math.random() * 5) + 2) + 'px';
			var top = parseInt(style.top);
            style.top = (top - (Math.random() * 5) + 17) + 'px';
        },
        //This method is called when rendering/moving a label.
        //This is method is useful to make some last minute changes
        //to node labels like adding some position offset.
        onPlaceLabel: function(domElement, node){
			node.eachAdjacency(function(adj){
				jahrout = adj.data.$2010;
			});
            var style = domElement.style;
            var left = parseInt(style.left);
            var w = domElement.offsetWidth;
            style.left = (left - w / 2) + 'px';
			var top = parseInt(style.top);
            style.top = (top - 17) + 'px';
			if (node._depth == 0) {
				style.fontSize = '16px';
			} else if(node._depth == 1){
				style.fontSize = '12px';
			} else if(node._depth == 2){
				style.fontSize = '8px';
			} else {
				style.display = 'none';
				var stype = $jit.id('select-type-remove-nodes');
			}
        }
    });
    //load graph.
    rgraph.loadJSON(jsonall, index);
    
    //compute positions and plot
    rgraph.refresh();
    //end
    rgraph.controller.onBeforeCompute(rgraph.graph.getNode(rgraph.root));
    Log.write('alpha log: done');
};