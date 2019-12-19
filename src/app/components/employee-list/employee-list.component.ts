import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalService } from '../../confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy
{

  private sub: any;
  public dataList: any = [];
  popupModel: any = { Id: "0" };

  itemsPerPage: number = 10;
  totalItems: any;
  page: any = 1;
  previousPage: any;

  @ViewChild('content') content: ElementRef;
  constructor(
    private aService: ApplicationService,
    private modalService: NgbModal,
    private router: Router,
    private toasterService: ToastrService,
    private ConfirmationModalService: ConfirmationModalService
  )
  {

  }

  loadPage(page: number)
  {
    if (page !== this.previousPage)
    {
      this.previousPage = page;
     // this.loadEmployeeListWithPaging();
    }
  }

  ngOnInit()
  {
    //this.loadEmployeeListWithPaging();
    this.loadEmployeeList();
  }



  // private loadEmployeeListWithPaging(): void
  // {
  //   this.sub = this.aService.GetEmployeeListWithPaging(this.page, this.itemsPerPage).subscribe(x =>
  //   {
  //     this.dataList = x['DataList'];
  //     this.totalItems = x['TotalItem'];
  //   });
  // }
  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  public openEmployeeAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddEmployeeComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddEmployeeComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     // this.loadEmployeeListWithPaging();
    }).catch((result) =>
    {
      console.log(result);
    });
  }

  public openEmployeeEditPopup(id: string)
  {
    const modalRef = this.modalService.open(EditEmployeeComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<EditEmployeeComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     this.loadEmployeeList();
    }).catch((result) =>
    {
      console.log(result);
    });
  }

  public openConfirmationDialog(id)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Delete This Employee?')
      .then((confirmed) => this.deleteEmployee(confirm, id))
      .catch(() => console.log('dismissed'));
  }

  deleteEmployee(confirm, id)
  {
    if (confirm)
    {
      // this.sub = this.aService.DeleteEmployee(id).subscribe(x =>
      // {
      //   if (x.Success)
      //   {
      //    // this.loadEmployeeListWithPaging();
      //     this.toasterService.success("Employee Deleted Successfully", 'Success');
      //   }
      //   else
      //   {
      //     this.toasterService.error("Something Error Happened. Try again later", 'Error');
      //   }
      // });
    }
    
  }
  private loadEmployeeList(): void
  {
    this.sub = this.aService.GetEmployeeList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
