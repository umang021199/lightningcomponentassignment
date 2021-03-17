({
    createContact: function(component, contact) {
        this.saveContact(component, contact, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
                let c = component.get("v.contacts");
                c.splice(0, 0, response.getReturnValue()); 
                component.set("v.contacts", c);
            }
        });
    },
    updateContact: function(component, contact) {
        this.saveContact(component, contact);
    },
    saveContact: function(component, contact, callback) {
        let action = component.get("c.saveContact");
        action.setParams({
            "contact": contact
        });
        if (callback) {
            action.setCallback(this, callback);
        }
        $A.enqueueAction(action);
    },
})
