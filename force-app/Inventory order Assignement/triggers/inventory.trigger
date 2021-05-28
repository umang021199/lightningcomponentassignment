trigger inventory on Book_Order__c (before update) {
    Inventory_Order.orders(Trigger.new);
}