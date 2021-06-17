({
	getData : function(component,pageNumber,country){
		var pageSize=component.get("v.selectedValue")
        let action = component.get("c.pagination");
        action.setParams({
            "pageNumber": pageNumber,
            "pageSize": pageSize,
            "name": component.get("v.name"),
            "country": country,
        });
        action.setCallback(this, function(result) {
            let state = result.getState();
            if (component.isValid() && state === "SUCCESS"){
                var resultData = result.getReturnValue();
                component.set("v.data", resultData.objectList);
                component.set("v.totalRecords", resultData.totalRecords);
                component.set("v.totalPages", Math.ceil(resultData.totalRecords / pageSize));
            }
        });
        $A.enqueueAction(action);
	}
})