import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { AddProjectStageComponent } from './add-project-stage/add-project-stage.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

@Component({
  selector: 'app-project-stage',
  templateUrl: './project-stage.component.html',
  styleUrls: ['./project-stage.component.scss']
})
export class ProjectStageComponent implements OnInit, OnDestroy
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
  private loadStageList(): void
  {
    this.sub = this.aService.GetStageList().subscribe(x =>
    {
      this.dataList = x;
    });
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
    this.loadStageList();
    this.GetMasterData();
  }
  onClientChange(clientId)
  {
    this.clientId = clientId;
    this.sub = this.aService.GetProjectListByClientName(this.clientId).subscribe(x => { this.ProjectList = x; });

  }

  private loadProjectList(): void
  {
    this.sub = this.aService.GetProjectList().subscribe(x =>
    {
      this.dataList = x;
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  public openProjectStageAddOrEditPopup(model: any)
  {
    const modalRef = this.modalService.open(AddProjectStageComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = model;
    this.popupModel.ClientId = this.clientId;
    this.popupModel.ProjectId = this.projectId;
    (<AddProjectStageComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.loadProjectList();
    }).catch((result) =>
    {
      console.log(result);
    });
  }

}
