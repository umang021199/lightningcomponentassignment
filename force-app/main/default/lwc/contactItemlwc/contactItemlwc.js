import { LightningElement,api,track } from 'lwc';

export default class ContactItemlwc extends LightningElement {
    @track contact;
    @api rowindex;
    @track EditMode=false;
    @track name;
    @api
    get itemName() {
        return this.contact;
    }
    set itemName(value) {
        this.contact = JSON.parse(JSON.stringify(value));
        this.name=this.contact.FirstName+' '+this.contact.LastName;
    }

    nameInpChange(event){
        this.name = event.target.value;
        var details=this.name.split(' ');
        this.contact.FirstName = details[0];
        this.contact.LastName = details[1];
      }
      phoneInpChange(event){
        this.contact.Phone = event.target.value;
     }
      emailInpChange(event){
         this.contact.Email = event.target.value;
       }
       dateInpChange(event){
         this.contact.Birthdate = event.target.value;
       }    
       departmentInpChange(event){
        this.contact.Department = event.target.value;
      }        

    cancel(){
        this.EditMode=false;
    }

    inlineEdit(){
        this.EditMode=true;
    }
    deleteRow(){
        const event = new CustomEvent('deleterow', {
            detail: {deleteindex:this.rowindex},
        });
        this.dispatchEvent(event);
    }
    handleUpdateContact(){
        this.EditMode=false;
        const event = new CustomEvent('editrow', {
            detail: {
                editindex:this.rowindex,
                contact:this.contact
            },
        });
        this.dispatchEvent(event);
    }
}