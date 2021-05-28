({
    handleNext: function(component, event, helper) {
        var pageNumber=component.get("v.PageNumber");
        var pageSize=component.get("v.Selectedvalue");
        var end=component.get("v.end");
        var start=component.get("v.start");
        start=start+pageSize;
        end=end+pageSize;
        component.set("v.start",start);
        component.set("v.end",end);
        pageNumber++;
        component.set('v.PageNumber', pageNumber);
        helper.handlePageButton(component, event, pageNumber);
        let createEvent = component.getEvent("PageEvent");
        createEvent.setParams({ "PageNumber": pageNumber, "Selectedvalue": pageSize});
        createEvent.fire();
    },
    
    handlePrev: function(component, event, helper) {
        var pageNumber=component.get("v.PageNumber");  
        var pageSize=component.get("v.Selectedvalue");
        var end=component.get("v.end");
        var start=component.get("v.start");
        start=start-pageSize;
        end=end-pageSize;
        component.set("v.start",start);
        component.set("v.end",end);
        pageNumber--;
        component.set('v.PageNumber', pageNumber);
        helper.handlePageButton(component, event, pageNumber);
        let createEvent = component.getEvent("PageEvent");
        createEvent.setParams({ "PageNumber": pageNumber, "Selectedvalue": pageSize});
        createEvent.fire();
    },
    
    onSelectChange: function(component, event, helper) {
        var pageSize=parseInt(component.find('select').get('v.value'));
        component.set('v.PageNumber', 1);
        component.set("v.Selectedvalue",pageSize);
        component.set("v.start",0);
        component.set("v.end",pageSize-1);
        helper.handlePageButton(component, event, 1);
        let createEvent = component.getEvent("PageEvent");
        createEvent.setParams({ "PageNumber": 1, "Selectedvalue": pageSize});
        createEvent.fire();
    },
    
    handlePage: function(component, event, helper) {
        var pageNumber = parseInt(event.getSource().get("v.label"));
        var pageSize=component.get("v.Selectedvalue");
        if(pageNumber==component.get("v.TotalPages")){
            component.set("v.LastPage",pageNumber);
        }
        var start=(pageNumber-1)*pageSize;
        var end=((pageNumber-1)*pageSize)+pageSize-1;
        component.set("v.start",start);
        component.set("v.end",end);
        component.set('v.PageNumber', pageNumber);
        helper.handlePageButton(component, event, pageNumber);
        let createEvent = component.getEvent("PageEvent");
        createEvent.setParams({ "PageNumber": pageNumber, "Selectedvalue": pageSize});
        createEvent.fire();
    },
    
    handleValueChange: function(component, event, helper) {
        var currentPage=component.get("v.TotalPages");
        var pageSize=component.get("v.Selectedvalue");
        if(currentPage==component.get("v.LastPage")-1){
            var start=(currentPage-1)*pageSize;
            var end=((currentPage-1)*pageSize)+pageSize-1;
            component.set("v.start",start);
            component.set("v.end",end);
            component.set('v.PageNumber', currentPage);
            component.set("v.LastPage",currentPage);
            helper.handlePageButton(component, event,currentPage);
            let createEvent = component.getEvent("PageEvent");
            createEvent.setParams({ "PageNumber": currentPage, "Selectedvalue": pageSize});
            createEvent.fire();
            
        }
        else{
            component.set("v.start",0);
            component.set("v.end",pageSize-1);
            helper.handlePageButton(component, event,component.get("v.PageNumber"));  
        }
    },
})