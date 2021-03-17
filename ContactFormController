({
	clickCreate: function(component, event, helper) {
        let validContact = component.find('contactform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validContact){
            let newContact = component.get("v.newContact");
            console.log("Create Contact: " + JSON.stringify(newContact));
            helper.createContact(component, newContact);
        }
    },
})
