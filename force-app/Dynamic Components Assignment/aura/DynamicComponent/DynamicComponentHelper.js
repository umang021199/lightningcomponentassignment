({
    getData : function(component){
        var pageSize=component.get("v.Selectedvalue")
        let action = component.get("c.pagination");
        action.setParams({
            "pageNumber": component.get("v.PageNumber"),
            "pageSize": pageSize,
            "name": component.get("v.name"),
        });
        action.setCallback(this, function(result) {
            let state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                component.set("v.toggleSpinner",false);
                component.set("v.data", resultData.objectList);
                component.set("v.TotalRecords", resultData.totalRecords);
                component.set("v.TotalPages", Math.ceil(resultData.totalRecords / pageSize));
            }
            else {
                var error = result.getError();
                component.find("toastCmp").showToastModel(error[0].message, "error");
            }
        });
        $A.enqueueAction(action);
    },
    
    deleteRows : function(component,rows){
        let action = component.get("c.deleteData");
        var selectedRowsCount1=component.get("v.selectedRowsCount")
        action.setParams({
            "data": rows
        });
        action.setCallback(this, function(result) {
            let state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                component.set("v.selectedRows",[]);
                component.set("v.selectedRowsCount",0);
                component.find("datatableId").set("v.selectedRows",[]);
                this.getData(component);
                var selectedRowsCount=selectedRowsCount1==0?1:selectedRowsCount1;
                if(selectedRowsCount==1)
                    component.find("toastCmp").showToastModel(selectedRowsCount+" Record Deleted Successfully!", "success");
                else
                    component.find("toastCmp").showToastModel(selectedRowsCount+" Records Deleted Successfully!", "success");
            }
            else {
                var error = result.getError();
                component.find("toastCmp").showToastModel(error[0].message, "error");
            }
        });
        $A.enqueueAction(action);
    },
    
    createnew : function(component,fields){
        let action = component.get("c.createData");
        action.setParams({
            "record": fields,
        });
        action.setCallback(this, function(result) {
            let state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                this.getData(component);
                component.set('v.modal', false);
                component.find("toastCmp").showToastModel("Record Created Successfully!", "success");
            }
            else {
                var error = result.getError();
                component.find("toastCmp").showToastModel(error[0].message, "error");
            }
        });
        $A.enqueueAction(action);
    },
    
    updateRecord : function(component,fields){
        let action = component.get("c.updateData");
        action.setParams({
            "record": fields,
        });
        action.setCallback(this, function(result) {
            let state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                this.getData(component);
                component.set('v.EditMode', false);
                component.find("toastCmp").showToastModel("Record Updated Successfully!", "success");
                component.find("pages").refresh();
            }
            else {
                var error = result.getError();
                component.find("toastCmp").showToastModel(error[0].message, "error");
            }
        });
        $A.enqueueAction(action);
    },
})