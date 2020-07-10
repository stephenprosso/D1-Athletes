function addAthlete(athleteInfo){
    const ss = SpreadsheetApp.openByUrl(url);
    const ws = ss.getSheetByName("Data");  
    const ids =ws.getRange(2, 1,ws.getLastRow()-1,1).getValues().map( r => r[0]);
    const maxID = Math.max.apply(null,ids);
    const newId = maxID+1;  
  ws.appendRow([newId,athleteInfo.firstName,athleteInfo.lastName,athleteInfo.phone]);
}

function getEventTableData() {
  
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Events");
  var data = ws.getRange(2,1,ws.getLastRow()-1,5).getDisplayValues();
  Logger.log(data);
  return data;

}

//**** EVENT DETAILS JS FUNCTION ****//
function getTableData(ev) {

     var ss = SpreadsheetApp.openByUrl(url);
     var ws = ss.getSheetByName("Copy of Data");
     //4.//the get range is 7 and will need to be changed to 8 to the 8th column that was added
     //remember that the range starts at column 1 not 0
     var data = ws.getRange(2,1, ws.getLastRow() -1, 8).getDisplayValues();

     //5. //var data = ws.getRange(2,1, ws.getLastRow() -1, 7).getDisplayValues();
    data = data.filter(function(r){
    //6. //in this filter function we need the  column in javascript which starts at 0
    //6. //the 6 needs to be changed to a 7
    return r[7] == ev;
     //old line//return r[6] == ev;
  
  });
     Logger.log("data : " + data);
     return data;
}

//**** EVENT DETAILS JS FUNCTION ****//
function getTableTitle(ev) {
 //ev = 7;
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Event");
  var data = ws.getRange(2,1, ws.getLastRow() - 1,4).getValues();  
  //var gridTitleArray = data.filter(function(r){return r[0] == ev;}).map(function(r){return r[2] + " @ " + r[1] + " - " + r[3]});
  
  
  
  //May 1, 2020 12:00:00 AM PDT
  //[May,1, 2020, 12:00:00,AM,PDT]
  
  var gridTitleArray = data.filter(function(r){return r[0] == ev;}).map(function(r){
    
        var dateText = r[3].toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        var displayDateArray = dateText.split(' ');
     //Logger.log(displayDateArray);
        var displayDate = displayDateArray[0] + ' ' + displayDateArray[1] + ' ' + displayDateArray[2];
        
    
    return r[2] + " @ " + r[1] + " - " + displayDate});

  Logger.log(gridTitleArray);
  return gridTitleArray;
   
}

