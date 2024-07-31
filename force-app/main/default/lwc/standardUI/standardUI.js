import { LightningElement,wire } from 'lwc';
import getfieldset from '@salesforce/apex/FieldSets.getfieldsets'
export default class StandardUI extends LightningElement {
    contactFields;
    hidefield;
    populatefield;
    @wire(getfieldset, { objName: 'Contact', fieldSetName: 'StandardContact' })
    wiredData({ error, data }) {
      if (data) {
          this.contactFields = JSON.parse(data);
        console.log('Data', data);
      } else if (error) {
         console.error('Error:', error);
      }
    }

    changeHandler(event){
      if(event.target.value == "Web"){
        this.populatefield = true;
      }
      else if(event.target.value == "Other"){
        this.hidefield = true;
      }
      else{
        this.hidefield = false;
      }

      var allfields = this.template.querySelectorAll('lightning-input-field');
      allfields.forEach(currentItem => {
        if(this.hidefield == true && currentItem.name == 'Description' ){
          currentItem.className = "slds-hidden";
        }
        else {
          currentItem.className = currentItem.name;
        }

        if (this.populatefield == true && currentItem.name =='Description'){
          currentItem.value = 'selected as web from lead';
        }
      });
    }
}