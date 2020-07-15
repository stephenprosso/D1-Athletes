
var url ="https://docs.google.com/spreadsheets/d/1-6UatdMa_6eXjhzZ-h5Pw2IcjBp_542uNyeIHyjMBfI/edit#gid=0";
var Route = {};
Route.path = function(route,callback){
   Route[route] = callback;
}


function doGet(e) {
  //this BS is for google auth2 tokens
 /* if(e.parameters.token) {

      if(!acceptToken(e.parameters.token[0])) {
     
      return render("login");  
   }
 } else {
  
     return render("login");
 }*/
  Route.path("addGuest",loadAddGuest);
  Route.path("listDetail",loadListDetail);
  Route.path("editList",loadEditList);
  Route.path("addEvent", loadAddEvent);
  Route.path("cardView", loadCardView);
  Route.path("Dashboard", loadDashboard);
  //this BS is for google auth2 tokens
  //Route.path("login", loadLogin);
  var params = Object.keys(e.parameters).filter(function(p){return p != "v"});
  
  var viewParameters = {};
  params.forEach(function(p){
  
    viewParameters[p] = e.parameters[p];
  
  });
  if(Route[e.parameters.v]) {
    if(params.length == 0){
     return Route[e.parameters.v]();
    
    } else {
      return Route[e.parameters.v](viewParameters);
    }
  
  }else {
   return render("DashCardView");
  }
}

function loadAddGuest() {
  
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var htmlListArray = list.map(function(r){return '<option>' + r[0] + '</option>'; }).join('');  
  
  var eventws = spreadSheet.getSheetByName("Event");
  var eventList = eventws.getRange(2,1,eventws.getLastRow()-1,4).getValues();
 
  // var eventList = eventws.getRange(2,1,workSheet.getRange("A2").getDataRegion().getLastRow(),4).getValues();
  
  var htmlEventListArray = eventList.map(function(r){return '<option value=\"' + r[0] + '\">'+ r[2] + ' @ '+ r[1] +'</option>'; }).join('');  
  //var htmlEventListArray = eventList.map(function(r){return '<option>'+ ' ' + r[0] + ' ' + r[1] + ' '+ r[2] +' '+ r[3] + '</option>'; }).join('');  
  //var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
  
  Logger.log(htmlEventListArray);
  return render("AddGuest", {list: htmlListArray, glist: htmlEventListArray })

}

function loadListDetail(params) {  
  console.log(params);
  return render("ListDetail");
  
  
}

function loadCardView() {  
  
  return render("DashCardView");
  
  
}
function loadDashboard() {  
  
  return render("Dashboard");
  
  
}

 //this BS is for google auth2 tokens
/*function loadLogin() {  
  
  return render("login");
  
}*/

function loadAddEvent() {
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Event");
 // var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();
 // var htmlListArray = list.map(function(r){return '<option>' + r[0] + '</option>'; }).join('');  
  
  
  return render("AddEvent");
}


//new function below to replace the function above
//was passing params but pulled it from below
function loadEditList() {
  
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var htmlListArray = list.map(function(r){return '<option>' + r[0] + '</option>'; }).join('');  
  
  var eventws = spreadSheet.getSheetByName("Event");
  var eventList = eventws.getRange(2,1,eventws.getLastRow()-1,4).getValues();
 
  // var eventList = eventws.getRange(2,1,workSheet.getRange("A2").getDataRegion().getLastRow(),4).getValues();
  
  var htmlEventListArray = eventList.map(function(r){return '<option value=\"' + r[0] + '\">'+ r[2] + ' @ '+ r[1] +'</option>'; }).join('');  
  //var htmlEventListArray = eventList.map(function(r){return '<option>'+ ' ' + r[0] + ' ' + r[1] + ' '+ r[2] +' '+ r[3] + '</option>'; }).join('');  
  //var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
  
  Logger.log(htmlEventListArray);
  //the eID was passed to loadEditlist as params. dropped that and pulled it from the query string
  // return render("EditList", {list: htmlListArray, eID: params.event})

  return render("EditList", {list: htmlListArray })

}




