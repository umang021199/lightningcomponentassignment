public with sharing class connectNewsAPI {

    @AuraEnabled
    public static ObjectDataTableWrapper pagination(Integer pageNumber, Integer pageSize, String name,String country) { 
        name=name.toLowercase();
        
        Http h = new Http();
        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint('https://newsapi.org/v2/top-headlines?country='+country+'&category='+name+'&pageSize=100&apiKey=7db0b51f77ee4d6fbe5a45a17b52d80e');
        HttpResponse res = h.send(req);
        
        Map<String,Object> results = (Map<String,Object>)JSON.deserializeUntyped(res.getbody());
        List<Map<String,Object>> finalResultList = new List<Map<String,Object>>();
        List<Object> resultsList = (List<Object>)results.get('articles');
        for(Object mapOfNews:resultsList ){
            Map<String,Object> tempMap = (Map<String,Object>)mapOfNews;
            String title=(String)tempMap.get('title');
            List<String> source=title.split('-');
            tempMap.put('source',source.get(source.size()-1));
            if(tempMap.get('author')==null)
                tempMap.put('author','');
            finalResultList.add(tempMap);
        }
        
        Integer offset = (pageNumber - 1) * pageSize;
        Integer totalRecords = (Integer)results.get('totalResults');
        Integer recordEnd = pageSize * pageNumber;
        
        ObjectDataTableWrapper objDT =  new ObjectDataTableWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.totalRecords = totalRecords;

        List<Map<String,Object>> result1=new List<Map<String,Object>>();
        for(Integer i=pageNumber*pageSize-pageSize;i<pageNumber*pageSize;i++){
            if(i<resultlist.size())
                result1.add(resultlist.get(i));
        }

        objDT.objectList = result1;
        return objDT;
    }

    public class ObjectDataTableWrapper {
        @AuraEnabled
        public Integer pageSize {get;set;}
        @AuraEnabled
        public Integer pageNumber {get;set;}
        @AuraEnabled
        public Integer totalRecords {get;set;}
        @AuraEnabled
        public List<Map<String,Object>> objectList {get;set;}
    }
}