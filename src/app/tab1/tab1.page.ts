import { Component, OnInit } from '@angular/core';
import { InventoryItem } from '../service/my.inventory';
import { InventoryService } from '../service/inventory.service';

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

  constructor(private service: InventoryService) {
    
  }

  ngOnInit() {
    this.getAllItems(); // display all items on load
  }

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

  searchItem() {
    if (!this.searched_item || this.searched_item.trim().length === 0) {
      this.message = "Please enter an item name to search.";
      return;
    }

    this.service.getItem(this.searched_item).subscribe({
      next: (item:InventoryItem[]) => {
        this.item = item[0]
        this.displayItems = item; // display found item in table
      },
      error: (err:any) => {this.message = "Error: " + err.status}
      });
  }

  clearForm() {
    this.searched_item = "";
    this.message = "";
    this.getAllItems();
  }

}
