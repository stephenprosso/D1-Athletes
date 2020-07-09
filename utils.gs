function include(filename,params) {
  var paramsToUse = typeof params === 'undefined' ? {} : params;
//file name is passed to the html service and we get the content of the file
  var template = HtmlService.createTemplateFromFile(filename);
  template.params = paramsToUse;
  return template.evaluate().getContent();
  

}
//THIS FUNCTION RENDERS THE CORRECT ROUTE AKA PAGE TP YOUR SCREEN
function render(file,argsObject) {

  var tmp = HtmlService.createTemplateFromFile(file);
  if(argsObject){
  var keys = Object.keys(argsObject);
   
    keys.forEach(function(key){
      tmp[key] = argsObject[key];
    
    });
  }//END IF
  return tmp.evaluate();
  //return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


//YOU WANT TO LOAD PARTIALS DONT YOU??
function loadPartialHTML_(partial) {
  
  const htmlServ = HtmlService.createTemplateFromFile(partial);
  return htmlServ.evaluate().getContent();
  
}

function loadAddAthleteView(){

  return loadPartialHTML_("addathlete");
}

function loadSearchView(){

  return loadPartialHTML_("search");
}

function loadEventsView(){

  return loadPartialHTML_("events");
}