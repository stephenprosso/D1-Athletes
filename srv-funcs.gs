function getEventTableData() {

  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Events");
  var data = ws.getRange(2, 1, ws.getLastRow() - 1, 5).getDisplayValues();
  Logger.log(data);
  return data;

}

//**** EVENT DETAILS JS FUNCTION ****//
function getTableInfo(e){
  
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Events");
  var data = ws.getRange(2, 1, ws.getLastRow() - 1, 4).getValues();

   var gridTitleArray = data.filter(r => r[0] == e.eventID ).map(function (r) {
    var dateText = r[3].toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    var displayDateArray = dateText.split(' ');
    //Logger.log(displayDateArray);
    var displayDate = displayDateArray[0] + ' ' + displayDateArray[1] + ' ' + displayDateArray[2];
    return r[2] + " @ " + r[1] + " - " + displayDate;

  });

  var wsdata = ss.getSheetByName("Data");
  var guests = wsdata.getRange(2, 1, wsdata.getLastRow() - 1, 8).getDisplayValues();
  //Logger.log(data);
  guests = guests.filter(function (r) {
    return r[7] == e.eventID;
  });

  return {title: gridTitleArray, guests: guests};
  
  
}

//**** EVENT DETAILS JS FUNCTION ****//
/* function getTableData(e) {
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

function getTableTitle(e) {
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Events");
  var data = ws.getRange(2, 1, ws.getLastRow() - 1, 4).getValues();

  // var gridTitleArray = data.filter(function (r) { return r[0] == e.eventID; }).map(function (r) {
  var gridTitleArray = data.filter(r => r[0] == e.eventID ).map(function (r) {
    var dateText = r[3].toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    var displayDateArray = dateText.split(' ');
    //Logger.log(displayDateArray);
    var displayDate = displayDateArray[0] + ' ' + displayDateArray[1] + ' ' + displayDateArray[2];
    return r[2] + " @ " + r[1] + " - " + displayDate;

  });

  Logger.log(gridTitleArray);
  return gridTitleArray;

} */

function updateRecordById(recordInfo) {
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Data");
  var ids = workSheet.getRange(2, 1, workSheet.getLastRow() - 1, 1).getValues().map(r => r[0]);
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
//this isnt working. need help
function loadOptions() {

  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("CredType");
  return workSheet.getRange(1, 1, workSheet.getRange("A1").getDataRegion().getLastRow(), 1).getValues();

}

function addMultiNames(dataArray) {

  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Data");
  var ids = workSheet.getRange(2, 1, workSheet.getLastRow() - 1, 1).getValues().map(r => r[0]);

  //find the max id from this list
  var maxID = Math.max.apply(null, ids);
  var newID = maxID + 1;
  dataArray.forEach(function (r) {

    workSheet.appendRow([newID, r[0], r[1], r[2], r[3], r[4], r[5], r[6]]);
    newID++;


  });

}

function addEvent(userInfo){

  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Events");
  var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(r => r[0]);
  
  //find the max id from this list
  var maxID = Math.max.apply(null,ids);
  var newID = maxID+1;

  workSheet.appendRow([newID,userInfo.vname,userInfo.ename,userInfo.sdate,userInfo.eimage]);
  

}

function deleteEventById(recordInfo){
  //var recordInfo = {id: 5};
  var id = parseInt(recordInfo.id); //converting text ids to number ids
  var spreadSheet = SpreadsheetApp.openByUrl(url); //get spreadsheet
  var wsData = spreadSheet.getSheetByName("Data"); //get worksheet for guests
  var guestData = wsData.getRange(2,1,wsData.getLastRow()-1,8).getValues(); //get array of guests
  var wsEvent = spreadSheet.getSheetByName("Events"); //get event data
  //intially this is what it looks like
  //[ 1,stephen,rosso,god pass,organization, eventID] 
  //[ 1,stephen,rosso,god pass,organization, eventID] r.concat adds extra column for index to existing array
  var matchingEvents = guestData.map(function(r,i){ 
     return r.concat([i]);
  }).filter(function(r){ //filter the results and keep the records where eventID matches event ID
    return r[7] === id;  // the index is on the last column.
  });
  var matchingGuestRows = matchingEvents.map(function(r){ //only return the information needed- the index
     return r[8]+2; // add 2 becasue we have 1 line of static information
  }); //[1,5,9] 
  for (var i = matchingGuestRows.length -1; i>=0; i--){ //loop through the aray from bottom to top to find the matching guest. start with -1 to get to the last element
          wsData.deleteRow(matchingGuestRows[i]); //delete the row number which is i inside  matchingGuestRows
       }
  Logger.log(matchingGuestRows);
  
 var ids = wsEvent.getRange(2, 1,wsEvent.getLastRow()-1,1).getValues().map(function(r){return r[0]}); //get the id of the event
 
 var positionInArray =  ids.indexOf(id); //get the index position 
 var rowNumber = positionInArray === -1 ? 0 : positionInArray +2; //again add 2 to index to get the row number
  
 wsEvent.deleteRow(rowNumber); // delete the row number
}

function deleteRecordById(recordInfo){
Logger.log(recordInfo);
 var spreadSheet = SpreadsheetApp.openByUrl(url);
 var workSheet = spreadSheet.getSheetByName("Data");
 var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
 
 var positionInArray =  ids.indexOf(parseInt(recordInfo.id));
 var rowNumber = positionInArray === -1 ? 0 : positionInArray +2;
  
  workSheet.deleteRow(rowNumber);
}

