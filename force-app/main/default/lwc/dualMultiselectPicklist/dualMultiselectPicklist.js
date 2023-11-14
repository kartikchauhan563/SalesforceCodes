import { LightningElement, track, wire } from 'lwc';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account'; 
import LANGUAGE_FIELD from '@salesforce/schema/Account.Language__c';
export default class DualMultiselectPicklist extends LightningElement {

    lstSelected = [];
    @track lstOptions = [];

    // Get Object Info.
    @wire (getObjectInfo, {objectApiName: ACCOUNT_OBJECT})
    accountObjectInfo;

    // Get Picklist values.
    @wire(getPicklistValues, {recordTypeId: '$accountObjectInfo.data.defaultRecordTypeId', fieldApiName: LANGUAGE_FIELD })
    languages(data, error){
        if(data && data.data && data.data.values){
            data.data.values.forEach( objPicklist => {
                this.lstOptions.push({
                    label: objPicklist.label,
                    value: objPicklist.value
                });
            });
        } else if(error){
            console.log(error);
        }
    };

    handleChange(event) {
        this.lstSelected = event.detail.value;
    }
}