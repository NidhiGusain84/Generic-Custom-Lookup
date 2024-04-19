public with sharing class LookupController{
    @AuraEnabled(cacheable = true)
    public static List<SObject> searchRecords(String objectApiName, String searchKey){
        List<SObject> sObjectList = new List<SObject>();
        if (String.isNotBlank(searchKey)){
            String key = '%' + searchKey + '%';
            String queryString = 'SELECT Id, Name FROM ' + objectApiName + ' WHERE Name LIKE :key';
            sObjectList = Database.query(queryString, AccessLevel.USER_MODE);
        }
        return sObjectList;
    }

}