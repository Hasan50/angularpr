import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalService } from '../../confirm-modal/confirm-modal.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { ContractorListModalComponent } from './contractor-list-modal/contractor-list-modal.component';
import { StageTreeConnectComponent } from '../stage-tree-connect/stage-tree-connect.component';
import { DocumentsModalComponent } from './documents-modal/documents-modal.component';
import { AppConfig } from '../../app.config';
import { DOCUMENT } from '@angular/common';


@Component({
  templateUrl: './admin-live-project.component.html',
  styleUrls: ['./admin-live-project.component.scss']
})
export class AdminLiveProjectComponent implements OnInit, OnDestroy
{

  private sub: any;
  public dataList: any = [];
  private userId: string;
  popupModel: any = { Id: "0" };
  rating = {};

  itemsPerPage: number = 10;
  totalItems: any;
  page: any = 1;
  previousPage: any;

  @ViewChild('content') content: ElementRef;

  constructor(
    private aService: ApplicationService,
    private modalService: NgbModal,
    private router: Router,
    private config: AppConfig,
    private ConfirmationModalService: ConfirmationModalService,
    private toasterService: ToastrService,
    @Inject(DOCUMENT) private document: Document,

  )
  {
    this.userId = localStorage.getItem('userKey');
  }

  loadPage(page: number)
  {
    if (page !== this.previousPage)
    {
      this.previousPage = page;
      this.loadProjectLiveListWithPaging();
    }
  }



  ngOnInit()
  {
    this.loadProjectLiveListWithPaging();
  }


  // private loadProjectList(): void
  // {
  //   this.sub = this.aService.GetProjectLiveList().subscribe(x =>
  //   {
  //     this.dataList = x;
  //     this.dataList.forEach(element =>
  //     {
  //       this.rating[element.Id] = element.ProjectRating;
  //     });
  //   });
  // }

  private loadProjectLiveListWithPaging(): void
  {
    this.sub = this.aService.GetProjectLiveListWithPaging(this.page, this.itemsPerPage).subscribe(x =>
    {
      this.dataList = x['DataList'];
      this.totalItems = x['TotalItem'];
      this.dataList.forEach(element =>
      {
        this.rating[element.Id] = element.ProjectRating;
      });
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  public openContractorList(id: string)
  {
    const modalRef = this.modalService.open(ContractorListModalComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<ContractorListModalComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {

    }).catch((result) =>
    {
      console.log(result);
    });
  }

  public openStatusModal(id: string)
  {
    this.router.navigate(['stage-tree-connect', id]);
  }

  public openDocumentsModal(id: string)
  {
    const modalRef = this.modalService.open(DocumentsModalComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<DocumentsModalComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {

    }).catch((result) =>
    {
      console.log(result);
    });
  }

  public openConfirmationDialog(id)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Change this project to Completed Project?')
      .then((confirmed) => this.updateStatus(confirm, id))
      .catch(() => console.log('dismissed'));
  }

  updateStatus(confirm, id)
  {
    if (confirm)
    {
      this.sub = this.aService.UpdateProjectStatusToComplete(id).subscribe(x =>
      {
        if (x.Success)
        {
          this.loadProjectLiveListWithPaging();
          this.toasterService.success("Project Updated to Complete Successfully", 'Success');
        }
        else
        {
          this.toasterService.error("Something Error Happened. Try again later", 'Error');
        }
      });
    }
  }
}
