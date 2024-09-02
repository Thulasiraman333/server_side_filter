import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-server-side-pagination',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './server-side-pagination.component.html',
  styleUrl: './server-side-pagination.component.css'
})
export class ServerSidePaginationComponent {

  categoryName: string = '';
  productId: string = '';
  productName: string = '';
  pageNumber: number = 1;
  pageSize: number = 5;
  sortBy: string = 'productId';
  sortOrder: string = 'asc';
  productList: any = [];
  totalRecords: number = 0;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.OnSearch();
    this.getTotal();
  }

  OnSearch() {
    let params = new HttpParams()
      .set('pageNumber', this.pageNumber.toString())
      .set('pageSize', this.pageSize.toString())
      .set('sortBy', this.sortBy.toString())
      .set('sortOrder', this.sortOrder.toString())

    if (this.categoryName !== '') {
      params = params.set('category', this.categoryName)
    }
    if (this.productId) {
      params = params.set('productId', this.productId)
    }
    if (this.productName != "") {
      params = params.set('shortName', this.productName)
    }

    this.http.get('https://projectapi.gerasim.in/api/Products', { params }).subscribe((res: any) => {
      this.productList = res;
    })
  }

  onSort(fieldName: string) {
    this.sortBy = fieldName;
    this.sortOrder = this.sortOrder == 'asc' ? 'desc' : 'asc';
    this.OnSearch();
  }

  getTotal() {
    this.http.get('https://projectapi.gerasim.in/api/Products/getTotalProduct').subscribe((res: any) => {
      this.totalRecords = res;
    })
  }

  getPageNumbers() {
    const totalPages = Math.ceil(this.totalRecords / this.pageSize);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  onPageChange(pageNo: number) {
    this.pageNumber = pageNo;
    this.OnSearch();
  }

  getValue() {
    return Math.ceil(this.totalRecords / this.pageSize);
  }
}
