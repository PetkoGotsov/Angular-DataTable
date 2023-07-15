import { Injectable } from '@angular/core';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {

  constructor() { }

  filter(dataTablesParameters: any, list: any): any {
    var order = dataTablesParameters.order ? dataTablesParameters.order[0] : null;
    var search = dataTablesParameters.search ? dataTablesParameters.search.value : null;
    var filtered = false;
    if (search) {
      list = list.filter((item: any) => dataTablesParameters.columns.some((field : any) => item[field.data].toString().includes(search))); 
      filtered = true; 
    }
    if (order) {
      var propertyToSortBy = dataTablesParameters.columns[order.column].data;
      order.dir === "asc" ? list.sort((a: any, b: any) => (a[propertyToSortBy] < b[propertyToSortBy] ? -1 : 1)) :
        list.sort((a: any, b: any) => (a[propertyToSortBy] > b[propertyToSortBy] ? -1 : 1));
    }
    return {list: list.slice(dataTablesParameters.start, dataTablesParameters.start + dataTablesParameters.length), filtered: filtered, length: list.length};
  }
}
