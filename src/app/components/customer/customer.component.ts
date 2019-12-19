import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCustomerComponent } from './add-customers/add-customer.component';
import { ApplicationService } from 'app/services';
import { SelectEmployeeComponent } from './employee-list/select-employee.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadCustomerList();
  }

  public openCustomerAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddCustomerComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddCustomerComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.loadCustomerList();
    }).catch((result) =>
    {
      console.log(result);
    });
  }

  private loadCustomerList(): void
  {
    this.sub = this.aService.GetCustomerList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
