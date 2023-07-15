import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { FilteringService } from '../../services/filtering/filtering.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  {
  dtOptions: DataTables.Settings = {};
  allProducts: any = [];
  form = this.fb.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    price: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });
  productSelected: any = {};
  constructor(private service: ProductsService, private filtering: FilteringService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.service
          .products()
          .subscribe((response: any) => {
            var filter = this.filtering.filter(dataTablesParameters, response);
            this.allProducts = filter.list;
            callback({
              recordsTotal: response.length,
              recordsFiltered: filter.filtered ? filter.length : response.length,
              data: [{id: '', title: '', price: '', description: '', category: ''}],
            });
          });
      },
      // Set column title and data field
      columns: [
        {
          title: 'Id',
          data: 'id',
        },
        {
          title: 'Title',
          data: 'title',
        }, 
        {
          title: 'Price',
          data: 'price',
        },
        {
          title: 'Description',
          data: 'description',
        },
        {
          title: 'Category',
          data: 'category',
        }
      ],
    };
  }

  selectProduct(product: any) {
    // check if productSelected is empty, before assigning a selected product
      this.productSelected = product;

      this.form.patchValue({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category
      })
  }
  update() {
    // gets the index of the user we need to update
    let index = this.allProducts.map((u: any) => u.id).indexOf(this.productSelected.id);

    // updates the user at the index selected
    this.allProducts[index] = {
      id: this.productSelected.id,
      title: this.form.value.title!,
      price: this.form.value.price!,
      description: this.form.value.description!,
      category: this.form.value.category!
    };

    // clean up
    this.productSelected = {};
    this.form.reset();
  }
}
