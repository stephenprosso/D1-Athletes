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

