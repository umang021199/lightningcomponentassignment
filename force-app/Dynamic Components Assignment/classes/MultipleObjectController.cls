public class MultipleObjectController {
    @AuraEnabled
    public static Boolean createData(String record){
        sObject a=(sObject)JSON.deserialize(record, sObject.class);
        insert a;
        return true;
    }
    
    @AuraEnabled
    public static ObjectDataTableWrapper pagination(Integer pageNumber, Integer pageSize, String name) {        
        Integer offset = (pageNumber - 1) * pageSize;
        Integer totalRecords = Database.countQuery('SELECT COUNT() FROM '+name);
        Integer recordEnd = pageSize * pageNumber;
        
        ObjectDataTableWrapper objDT =  new ObjectDataTableWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        objDT.objectList = Database.query('SELECT FIELDS(STANDARD) FROM '+ name+' order by CreatedDate Desc LIMIT '+pageSize+' OFFSET '+offset);
        return objDT;
    }
    
    @AuraEnabled
    public static Boolean deleteData(List<sObject> data){
        Database.delete(data);
        return true;
    }
    
    @AuraEnabled
    public static Boolean updateData(String record){
        sObject a=(sObject)JSON.deserialize(record, sObject.class);
        update a;
        return true;
    }
    
    public class ObjectDataTableWrapper {
        @AuraEnabled
        public Integer pageSize {get;set;}
        @AuraEnabled
        public Integer pageNumber {get;set;}
        @AuraEnabled
        public Integer totalRecords {get;set;}
        @AuraEnabled
        public Integer recordStart {get;set;}
        @AuraEnabled
        public Integer recordEnd {get;set;}
        @AuraEnabled
        public List<sObject> objectList {get;set;}
    }
}