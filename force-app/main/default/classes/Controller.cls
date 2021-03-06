public with sharing class Controller {
    @AuraEnabled(cacheable=true)
    public static ContactDataTableWrapper pagination(Integer pageNumber, Integer pageSize) {
        String[] fieldsToCheck = new String[] {'Id', 'FirstName','LastName', 'Phone', 'Email', 'Birthdate','Department'};
                    Map<String,Schema.SObjectField> fieldDescribeTokens =
                    Schema.SObjectType.Contact.fields.getMap();
        for(String field : fieldsToCheck) {
            if( ! fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
                throw new System.NoAccessException();
            }
        }
        
        Integer offset = (pageNumber - 1) * pageSize;
        Integer totalRecords = [SELECT COUNT() FROM Contact];
        Integer recordEnd = pageSize * pageNumber;
 
        ContactDataTableWrapper objDT =  new ContactDataTableWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        objDT.contactList = [SELECT Id, FirstName,LastName, Phone, Email, Birthdate,Department FROM Contact order by CreatedDate Desc LIMIT :pageSize OFFSET :offset];
        return objDT;
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        String[] fieldsToCheck = new String[] {'Id', 'FirstName','LastName', 'Phone', 'Email', 'Birthdate','Department'};
                    Map<String,Schema.SObjectField> fieldDescribeTokens =
                    Schema.SObjectType.Contact.fields.getMap();
        for(String field : fieldsToCheck) {
            if( ! fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
                throw new System.NoAccessException();
            }
        }
        return [SELECT Id, FirstName,LastName, Phone, Email, Birthdate,Department FROM Contact order by CreatedDate Desc LIMIT:5];
    }
    @AuraEnabled
    public static Contact saveContact(Contact contact) {
        upsert contact;
        return contact;
    }
    @AuraEnabled
    public static boolean deleteContact(Contact contact) {
        delete contact;
        return true;
    }
    public class ContactDataTableWrapper {
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
        public List<Contact> contactList {get;set;}
    }
   
}
