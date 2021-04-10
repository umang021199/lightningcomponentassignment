({
	deleteRow: function(component, event, helper) {
        let createEvent = component.getEvent("DeleteRow");
        createEvent.setParams({ "indexVar": component.get("v.rowIndex") });
        createEvent.fire();
    },
    handleUpdateContact: function(component, event, helper) {
        let createEvent = component.getEvent("EditRow");
        createEvent.setParams({ "EditIndex": component.get("v.rowIndex") });
        createEvent.fire();
    },
    cancel : function(component,event,helper){
         component.set("v.EditMode", false);  
    },
    inlineEdit : function(component, event, helper){   
        component.set("v.EditMode", true);
        var name=component.get("v.contact.FirstName")+' '+component.get("v.contact.LastName");
        component.set("v.name", name);
    },
    nameInpChange: function(component, event, helper) {
        var name=component.find('contactname').get('v.value');
        var details=name.split(' ');
        component.set("v.contact.FirstName", details[0]);
        component.set("v.contact.LastName", details[1]);
    }
})