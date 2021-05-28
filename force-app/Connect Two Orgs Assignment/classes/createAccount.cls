@RestResource(urlMapping='/v1/createAccount/*')
global with sharing class createAccount{

    // Target Org code
    
    @HttpPut
    global static String create(){
        RestRequest req=RestContext.request;
        String body=RestContext.request.requestBody.toString();
        Account acc=(Account)System.JSON.deserialize(body, Account.class);
        List<Account> ac= [SELECT Name,externalId__c,Phone FROM Account WHERE externalId__c = :acc.id];
        if(!ac.isEmpty()){
            acc.externalId__c=acc.id;
            acc.id=ac.get(0).id;
        }
        else{
            acc.externalId__c=acc.id;
            acc.id=null;
        }
        upsert acc;
        String returnResponse = JSON.serialize(acc);
        return returnResponse;
        
    }
    
    @HttpPost
    global static String fetch(String externalId){
        List<Account> acc= [SELECT Name,externalId__c,Phone,LastModifiedDate  FROM Account WHERE id = :externalId];
        if(!acc.isEmpty()){
            String returnResponse = JSON.serialize(acc.get(0));
            return returnResponse;
        }
        else{
            return 'empty';
        }
        
    }
}