import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { AddStageComponent } from './add-stage/add-stage.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalService } from '../../confirm-modal/confirm-modal.service';
import { EditStageComponent } from './edit-stage/edit-stage.component';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.scss']
})
export class StageListComponent implements OnInit, OnDestroy
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
    private ConfirmationModalService: ConfirmationModalService,

  )
  {

  }

  loadPage(page: number)
  {
    if (page !== this.previousPage)
    {
      this.previousPage = page;
      this.loadStageList();
    }
  }


  ngOnInit()
  {
    this.loadStageList();
  }

  private loadStageList(): void
  {
    // var pageSetting = {
    //   CurrentPage: this.page,
    //   PageSize: this.itemsPerPage
    // }
    this.sub = this.aService.GetStageListWithPaging(this.page, this.itemsPerPage).subscribe(x =>
    {
      this.dataList = x['DataList'];
      this.totalItems = x['TotalItem'];
    });
  }



  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  public openConfirmationDialog(id)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Delete This Stage?')
      .then((confirmed) => this.deleteStage(confirm, id))
      .catch(() => console.log('dismissed'));
  }
  deleteStage(confirm, id)
  {
    if (confirm)
    {
      this.sub = this.aService.DeleteStage(id).subscribe(x =>
      {
        if (x.Success)
        {
          this.loadStageList();
          this.toasterService.success("Stage Deleted Successfully", 'Success');
        }
        else
        {
          this.toasterService.error(x.Message, 'Error');
        }
      });
    }
  }

  public openStageAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddStageComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddStageComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.loadStageList();
    }).catch((result) =>
    {
      console.log(result);
    });
  }

  public openStageEditPopup(id: string)
  {
    const modalRef = this.modalService.open(EditStageComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<EditStageComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.loadStageList();
    }).catch((result) =>
    {
      console.log(result);
    });
  }

}
