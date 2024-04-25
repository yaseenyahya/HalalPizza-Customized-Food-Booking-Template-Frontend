import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-menuitemmodal',
  templateUrl: './menuitemmodal.component.html',
  styleUrls: ['./menuitemmodal.component.css'],
})
export class MenuitemmodalComponent implements OnInit {
  addonsLoading: boolean = true;
  itemObject: any;
  otherSelectionSelectedItems: any[] = [];
  selectedVariationItem: any;
  totalOrder: number = 0;
  variationSelectionItems: any;
  itemObjectOtherSelectionOnlyIds: any;
  itemObjectOtherSelection: any[] = [];
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}
  otherSelectionItemQuantity(itemId: number) {
    var item = this.otherSelectionSelectedItems.find(
      (item) => item.id == itemId
    );
    if (item) return item.quantity;
    else return 0;
  }
  handleOtherSelectionChange(itemData: any, event: any) {
    const checked = event.target.checked;
    if (checked) {
      // Checkbox is checked, add to the array
      if (
        !this.otherSelectionSelectedItems.find((item) => item.id == itemData.id)
      ) {
        itemData.quantity = 1;
        this.otherSelectionSelectedItems.push(itemData);
      }
    } else {
      // Checkbox is unchecked, remove from the array
      const index = this.otherSelectionSelectedItems.findIndex(
        (item) => item.id == itemData.id
      );
      if (index !== -1) {
        this.otherSelectionSelectedItems.splice(index, 1);
      }
    }
    this.calculateTotalOrder();
  }
  haveInOtherSelectionSelectedItems(itemData: any) {
    console.log(this.otherSelectionSelectedItems.find(itm => itm.id == itemData.id) ? true : false)
    return this.otherSelectionSelectedItems.find(itm => itm.id == itemData.id) ? true : false;
  }
  calculateTotalOrder() {
    var total = 0;
    this.otherSelectionSelectedItems.forEach((itemData: any) => {
      var priceOtherSelection =
        itemData.productSalePrice && itemData.productSalePrice !== 0
          ? itemData.productSalePrice
          : itemData.productPrice;

      if (priceOtherSelection) total += priceOtherSelection * itemData.quantity;
    });

    if(this.selectedVariationItem){
    
    var priceVariation =
      this.selectedVariationItem.salePrice &&
      this.selectedVariationItem.salePrice !== 0
        ? this.selectedVariationItem.salePrice
        : this.selectedVariationItem.price;

    if (priceVariation) total += priceVariation;
    }else{
 
      var price =
      this.itemObject.productSalePrice &&
      this.itemObject.productSalePrice !== 0
        ? this.itemObject.productSalePrice
        : this.itemObject.productPrice;

    if (price) total += price;
    }

    this.totalOrder = total;
  }
  incrementOtherSelectionItem(itemData: any) {
    var item = this.otherSelectionSelectedItems.find(
      (item) => item.id == itemData.id
    );
    if (!item) {
      this.otherSelectionSelectedItems.push(itemData);
      itemData.quantity = 1;
      this.otherSelectionSelectedItems.find((item) => item.id == itemData.id);
    }
    if (item) {
      item.quantity += 1;
    }
    this.calculateTotalOrder();
  }

  decrementOtherSelectionItem(itemData: any) {
    const item = this.otherSelectionSelectedItems.find(
      (item) => item.id == itemData.id
    );
    if (item) {
      item.quantity -= 1;

      if (item.quantity == 0) {
        const index = this.otherSelectionSelectedItems.findIndex(
          (item) => item.id == itemData.id
        );
        if (index !== -1) {
          this.otherSelectionSelectedItems.splice(index, 1);
        }
      }
    }
    this.calculateTotalOrder();
  }
  closeModal() {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.variationSelectionItems = this.getParsed(
      this.itemObject.variationSelectionItemsSerialized
    );
    this.itemObjectOtherSelectionOnlyIds = this.getParsed(
      this.itemObject.otherSelectionSerialized
    );

    for (let index = 0; index < this.variationSelectionItems.length; index++) {
      const item = this.variationSelectionItems[index];
      if (
        (item.price === this.itemObject.productPrice &&
          item.salePrice === this.itemObject.productSalePrice) ||
        (index !== 0 && item.price === this.itemObject.productPrice)
      ) {
        this.updateSelectedVariationItem(item);
      }
      // Perform any actions you need with the item inside the loop
    }

    this.http.get<any[]>(`${environment.apiUrl}/api/addons/all/`).subscribe(
      (response) => {
        this.addonsLoading = false;

        this.itemObjectOtherSelectionOnlyIds.forEach((item: any) => {
          var addonItems: any[] = [];
          item.data.forEach((id: any) => {
            var addonItem = response.find(
              (addonItem_) => addonItem_.id == id.replace('id-', '')
            );
            if (addonItem) addonItems.push(addonItem);
          });
          if (addonItems.length > 0) {
            this.itemObjectOtherSelection.push({
              title: item.title,
              data: addonItems,
            });
          }
        });
      },
      () => {
        // This block will be executed when the request is complete (success or error)
        this.addonsLoading = false; // Set loading to false when the request is complete
      }
    );
    this.calculateTotalOrder();
  }
  quantity: number = 1; // Initial quantity
  getParsed(item: any) {
    if (item) {
      try {
        return JSON.parse(item) || [];
      } catch (error) {
        return [];
      }
    } else {
      return [];
    }
  }
  incrementQuantity() {
    this.quantity++; // Increment the quantity
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--; // Decrement the quantity, but ensure it doesn't go below 1
    }
  }

  updateSelectedVariationItem(item: any): void {
    this.selectedVariationItem = item;
    this.calculateTotalOrder();
  }

  getImagePath(path: string): string {
    // Assuming the images are stored in the assets folder
    return `${environment.apiUrl}/images/${path}`;
  }
  checkout() {
    // Handle the location change here
    window.location.href = 'https://www.ubereats.com/'; // Replace 'your-checkout-url' with your actual checkout URL
  }
}
