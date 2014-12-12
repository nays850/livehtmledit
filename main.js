 var editor;
   var viewer;
   var interval;
   var currTimer;
   var xrequest = new XMLHttpRequest();
   
   window.onload = function(){
    editor = document.getElementById("editor");
    viewer = document.getElementById("view");
    interval = 3;
    currTimer = timer();
    readFile();
   }
   
   function readEditor(){
    var text = editor.value;
    return text;
   }
   
   function writeEditor(text){
    editor.value = text;
   }
   
   function readFile(){
   var params = "type=read" + "&newText=null";
  
   xrequest.onreadystatechange = function(){
    	if(xrequest.readyState == 4 && xrequest.status == 200) {
				var resp = xrequest.responseText;
				writeEditor(resp);
		}
    }; 
  
   xrequest.open("POST", "fcontrol.php", true); 
   xrequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
   xrequest.send(params);
   }
   
   function writeFile(){
    var params = "type=write"+"&newText=" + readEditor();
   
    xrequest.onreadystatechange = function(){
    	if(xrequest.readyState == 4 && xrequest.status == 200) {
				//request succeeded
		}
    };
    
 	xrequest.open("POST", "fcontrol.php", true); 
 	xrequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
 	xrequest.send(params);
 	
   }
   
   function fontResize(element){
    var newFontSize = element.value;
    editor.style.fontSize = newFontSize + "pt";
   }
   
   function intervalResize(element){
    interval = element.value;
    clearInterval(currTimer);
    currTimer = timer();
   }
   
  function timer(){
  	var timerNo = interval;
  	var thisTimer = setInterval( function(){ timerNo -= 1; 
    	document.getElementById("timer").innerHTML = timerNo;
    	if( timerNo == 0 ){
    	    writeFile();
     		viewer.contentWindow.location.reload();
     		clearInterval(thisTimer);
     		currTimer = timer();
    	}
  		}, 1000);
    return thisTimer;
 }
 
  function timerStop(){
   clearInterval(currTimer);
   currTimer = null;
   document.getElementById("timer").innerHTML = "X";
  }
  
  function timerRestart(){
   if( currTimer == null )
   		currTimer = timer();
  }
   