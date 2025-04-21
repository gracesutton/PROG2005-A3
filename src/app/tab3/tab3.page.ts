import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../service/my.inventory';
import { InventoryService } from '../service/inventory.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})

export class Tab3Page {

  message:string = ""; // error display message
  searched_item:string = ""; // stores the searched item name

  item:InventoryItem = new InventoryItem(0, "", "", 0, 0, "", "", 0, "");
  items:InventoryItem[] = [];
  displayItems: InventoryItem[] = []; // stores filtered items to display
  editingItemName: string | null = null; // Name of the item currently being edited

  constructor(private service: InventoryService) {
    
  }

//Method copied from 'tab1.page.ts'
  searchItem() {

    this.message = ""; // clear previous messages

    if (!this.searched_item || this.searched_item.trim().length === 0) {
      this.message = "Please enter an item name to search.";
      return;
    }

    this.service.getItem(this.searched_item).subscribe({
      next: (item:InventoryItem[]) => {

        if (item && item.length > 0) { // if there is a response
          this.item = item[0]
          this.displayItems = item; // display found item in table

        } else { // no results
          this.displayItems = [];
          this.message = "Item not found";
        }
      },
      error: (err:any) => {this.message = "Error: " + err.status}
      });
  }


  // Called when the "Update" button is clicked — changes display to "edit mode"
  editItem(item: InventoryItem) {
    this.editingItemName = item.item_name; //Converts plain text to input fields
  }
  
  // Called when the "Cancel" button is clicked during edit — changes display back to "read mode"
  cancelEdit() {
    this.editingItemName = null; //Converts input fields of table back to plain text
  }
  
  // confirmUpdate Method  — send updated data of item to the "backend"
  confirmUpdate(item: InventoryItem) { //Called when the "Confirm" button is clicked
    this.service.updateItem(item.item_name, item).subscribe({
      next: (response) => {
        this.message = `Item '${item.item_name}' updated successfully.`; //If successful, display success message
        this.editingItemName = null;
      },
      error: (err) => { //If error occures during confirmUpdate method, display error message
        this.message = "Update failed: " + err.status;
      }
    });
  }

  
  // Delete Method  — Deletes item from database and UI
  deleteItem(name: string) { // Called when "Delete" button is clicked
    this.service.deleteItem(name).subscribe({ // Uses the inventory.service.ts to send a DELETE request, as declared in that file, selected item (found by name)
      next: (res) => {
        this.message = `Item '${name}' deleted successfully.`; //If successful, display success message
        this.displayItems = this.displayItems.filter(item => item.item_name !== name);
      },
      error: (err) => { //If error occures during delete method, display error message
        this.message = "Delete failed: " + err.status;
      }
    });
  }


}
