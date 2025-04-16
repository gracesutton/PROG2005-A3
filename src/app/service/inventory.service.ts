import { InventoryItem } from "./my.inventory";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InventoryService {

  private url: string = "https://prog2005.it.scu.edu.au/ArtGalley";     
  
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) {
    console.log('InventoryService base URL:', this.url);
  }

  // get all items
  public getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.url);
  }

  // get/search an item by name
  public getItem(name: string) : Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.url}/${name}`);
  }

  // add new item
  public addItem(_new_item:InventoryItem): Observable<InventoryItem> {
    console.log('Adding new item:', _new_item);
    return this.http.post<InventoryItem>(this.url, _new_item);
  }

  // list featured items

  // update item using item name

  // delete item using item name

}


