function addAthlete(athleteInfo) {

  const ss = SpreadsheetApp.openByUrl(url);
  const ws = ss.getSheetByName("Data");
  const ids = ws.getRange(2, 1, ws.getLastRow() - 1, 1).getValues().map(r => r[0]);
  const maxID = Math.max.apply(null, ids);
  const newId = maxID + 1;
  ws.appendRow([newId, athleteInfo.firstName, athleteInfo.lastName, athleteInfo.phone]);

}

function getEventTableData() {

  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Events");
  var data = ws.getRange(2, 1, ws.getLastRow() - 1, 5).getDisplayValues();
  Logger.log(data);
  return data;

}

//**** EVENT DETAILS JS FUNCTION ****//
function getTableData(e) {
 
 //var eventId = 1;
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Data");
  var data = ws.getRange(2, 1, ws.getLastRow() - 1, 8).getDisplayValues();
  //Logger.log(data);
  data = data.filter(function (r) {
    return r[7] == e.eventID;
  });
  Logger.log("data : " + data);
  return data;

}

//**** EVENT DETAILS JS FUNCTION ****//
function getTableTitle(e) {


  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Events");
  var data = ws.getRange(2, 1, ws.getLastRow() - 1, 4).getValues();

  var gridTitleArray = data.filter(function (r) { return r[0] == e.eventID; }).map(function (r) {
    var dateText = r[3].toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    var displayDateArray = dateText.split(' ');
    //Logger.log(displayDateArray);
    var displayDate = displayDateArray[0] + ' ' + displayDateArray[1] + ' ' + displayDateArray[2];
    return r[2] + " @ " + r[1] + " - " + displayDate;

  });

  Logger.log(gridTitleArray);
  return gridTitleArray;

}

function updateRecordById(recordInfo) {
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Data");
  var ids = workSheet.getRange(2, 1, workSheet.getLastRow() - 1, 1).getValues().map(function (r) { return r[0] });
  var positionInArray = ids.indexOf(parseInt(recordInfo.id));
  var rowNumber = positionInArray === -1 ? 0 : positionInArray + 2;
  var oldTimeData = workSheet.getRange(rowNumber, 6).getValue();
  var checkInDate;

  if (recordInfo.checkInState) {
    checkInDate = oldTimeData == "" ? new Date() : oldTimeData;
  } else {
    checkInDate = "";
  }
  var newTimeData = [checkInDate, recordInfo.checkInState];
  workSheet.getRange(rowNumber, 6, 1, 2).setValues([newTimeData]);
  return workSheet.getRange(rowNumber, 6, 1, 2).getDisplayValues()[0];

}
/*function getEventID(e) {
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Events");
  var 

} */

function loadEditList() {
  
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var options = list.map(function(r){return '<option>' + r[0] + '</option>'; }).join('');  
  
  var eventws = spreadSheet.getSheetByName("Event");
  var eventList = eventws.getRange(2,1,eventws.getLastRow()-1,4).getValues();
 
  // var eventList = eventws.getRange(2,1,workSheet.getRange("A2").getDataRegion().getLastRow(),4).getValues();
  
  var htmlEventListArray = eventList.map(function(r){return '<option value=\"' + r[0] + '\">'+ r[2] + ' @ '+ r[1] +'</option>'; }).join('');  
  //var htmlEventListArray = eventList.map(function(r){return '<option>'+ ' ' + r[0] + ' ' + r[1] + ' '+ r[2] +' '+ r[3] + '</option>'; }).join('');  
  //var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
  
  Logger.log(options);
  //the eID was passed to loadEditlist as params. dropped that and pulled it from the query string
  // return render("EditList", {list: htmlListArray, eID: params.event})

  return render("EditList", {list: options })

}

