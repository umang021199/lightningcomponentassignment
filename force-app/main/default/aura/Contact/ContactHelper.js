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
    deleteContact: function(component, contact) {
        let action = component.get("c.deleteContact");
        action.setParams({
            "contact": contact
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
                let c = component.get("v.contacts");
                component.set("v.contacts", c);
            }
        });
        $A.enqueueAction(action);
    },
    
    updateContact: function(component, contact,index) {
        let action = component.get("c.saveContact");
        action.setParams({
            "contact": contact
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
                let c = component.get("v.contacts");
                c.splice(index, 1, response.getReturnValue()); 
                component.set("v.contacts", c);
            }
        });
        $A.enqueueAction(action);
    },
})