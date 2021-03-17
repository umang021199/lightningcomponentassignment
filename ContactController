({
	doInit: function(component, event, helper) {
        let action = component.get("c.pagination");
        action.setParams({
            "pageNumber": 1,
            "pageSize": 10
        });
        action.setCallback(this, function(result) {
            let state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                component.set("v.contacts", resultData.contactList);
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
    },
    handleUpdateContact: function(component, event, helper) {
        let updatedCon = event.getParam("contact");
        helper.updateContact(component, updatedCon);
    },
    handleCreateContact: function(component, event, helper) {
        let newContact = event.getParam("contact");
        helper.createContact(component, newContact);
    },
})
