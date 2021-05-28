({
    handlePageButton: function(component, event,pageNumber){
        var PageLinks=[];
        var TotalPages=component.get("v.TotalPages");
        var count=1;
        if(pageNumber<7){
            for(var i=1;i<=TotalPages;i++){
                PageLinks.push(i);
                if(count>7){
                    PageLinks.push('...');
                    PageLinks.push(TotalPages);
                    break;
                }
                count++;
            }
        }
        else{
            PageLinks.push('1');
            PageLinks.push('2');
            PageLinks.push('...');
            pageNumber=(pageNumber<=0)?2:((pageNumber>=TotalPages)? (TotalPages-3) :(( pageNumber==TotalPages-1 )?(pageNumber = pageNumber-2):( (pageNumber==TotalPages-2 ) ? (pageNumber-1):pageNumber ))) ;
            for(var i=pageNumber-2; i<=pageNumber+2 ; i++){
                PageLinks.push(i);
            }
            PageLinks.push('...');
            PageLinks.push(TotalPages);
        }
        component.set('v.PageLinks', PageLinks);
    }
    
})