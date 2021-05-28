({
    doInit: function(component, event, helper) {
        var actions=[{label: 'View', name: 'view'},{label: 'Edit', name: 'edit'},{label: 'Delete', name: 'delete'}];
        var name=component.get("v.name");
        if(name==="Account"){
            component.set('v.columns', [
                {label: 'Account Name', fieldName: 'Name', type: 'text'},
                {label: 'Account Number', fieldName: 'AccountNumber', type: 'text'},
                {label: 'Phone', fieldName: 'Phone', type: 'text'},
                {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency'},
                {label: 'Type', fieldName: 'Type', type: 'text'},
                {type: 'action', typeAttributes: { rowActions: actions} }]);
        }
        else if(name==="Contact"){
            component.set('v.columns', [
                {label: 'Contact Name', fieldName: 'Name', type: 'text'},
                {label: 'Phone', fieldName: 'Phone', type: 'text'},
                {label: 'Email', fieldName: 'Email', type: 'email'},
                {label: 'Birth Date', fieldName: 'Birthdate', type: 'text'},
                {label: 'Department', fieldName: 'Department', type: 'text'},
                {type: 'action', typeAttributes: { rowActions: actions } } ]);
        }
            else if(name==="Lead"){
                component.set('v.columns', [
                    {label: 'Lead Name', fieldName: 'Name', type: 'text'},
                    {label: 'Company', fieldName: 'Company', type: 'text'},
                    {label: 'Lead Status', fieldName: 'Status', type: 'text'},
                    {label: 'Lead Source', fieldName: 'LeadSource', type: 'text'},
                    {label: 'Industry', fieldName: 'Industry', type: 'text'},
                    {type: 'action', typeAttributes: { rowActions: actions } }]);
            }
                else if(name==="Opportunity"){
                    component.set('v.columns', [
                        {label: 'Opportunity Name', fieldName: 'Name', type: 'text'},
                        {label: 'Close Date', fieldName: 'CloseDate', type: 'text'},
                        {label: 'Stage', fieldName: 'StageName', type: 'text'},
                        {label: 'Type', fieldName: 'Type', type: 'text'},
                        {label: 'Amount', fieldName: 'Amount', type: 'text'},
                        {type: 'action', typeAttributes: { rowActions: actions } }]);
                }
        helper.getData(component);
    },
    
    updateSelectedText: function (component, event) {
        var selectedRows = event.getParam('selectedRows');
        component.set('v.selectedRowsCount', selectedRows.length);
        component.set('v.selectedRows', selectedRows);
    },
    
    deleteObject: function(component, event, helper) {
        helper.deleteRows(component,component.get("v.selectedRows"));
    },
    
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        var rows = component.get('v.data');
        var rowIndex = rows.indexOf(row);
        switch (action.name) {
            case 'view':
                component.set('v.recordId', rows[rowIndex].Id);
                component.set('v.show', true);
                break;
            case 'edit':
                component.set('v.recordId', rows[rowIndex].Id);
                component.set('v.EditMode', true);
                break;
            case 'delete':
                helper.deleteRows(component,[row]);
                break;
        }
    },
    
    createRecord: function(component, event, helper) {
        component.set('v.modal', true);
    },
    
    handleEvent: function(component, event, helper) {
        component.set('v.PageNumber', event.getParam("PageNumber"));
        component.set('v.Selectedvalue', event.getParam("Selectedvalue"));
        helper.getData(component);
    },
    
    closeModel: function(component, event, helper) {
        component.set('v.modal', false);
    },
    
    closeshowModel: function(component, event, helper) {
        component.set('v.show', false);
    },
    
    redirect: function(component, event, helper) {
        component.set('v.EditMode', false);
        component.find("pages").refresh();        
    },
    
    handleEdit: function(component, event, helper) {
        event.preventDefault();  
        var fields = event.getParam('fields');
        fields.attributes={"type":component.get("v.name")};
        fields.Id=component.get("v.recordId");
        helper.updateRecord(component,JSON.stringify(fields));
    },
    
    handleSubmit : function(component, event, helper) {
        event.preventDefault();  
        var fields = event.getParam('fields');
        fields.attributes={"type":component.get("v.name")};
        helper.createnew(component,JSON.stringify(fields));
    },
    
})