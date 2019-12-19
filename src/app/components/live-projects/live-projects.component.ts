import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ClientSideDocumentsModalComponent } from './client-side-documents-modal/client-side-documents-modal.component';
import { ClientSideStatusModalComponent } from './client-side-status-modal/client-side-status-modal.component';
import { ClientSideContractorListModalComponent } from './client-side-contractor-list-modal/client-side-contractor-list-modal.component';
import { FormGroup } from '@angular/forms';
import { EventEmitterService } from '../../services/eventemiter.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalService } from '../../confirm-modal/confirm-modal.service';
@Component({
  selector: 'app-live-projects',
  templateUrl: './live-projects.component.html',
  styleUrls: ['./live-projects.component.scss']
})
export class LiveProjectsComponent implements OnInit, OnDestroy
{
  currentRate = 3;
  options: FormGroup;
  private sub: any;
  public dataList: any = [];
  private userId: string;
  popupModel: any = { Id: "0" };
  rating = {};
  isProjectListUpdate = false;
  @ViewChild('content') content: ElementRef;

  itemsPerPage: number = 10;
  totalItems: any;
  page: any = 1;
  previousPage: any;

  constructor(
    // public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private modalService: NgbModal,
    private eventEmitterService: EventEmitterService,
    private router: Router
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
    this.eventEmitterService.change.subscribe(x =>
    {
      this.isProjectListUpdate = x;
      this.loadProjectLiveListWithPaging();
    });
  }

  // private loadProjectList(): void
  // {
  //   this.sub = this.aService.GetProjectListByClientIdAndStatusIdLive(this.userId).subscribe(x =>
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
    this.sub = this.aService.GetProjectListByClientIdAndStatusIdLiveWithPaging(this.userId, this.page, this.itemsPerPage).subscribe(x =>
    {
      this.dataList = x['DataList'];
      this.totalItems = x['TotalItem'];
      this.dataList.forEach(element =>
      {
        this.rating[element.Id] = element.ProjectRating;
      });
    });
  }

  public openContractorList(id: string)
  {
    const modalRef = this.modalService.open(ClientSideContractorListModalComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<ClientSideContractorListModalComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {

    }).catch((result) =>
    {
      console.log(result);
    });
  }

  public openStatusModal(id: string)
  {
    this.router.navigate(['cs-stage-tree-connect', id]);
    // const modalRef = this.modalService.open(ClientSideStatusModalComponent, { size: 'lg', backdrop: false });
    // this.popupModel.Id = id;
    // (<ClientSideStatusModalComponent>modalRef.componentInstance).popupModel = this.popupModel;
    // modalRef.result.then((result) =>
    // {

    // }).catch((result) =>
    // {
    //   console.log(result);
    // });
  }

  public openDocumentsModal(id: string)
  {
    const modalRef = this.modalService.open(ClientSideDocumentsModalComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<ClientSideDocumentsModalComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {

    }).catch((result) =>
    {
      console.log(result);
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }



}
