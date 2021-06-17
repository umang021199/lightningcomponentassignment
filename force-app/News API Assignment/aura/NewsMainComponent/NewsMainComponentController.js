({
	doInit: function(component, event, helper) {
		helper.getData(component,component.get("v.pageNumber"),component.get("v.country"));
	},
    
    handleSelect: function(component, event, helper) {
		component.set("v.name",event.getParam('id'));
        component.find("pages").refresh();
        helper.getData(component,1,component.get("v.country"));
	},
    
    handleEvent: function(component, event, helper) {
        component.set('v.pageNumber', event.getParam("pageNumber"));
        component.set('v.selectedValue', event.getParam("selectedValue"));
        helper.getData(component,component.get("v.pageNumber"),component.get("v.country"));
    },
    
     onSelectChange: function(component, event, helper) {
        var country=component.find('select').get('v.value')
        component.set('v.country',country);
        helper.getData(component,component.get("v.pageNumber"),country);
    },
})