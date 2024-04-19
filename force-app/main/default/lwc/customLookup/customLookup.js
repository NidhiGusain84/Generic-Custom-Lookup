import { LightningElement, api, wire } from 'lwc';
import searchRecords from "@salesforce/apex/LookupController.searchRecords"

const DELAY = 300;
export default class CustomLookup extends LightningElement {
    @api apiName = "Account";
    searchvalue;
    @api objectLabel = "Account";
    @api iconName = "standard:account";
    delayTimeout;
    selectedRecord = {
        selectedId: "",
        selectedName: ""
    };
    displayOptions = false;

    @wire(searchRecords, {
        objectApiName:"$apiName",
        searchKey:"$searchvalue"
    })outputs;

    get isRecordSelected(){
        return this.selectedRecord.selectedId === '' ? false : true;
    }

    changeHandler(event){
        window.clearTimeout(this.delayTimeout);
        let enteredValue = event.target.value;
        //debouncing - do not update the reactive property as long as this function is being called within a delay
        this.delayTimeout = setTimeout(() => {
            this.searchvalue = enteredValue;
            this.displayOptions = true;
        }, DELAY);

    }

    clickHandler(event){
        let selectedId = event.currentTarget.dataset.item;
        console.log("SelectedId: ", selectedId);
        let outputRecord = this.outputs.data.find((currentItem) => currentItem.Id === selectedId);
        this.selectedRecord = {
             selectedId: outputRecord.Id,
             selectedName: outputRecord.Name
        };
        this.displayOptions = false;
    }

    removalSelectionHandler(event){
        this.selectedRecord = {
             selectedId: "",
             selectedName: ""
        };
        this.displayOptions = false;
    }

} 