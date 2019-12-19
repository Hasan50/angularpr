import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { AddProjectContractorComponent } from './add-project-contractor/add-project-contractor.component';

@Component({
  selector: 'app-project-contractor',
  // templateUrl: ''
  templateUrl: './project-contractor.component.html',
  styleUrls: ['./project-contractor.component.scss']
})
export class ProjectContractorComponent implements OnInit, OnDestroy
{
  selectedValue: string;
  private sub: any;
  public dataList: any = [];
  popupModel: any = { Id: "0", ClientId: null, ProjectId: null };
  public clientId: any;
  public projectId: any;
  ProjectList: [];
  ClientList: [];
  @ViewChild('content') content: ElementRef;
  constructor(
    private aService: ApplicationService,
    private modalService: NgbModal,
    private router: Router
  )
  {

  }
  private GetMasterData(): void
  {
    this.sub = this.aService.GetClientDropdownList().subscribe(x =>
    {
      this.ClientList = x;
    });
    // this.sub = this.aService.GetPriorityList().subscribe(x => { this.priorityList = x; });
  }
  ngOnInit()
  {
    // this.loadProjectList();
    this.GetMasterData();

  }
  // private loadContractorList(): void
  // {
  //   this.sub = this.aService.GetContractorList().subscribe(x =>
  //   {
  //     this.dataList = x;
  //   });
  // }
  GetContractorListByProjectId(projectId)
  {
    this.sub = this.aService.GetContractorListByProjectId(projectId).subscribe(x =>
    {
      this.dataList = x;
    });
  }
  onClientChange(clientId)
  {

    this.clientId = clientId;
    this.sub = this.aService.GetProjectListByClientName(this.clientId).subscribe(x => { this.ProjectList = x; });
    this.dataList = [];
  }

  // private loadProjectList(): void
  // {
  //   this.sub = this.aService.GetProjectList().subscribe(x =>
  //   {
  //     this.dataList = x;
  //   });
  // }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  public openProjectContractorAddOrEditPopup(model: any)
  {
    const modalRef = this.modalService.open(AddProjectContractorComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = model;
    this.popupModel.ClientId = this.clientId;
    this.popupModel.ProjectId = this.projectId;
    (<AddProjectContractorComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.GetContractorListByProjectId(this.projectId)
    }).catch((result) =>
    {
      console.log(result);
    });
  }

}
