@isTest
private class Inventory_OrderTest {
    @isTest static void myTest() {
        Seller__c s=new Seller__c(Name='Lucent');
        insert s;
        
        Account acc=new Account(Name='xyz');
        insert acc;
        
        Book_Order__c a = new Book_Order__c(Name='xyz',Seller__c=s.id,Status__c='New',Account__c=acc.id);
        insert a;
        
        List<Book__c> book=new List<Book__c>();
        for(Integer i=0;i<100;i++){
            Book__c bb = new Book__c(Name='xyz'+i,Author__c='abc'+i);
            book.add(bb);
        }
        insert book;
        
        List<Warehouse__c> warehouse=new List<Warehouse__c>();
        for(Integer i=0;i<100;i++){
            Warehouse__c bb = new Warehouse__c(Name='abc'+i);
            warehouse.add(bb);
        }
        insert warehouse;
        
        List<Book_Order_Lines__c> lines=new List<Book_Order_Lines__c>();
        for(Integer i=0;i<100;i++){
            Book_Order_Lines__c b = new Book_Order_Lines__c(Name='xyz'+i,Book_Order__c=a.id,Book__c=book.get(i).id,
                                                            Quantity__c=5);
            lines.add(b);
        }
        insert lines;
        
        List<Book_In_Warehouse__c> books=new List<Book_In_Warehouse__c>();
        for(Integer i=0;i<100;i++){
            Book_In_Warehouse__c b = new Book_In_Warehouse__c(Name='xyz'+i,Warehouse__c=warehouse.get(0).id,
                                                              Book__c=book.get(i).id,Quantity__c=50);
            books.add(b);
        }
        insert books;
        
        a.Status__c='Ordered';
        update a;
        a = [Select Name, Seller__c, Status__c, Account__c from Book_Order__c where id=:a.id];
        List<Book_In_Warehouse__c> d=[SELECT Name, Book__c,Warehouse__c,Quantity__c FROM Book_In_Warehouse__c];
        System.assertEquals('Shipped', a.Status__c);
        for(Book_In_Warehouse__c c: d){
            System.assertEquals(45, c.Quantity__c);
        }
        
    }
    
    @isTest static void myTest1() {
        Seller__c s=new Seller__c(Name='Lucent');
        insert s;
        
        Account acc=new Account(Name='xyz');
        insert acc;
        
        Book_Order__c a = new Book_Order__c(Name='xyz',Seller__c=s.id,Status__c='New',Account__c=acc.id);
        insert a;
        
        List<Book__c> book=new List<Book__c>();
        for(Integer i=0;i<100;i++){
            Book__c bb = new Book__c(Name='xyz'+i,Author__c='abc'+i);
            book.add(bb);
        }
        insert book;
        
        List<Warehouse__c> warehouse=new List<Warehouse__c>();
        for(Integer i=0;i<100;i++){
            Warehouse__c bb = new Warehouse__c(Name='abc'+i);
            warehouse.add(bb);
        }
        insert warehouse;
        
        List<Book_Order_Lines__c> lines=new List<Book_Order_Lines__c>();
        for(Integer i=0;i<100;i++){
            Book_Order_Lines__c b = new Book_Order_Lines__c(Name='xyz'+i,Book_Order__c=a.id,Book__c=book.get(i).id,
                                                            Quantity__c=5);
            lines.add(b);
        }
        insert lines;
        
        List<Book_In_Warehouse__c> books=new List<Book_In_Warehouse__c>();
        for(Integer i=0;i<100;i++){
            Book_In_Warehouse__c b = new Book_In_Warehouse__c(Name='xyz'+i,Warehouse__c=warehouse.get(0).id,
                                                              Book__c=book.get(i).id,Quantity__c=50);
            books.add(b);
        }
        Book_In_Warehouse__c b = new Book_In_Warehouse__c(Name='xyz5',Warehouse__c=warehouse.get(0).id,
                                                          Book__c=book.get(4).id,Quantity__c=2);
        books.add(b);
        insert books;
        
        a.Status__c='Ordered';
        update a;
        a = [Select Name, Seller__c, Status__c, Account__c from Book_Order__c where id=:a.id];
        List<Book_In_Warehouse__c> d=[SELECT Name, Book__c,Warehouse__c,Quantity__c FROM Book_In_Warehouse__c];
        System.assertEquals('Backordered', a.Status__c);
        
    }
    
    
    @isTest static void myTest2() {
        Seller__c s=new Seller__c(Name='Lucent');
        insert s;
        
        Account acc=new Account(Name='xyz');
        insert acc;
        
        List<Book__c> book=new List<Book__c>();
        for(Integer i=0;i<50;i++){
            Book__c bb = new Book__c(Name='xyz'+i,Author__c='abc'+i);
            book.add(bb);
        }
        insert book;
        
        List<Warehouse__c> warehouse=new List<Warehouse__c>();
        for(Integer i=0;i<50;i++){
            Warehouse__c bb = new Warehouse__c(Name='abc'+i);
            warehouse.add(bb);
        }
        insert warehouse;
        
        List<Book_Order__c> books=new List<Book_Order__c>();
        for(Integer i=0;i<20;i++){
            Book_Order__c a = new Book_Order__c(Name='xyz'+i,Seller__c=s.id,Status__c='New',Account__c=acc.id);
            books.add(a);
        }
        insert books;
        
        List<Book_Order_Lines__c> lines=new List<Book_Order_Lines__c>();
        for(Integer i=0;i<20;i++){
            for(Integer j=0;j<10;j++){
                Book_Order_Lines__c b = new Book_Order_Lines__c(Name='xyz'+j,Book_Order__c=books.get(i).id,Book__c=book.get(j).id,
                                                                Quantity__c=5);
                lines.add(b);
            }
        }
        insert lines;        
        
        
        List<Book_In_Warehouse__c> bookw=new List<Book_In_Warehouse__c>();
        for(Integer i=0;i<50;i++){
            Book_In_Warehouse__c b = new Book_In_Warehouse__c(Name='xyz'+i,Warehouse__c=warehouse.get(0).id,
                                                              Book__c=book.get(i).id,Quantity__c=200);
            bookw.add(b);
        }
        insert bookw;
        
        for(Book_Order__c a:books){
            a.Status__c='Ordered';
            update a;
            
        }
        List<Book_Order__c> output=[Select Name, Seller__c, Status__c, Account__c from Book_Order__c];
        for(Book_Order__c a:output){
            System.assertEquals('Shipped', a.Status__c);
        }
        
        List<Book_In_Warehouse__c> d=[SELECT Name, Book__c,Warehouse__c,Quantity__c FROM Book_In_Warehouse__c];
        for(Integer i=0;i<10;i++){
            System.assertEquals(100, d.get(i).Quantity__c);
        }
        
    }
}