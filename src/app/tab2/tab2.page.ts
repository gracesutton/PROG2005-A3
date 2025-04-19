import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { InventoryItem } from '../service/my.inventory';
import { InventoryService } from '../service/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(private service: InventoryService, private router: Router) {}

  id = 0;
  name = "";
  category = "";
  quantity = 1;
  price = 1;
  supplier = "";
  stock = "";
  featured = "1";
  snote = "";

  submitButtonPressed = false;

  onSubmit(myForm: NgForm) {
    this.submitButtonPressed = true;

    if (myForm.valid) {
      let item = new InventoryItem(
        this.id,
        this.name,
        this.category,
        this.quantity,
        this.price,
        this.supplier,
        this.stock,
        Number(this.featured),
        this.snote
      );

      this.service.addItem(item).subscribe({
        next: (data) => {
          console.log("Item added", data);
          alert("Item added!");
          this.router.navigate(['/tabs/tab1']);
        },
        error: (err) => {
          console.log("Error while adding the item", err); 
        }
      });
    }
  }
}
