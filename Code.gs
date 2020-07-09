var url ="https://docs.google.com/spreadsheets/d/1jhtlaNRYdGdr0dRVzMM1xlV_9YD4DbdOtF67lypVGYg/edit#gid=0";
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