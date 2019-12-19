import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { AddContractorComponent } from './add-contractor/add-contractor.component';
import { EditContractorComponent } from './edit-contractor/edit-contractor.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalService } from '../../confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.scss']
})
export class ContractorListComponent implements OnInit, OnDestroy
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
      this.GetContractorListWithPaging();
    }
  }

  private GetContractorListWithPaging(): void
  {
    this.sub = this.aService.GetContractorListWithPaging(this.page, this.itemsPerPage).subscribe(x =>
    {
      this.dataList = x['DataList'];
      this.totalItems = x['TotalItem'];
    });
  }

  ngOnInit()
  {
    this.GetContractorListWithPaging();
  }

  // private loadContractorList(): void
  // {
  //   this.sub = this.aService.GetContractorList().subscribe(x =>
  //   {
  //     this.dataList = x;
  //   });
  // }

  ngOnDestroy()
  {
    // this.sub.unsubscribe();
  }

  public openContractorEditPopup(id: any)
  {
    const modalRef = this.modalService.open(EditContractorComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<EditContractorComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.GetContractorListWithPaging();
    }).catch((result) =>
    {
      console.log(result);
    });
  }

  public openContractorAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddContractorComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddContractorComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.GetContractorListWithPaging();
    }).catch((result) =>
    {
      console.log(result);
    });
  }

  public openConfirmationDialog(id)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Delete This Contractor?')
      .then((confirmed) => this.deleteContractor(confirm, id))
      .catch(() => console.log('dismissed'));
  }
  deleteContractor(confirm, id)
  {
    if (confirm)
    {
      this.sub = this.aService.DeleteContractor(id).subscribe(x =>
      {
        if (x.Success)
        {
          this.GetContractorListWithPaging();
          this.toasterService.success("Project Deleted Successfully", 'Success');
        }
        else
        {
          this.toasterService.error("Something Error Happened. Try again later", 'Error');
        }
      });
    }
  }

}
