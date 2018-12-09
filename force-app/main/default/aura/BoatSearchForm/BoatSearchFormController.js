({
	 // Load boatTypes from Salesforce
	 doInit: function (component, event, helper) {
		var createRecordEnabled = $A.get("e.force:createRecord");
        if(createRecordEnabled){
            component.set("v.renderNewButton",true);
        } 
        // Create the action
        var action = component.get("c.getBoatTypes");
        // Add callback behavior for when response is received
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.boatTypes", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
	},
	
	createNewBoat: function (component, event, helper) {
		var createBoat = component.getEvent("createBoat");
		var boatypeID = component.get("v.selectedBoatType")
		createBoat.setParams({ "boatType": boatypeID });
		createBoat.fire();

	},
	handleCreateBoatEvent: function (component, event, helper) {
		var boatType = event.getParam("boatType");
		var createRecordEvent = $A.get("e.force:createRecord");
		createRecordEvent.setParams({
			"entityApiName": "Boat__c"
		});
		if (!boatTypeId == "") {
			createNewBoat.setParams({
				"defaultFieldValues": { 'BoatType__c': boatType }
			})
		}
		createRecordEvent.fire();
	}
})