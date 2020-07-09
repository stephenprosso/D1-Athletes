function addCustomer(customerInfo){
    const ss = SpreadsheetApp.openByUrl(url);
    const ws = ss.getSheetByName("Data");  
    const ids =ws.getRange(2, 1,ws.getLastRow()-1,1).getValues().map( r => r[0]);
    const maxID = Math.max.apply(null,ids);
    const newId = maxID+1;  
  ws.appendRow([newId,customerInfo.firstName,customerInfo.lastName,customerInfo.phone]);
}
