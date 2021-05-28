import { LightningElement, api,wire,track } from 'lwc';
import pagination from '@salesforce/apex/Controller.pagination';
export default class LWCPagination extends LightningElement {
    @track Selectedvalue=10;
    @track PageNumber=1;
    @track TotalPages=0;
    @track TotalRecords=0;
    @track RecordStart=0;
    @track RecordEnd=0;
    @track next=false;
    @track prev=true;

    @wire(pagination, {pageNumber : '$PageNumber', pageSize : '$Selectedvalue'})
    wiredContact({ error, data }) {
        if (data) {
            this.PageNumber=data.pageNumber;
            this.TotalRecords=data.totalRecords;
            this.RecordStart=data.recordStart;
            this.RecordEnd=data.recordEnd;
            this.TotalPages=Math.ceil(data.totalRecords / data.pageSize);
        } else if (error) {
            window.console.log('Failed to retrieve');
            }
        }
        handlePrev(){
            this.PageNumber--;
            if(this.PageNumber===1){
                this.prev=true;
            }
            else{
                this.next=false;
            }
            this.wiredContact;
            const event = new CustomEvent('contacts', {
                detail: {
                    PageNumber:this.PageNumber,
                    Selectedvalue:this.Selectedvalue
                },
            });
            this.dispatchEvent(event);
        }
        handleNext(){
            this.PageNumber++;
            if(this.PageNumber===this.TotalPages){
                this.next=true;
            }
            else{
                this.prev=false;
            }
            this.wiredContact;
            const event = new CustomEvent('contacts', {
                detail: {
                    PageNumber:this.PageNumber,
                    Selectedvalue:this.Selectedvalue
                },
            });
            this.dispatchEvent(event);
        }

        onSelectChange(event){
            this.PageNumber=1;
            this.prev=true;
            this.next=false;
            this.Selectedvalue = event.target.value;
            this.wiredContact;
            const event1 = new CustomEvent('contacts', {
                detail: {
                    PageNumber:this.PageNumber,
                    Selectedvalue:this.Selectedvalue
                },
            });
            this.dispatchEvent(event1);
        }

}