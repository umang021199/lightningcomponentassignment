public class Inventory_Order {
    public static void orders(List<Book_Order__c> orders){
        List<Book_In_Warehouse__c> BIWs = [SELECT Name, Book__c,Warehouse__c,Quantity__c FROM Book_In_Warehouse__c];
        List<Book_In_Warehouse__c> finalBIW=new List<Book_In_Warehouse__c>();
        
        // K: Book Order Id; K: Book Order Lines
        Map<Id, List<Book_Order_Lines__c>> BIWMap = new Map<Id, List<Book_Order_Lines__c>>();
        for(Book_Order_Lines__c bol: [SELECT Id,Name,Book__c,Book_Order__c,Quantity__c FROM Book_Order_Lines__c where Book_Order__c IN : orders]){
            if(BIWMap.containsKey(bol.Book_Order__c)){
                BIWMap.get(bol.Book_Order__c).add(bol);
            }
            else{
                BIWMap.put(bol.Book_Order__c,new List<Book_Order_Lines__c>{bol});
            }
        }
        

        // for handling multiple Book Orders
        for(Book_Order__c order : orders) {
            if(order.Status__c=='Ordered'){
                boolean flag=false;
                List<Book_In_Warehouse__c> qualifiedBIW=new List<Book_In_Warehouse__c>();
                for(Book_Order_Lines__c line : BIWMap.get(order.Id)){  
                        for(Book_In_Warehouse__c book : BIWs){
                            if(line.Book__c==book.Book__c){
                                if(book.Quantity__c>=line.Quantity__c){
                                    qualifiedBIW.add(book);
                                    flag=true;
                                }
                                else{
                                    flag=false;
                                    break;
                                }
                            }
                        }
                        if(flag==false){
                            break;
                        }
                }
                if(flag){
                    Set<Book_In_Warehouse__c> commonBIW = new Set<Book_In_Warehouse__c>();
                    if(BIWMap.get(order.Id).size()==1){
                        commonBIW.add(qualifiedBIW.get(0));
                    }
                    else{
                        // for finding common BIW
                        for(Integer i=0;i<qualifiedBIW.size();i++){
                            for(Integer j=i+1;j<qualifiedBIW.size();j++){
                                if(qualifiedBIW.get(i).Warehouse__c==qualifiedBIW.get(j).Warehouse__c){
                                        commonBIW.add(qualifiedBIW.get(i));
                                        commonBIW.add(qualifiedBIW.get(j));
                                }
                            }  
                        } 
                    }
                    if(commonBIW.size()>0){
                        for(Book_Order_Lines__c line : BIWMap.get(order.Id)){
                            for(Book_In_Warehouse__c book : commonBIW){
                                if(line.Book__c==book.Book__c){
                                    book.Quantity__c-=line.Quantity__c;
                                    finalBIW.add(book);
                                }
                            }
                        }
                        order.Status__c='Shipped';
                    }
                    else{
                        order.Status__c='Backordered';
                    }
                }
                else{
                    order.Status__c='Backordered';
                }
            } 
        }
        if(finalBIW.size()>0){
            update finalBIW;
        }
    }
}