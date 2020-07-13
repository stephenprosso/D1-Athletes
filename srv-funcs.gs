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
function getTableData(eventId) {
 
 //var eventId = 1;
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Data");
  var data = ws.getRange(2, 1, ws.getLastRow() - 1, 8).getDisplayValues();
  //Logger.log(data);
  data = data.filter(function (r) {
    return r[7] == eventId.custID;
  });
  Logger.log("data : " + data);
  return data;

}

//**** EVENT DETAILS JS FUNCTION ****//
function getTableTitle(ev) {


  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Events");
  var data = ws.getRange(2, 1, ws.getLastRow() - 1, 4).getValues();

  var gridTitleArray = data.filter(function (r) { return r[0] == ev; }).map(function (r) {
    var dateText = r[3].toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    var displayDateArray = dateText.split(' ');
    //Logger.log(displayDateArray);
    var displayDate = displayDateArray[0] + ' ' + displayDateArray[1] + ' ' + displayDateArray[2];
    return r[2] + " @ " + r[1] + " - " + displayDate

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

