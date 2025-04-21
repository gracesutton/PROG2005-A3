import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../service/my.inventory';
import { InventoryService } from '../service/inventory.service';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})

export class Tab1Page implements OnInit {

  message:string = ""; // error display message
  searched_item:string = ""; // stores the searched item name

  item:InventoryItem = new InventoryItem(0, "", "", 0, 0, "", "", 0, "");
  items:InventoryItem[] = [];
  displayItems: InventoryItem[] = []; // stores filtered items to display
  

  constructor(private service: InventoryService, private alertContrl: AlertController) {
    
  }

  ngOnInit() {
    this.getAllItems(); // display all items on load
  }

  // retrieves all items from the server and displays them in the table
  getAllItems() {
    this.service.getAllItems().subscribe({
      next: (item: InventoryItem[]) => {
        this.items = item;
        this.displayItems = item; // display all items in table
        this.message = "";
      },
      error: (err: any) => {
        this.message = "Error loading records: " + err.status;
      }
    });
  }

  // searches for an item on the server and displays it in the table
  searchItem() {

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

  // clears the form and displays all items by default
  clearForm() {
    this.searched_item = "";
    this.message = "";
    this.getAllItems();
  }

}
