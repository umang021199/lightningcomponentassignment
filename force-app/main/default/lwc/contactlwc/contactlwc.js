import { LightningElement, api, wire,track } from 'lwc';
import saveContact from '@salesforce/apex/Controller.saveContact';
import pagination from '@salesforce/apex/Controller.pagination';
import deleteContact from '@salesforce/apex/Controller.deleteContact';

export default class Contactlwc extends LightningElement {
    @track contacts;
    @track PageNumber=1;
    @track Selectedvalue=10;
    @track EditMode;
    
    @wire(pagination, {pageNumber : '$PageNumber', pageSize : '$Selectedvalue'})
    wiredContact({ error, data }) {
        if (data) {
            this.contacts = data.contactList;
        } else if (error) {
            window.console.log('Failed to retrieve');
            }
        }
        
        removeRow(event){
             var indexvar = event.detail.deleteindex;
             var AllRowsList=JSON.parse(JSON.stringify(this.contacts));
             deleteContact({contact : AllRowsList[indexvar]});
             AllRowsList.splice(indexvar,1);
             this.contacts=AllRowsList;
        }
        
        EditRow(event){
            var contact = event.detail.contact;
            var indexvar = event.detail.editindex;
            var AllRowsList=JSON.parse(JSON.stringify(this.contacts));
            saveContact({contact : contact});
            AllRowsList.splice(indexvar, 1, contact); 
            this.contacts=AllRowsList;
           
        }

        handlecontacts(event){
            this.PageNumber=event.detail.PageNumber;
            this.Selectedvalue=event.detail.Selectedvalue;
            this.wiredContact;
        }
        
        handleCreateContact(event){
            var contact=event.detail.contact;
            saveContact({contact : contact})
            .then(result=>{
                this.contacts.splice(0, 0, result); 
              })
              .catch(error => {
                  console.log("error", JSON.stringify(error));
              });
        }
}