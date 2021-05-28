public with sharing class connectedorg {
    
    // Source org code

    public class deserializeResponse{
        public String id;
        public String access_token;
    }
    
    @AuraEnabled
    public static void callGetAccount(String accId){
        String clientId = '3MVG97quAmFZJfVzA3TVBxZUrDTu0cou0nvm9Fg5..BLPuRT7YyK9nRF1qoOoeC.mdUYUfk41PVndvH7iZW98';
        String clientSecret = '07168DEDAB90550AAA3BC72AB22DB99FA37AE71411E09475AC2B75E2205B4121';
        String username = 'umangsinghal0211@brave-badger-oufzd5.com';
        String password = '';
        String accessToken;
        String reqbody='grant_type=password&client_id='+clientId+'&client_secret='+clientSecret+'&username='+username+'&password='+password;
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setBody(reqbody);
        req.setMethod('POST');
        req.setEndpoint('https://login.salesforce.com/services/oauth2/token?');
        HttpResponse res = h.send(req);
        deserializeResponse response = (deserializeResponse)JSON.deserialize(res.getbody(),deserializeResponse.class);
        accessToken=response.access_token;

        if(accessToken != null) {
            Account a = [SELECT Name,externalId__c,Phone,LastModifiedDate FROM Account WHERE Id = :accId];
            String endPoint = 'https://brave-badger-oufzd5-dev-ed.my.salesforce.com/services/apexrest/v1/createAccount/';
            String jsonstr = '{"externalId" : "' + a.externalId__c + '"}';
            Http h2 = new Http();
            HttpRequest req1 = new HttpRequest();
            req1.setHeader('Authorization','Bearer ' + accessToken);
            req1.setHeader('Content-Type','application/json');
            req1.setHeader('accept','application/json');
            req1.setMethod('POST');
            req1.setEndpoint(endPoint);
            req1.setBody(jsonstr);
            HttpResponse res1 = h2.send(req1);

            if(!(res1.getBody().equals('empty'))){
                String trimmedResponse = res1.getBody().unescapeCsv().remove('\\');
                Account acc = (Account)JSON.deserialize(trimmedResponse,Account.class);
                if(acc.LastModifiedDate>=a.LastModifiedDate){
                    acc.id=a.id;
                    acc.externalId__c=a.externalId__c;
                    update acc;
                }
            }
            
            create(accId,accessToken);
        }
    }
    
    @future(callout = true)
    public static void create(String accId,String accessToken){
        String endPoint = 'https://brave-badger-oufzd5-dev-ed.my.salesforce.com/services/apexrest/v1/createAccount/';
        Account a = [SELECT Name,externalId__c,Phone,LastModifiedDate FROM Account WHERE Id = :accId];
        String jsonstr = JSON.serialize(a);
        Http h2 = new Http();
        HttpRequest req1 = new HttpRequest();
        req1.setHeader('Authorization','Bearer ' + accessToken);
        req1.setHeader('Content-Type','application/json');
        req1.setHeader('accept','application/json');
        req1.setMethod('PUT');
        req1.setEndpoint(endPoint);
        req1.setBody(jsonstr);
        HttpResponse res1 = h2.send(req1);
        String trimmedResponse = res1.getBody().unescapeCsv().remove('\\');
        deserializeResponse resp2 = (deserializeResponse)JSON.deserialize(trimmedResponse,deserializeResponse.class);
        a.externalId__c = resp2.id;
        update a;
    }
}
