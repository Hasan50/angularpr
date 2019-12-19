import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { StageTreeProjectModel } from '../../models/StageTreeProjectModel';
import { ProjectStageModel } from '../../models/projectStageModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-project-with-stage-tree',
  templateUrl: './project-with-stage-tree.component.html',
  styleUrls: ['./project-with-stage-tree.component.scss']
})
export class ProjectWithStageTreeComponent implements OnInit, OnDestroy
{
  selectedValue: string;
  private sub: any;
  public dataList: any = [];
  private userId: string;
  popupModel: any = { Id: "0", ClientId: null, ProjectId: null };
  public clientId: any;
  public projectId: any;
  public stageTreeId: any = null;
  ProjectOb: ProjectStageModel;
  StageTreeOb: StageTreeProjectModel;
  ProjectList: [];
  ClientList: [];
  StageTreeList: [];
  @ViewChild('content') content: ElementRef;
  constructor(
    private aService: ApplicationService,
    private modalService: NgbModal,
    private router: Router,
    private toasterService: ToastrService,
  )
  {
    this.StageTreeOb = new StageTreeProjectModel();
    this.userId = localStorage.getItem('userKey');
  }
  // private loadStageList(): void
  // {
  //   this.sub = this.aService.GetStageList().subscribe(x =>
  //   {
  //     this.dataList = x;
  //   });
  // }
  private GetClientData(): void
  {
    this.sub = this.aService.GetClientDropdownList().subscribe(x =>
    {
      this.ClientList = x;
    });
    // this.sub = this.aService.GetPriorityList().subscribe(x => { this.priorityList = x; });
  }
  private GetStageTreeDropdownListByCount(): void
  {
    this.sub = this.aService.GetStageTreeDropdownListByCount().subscribe(x =>
    {
      this.StageTreeList = x;
    });
  }
  
  SaveTree(ob)
  {
    this.StageTreeOb =
      {
        Id: null,
        ProjectId: ob.Id,
        StageTreeId: ob.StageTreeId,
        CreatedById: this.userId,
        UpdatedById: this.userId,
        CreatedAt: null,
        UpdatedAt: null,
      }
    this.sub = this.aService.SaveProjectWithStageTree(this.StageTreeOb).subscribe(x =>
    {
      if (x.Success)
      {
        this.onClientChange(this.clientId);
        this.toasterService.success("Stage Tree Added Successfully", 'Success');
      }
      else
      {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }
    });
  }
  ngOnInit()
  {
    this.GetStageTreeDropdownListByCount();
    // this.loadProjectList();
    this.GetClientData();
  }
  onClientChange(clientId)
  {
    this.clientId = clientId;
    this.sub = this.aService.GetProjectListWithStageTreeByClientId(this.clientId).subscribe(x => { 
      this.ProjectList = x; 
      // for (let index = 0; index < this.ProjectList.length; index++) {
      //   const element = this.ProjectList[index];
      //   this.ProjectList[index].StageTreeId=String(this.ProjectList[index].StageTreeId);
      // }
    });

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
}
