/*({    invoke : function(component, event, helper) {
  // Get the record ID attribute
  var record = component.get("v.recordId");
   console.log('Record: ' + record);
  
  // Get the Lightning event that opens a record in a new tab
  var redirect = $A.get("e.force:navigateToSObject");
  console.log('redirect: ' + redirect);
  // Pass the record ID to the event
  redirect.setParams({
     "recordId": record
  });
       
  // Open the record
  redirect.fire();
}}) */

({
   invoke : function(component) {
       let workspaceAPI = component.find("workspace");
       let record = component.get("v.recordId");
       workspaceAPI.openTab({
           recordId: record,
           focus: true
       }).then(function(response) {
           workspaceAPI.getTabInfo({
                 tabId: response
           }).then(function(tabInfo) {
           console.log("The url for this tab is: " + tabInfo.url);
           });
       })
       .catch(function(error) {
              console.log(error);
       });
   }
})