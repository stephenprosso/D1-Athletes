var url ="https://docs.google.com/spreadsheets/d/1jhtlaNRYdGdr0dRVzMM1xlV_9YD4DbdOtF67lypVGYg/edit#gid=0";

function doGet(e) {

   //return HtmlService.createTemplateFromFile("index").evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return HtmlService.createTemplateFromFile("index").evaluate();
  
}