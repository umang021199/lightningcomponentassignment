({
    sync : function(component) {
        var recordId = component.get("v.recordId");
        let action = component.get("c.callGetAccount");
        action.setParams({
            "accId": recordId
        });
        action.setCallback(this, function(response) {
            component.set("v.toggleSpinner", false);
            $A.get("e.force:closeQuickAction").fire();
            var toastEvent = $A.get("e.force:showToast");
            if (response.getState() === "SUCCESS"){
                toastEvent.setParams({
                    title : 'Success',
                    message: 'Data Synced Sucessfully!',
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'success',
                    mode: 'pester'
                });
            } 
            else{
                var error = response.getError();
                toastEvent.setParams({
                    title : 'Error',
                    message: error[0].message,
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'pester'
                });
            }
            toastEvent.fire();
        });
        $A.enqueueAction(action);
    }
})