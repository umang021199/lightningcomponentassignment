import { LightningElement,track } from 'lwc';

export default class ContactFormlwc extends LightningElement {
    newContact={
        FirstName : '',       
        LastName : '',  
        Phone : '', 
        Email : '',    
        Birthdate : '',       
        Department : '',      
    }; 
    fnameInpChange(event){
        this.newContact.FirstName = event.target.value;
      }
      lnameInpChange(event){
        this.newContact.LastName = event.target.value;
      }
      phoneInpChange(event){
        this.newContact.Phone = event.target.value;
     }
      emailInpChange(event){
         this.newContact.Email = event.target.value;
       }
       dateInpChange(event){
         this.newContact.Birthdate = event.target.value;
       }    
       departmentInpChange(event){
        this.newContact.Department = event.target.value;
      }        
      
      clickCreate(){
        const event = new CustomEvent('createcontact', {
          detail: {contact:this.newContact},
      });
      this.dispatchEvent(event);
      }
}