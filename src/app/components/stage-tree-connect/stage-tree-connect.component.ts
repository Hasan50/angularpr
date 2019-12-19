import { Component, OnInit, OnDestroy, ViewChild, Input, ElementRef, Inject, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import 'leader-line';
import { ApplicationService } from 'app/services';
declare let LeaderLine: any;
import { ConfirmationModalService } from '../../confirm-modal/confirm-modal.service';
import { ToastrService } from 'ngx-toastr';
import { AgamiProjectModel } from '../../models/agamiProjectModel';


@Component({
  selector: 'app-stage-tree-connect',
  templateUrl: './stage-tree-connect.component.html',
  styleUrls: ['./stage-tree-connect.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StageTreeConnectComponent implements OnInit, OnDestroy
{
  sub: any;
  vars = {};
  projectId: any;
  dataList: [];
  labelList: [];
  lavelWithSerialList: [];
  @Input() popupModel: any;
  ProjectOb: AgamiProjectModel;

  aModel: any = { Id: "0", StageId: null, ProjectId: null };
  myTag = this.elRef.nativeElement.querySelector('svg');
  constructor(
    @Inject(DOCUMENT) private document,
    private aService: ApplicationService,
    private elRef: ElementRef,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private ConfirmationModalService: ConfirmationModalService
  )
  {
    this.ProjectOb = new AgamiProjectModel();
  }

  public openConfirmationDialog(StageId)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Change this Stage Status to Complete?')
      .then((confirmed) => this.UpdateProjectStageToComplete(confirm, this.projectId, StageId))
      .catch(() => console.log('dismissed'));
  }
  UpdateProjectStageToComplete(confirm, projectId, StageId)
  {
    if (confirm)
    {
      this.aModel.ProjectId = projectId;
      this.aModel.StageId = StageId;

      this.sub = this.aService.UpdateProjectStageToComplete(this.aModel).subscribe(x =>
      {
        if (x)
        {
          this.toasterService.success("Live Project Added Successfully", 'Success');
          this.removeLine();
          this.loadStageList(this.projectId);
          // this.getProjectDetail();
          // this.InitData();
          // this.ngOnInit();       
        }
        else
        {
          this.toasterService.error("Something Error Happened. Try again later", 'Error');
        }
      });
    }
  }
  ngOnInit()
  {
    this.sub = this.route.params.subscribe(params =>
    {
      this.projectId = params['id'];
    })
    this.loadStageList(this.projectId);
    this.getProjectDetail();
    // setTimeout(() =>
    // {
    //   this.drawLine();
    // }, 1000);
  }
  getProjectDetail()
  {
    this.sub = this.aService.GetProjectDetailsById(this.projectId).subscribe(x =>
    {
      this.ProjectOb = x;
    });
  }

  // InitData()
  // {
  //   this.sub = this.route.params.subscribe(params =>
  //   {
  //     this.projectId = params['id'];
  //   })
  //   this.loadStageList(this.projectId);
  //   setTimeout(() =>
  //   {
  //     this.drawLine();
  //   }, 200);
  // }
  private async loadStageList(projectId: any)
  {
    this.sub = this.aService.GetStageListByProjectId(projectId).subscribe(x =>
    {
      this.dataList = x.DataList;
      this.labelList = x.LavelList;
      this.lavelWithSerialList = x.LavelWithSerialList;
      setTimeout(() =>
      {
        this.drawLine();
      }, 1000);
    });
  }
  drawLine()
  {
    if (this.lavelWithSerialList != null)
    {
      for (let index = 0; index < this.lavelWithSerialList.length; index++)
      {
        for (let y = 0; y < this.lavelWithSerialList[index]['SerialList']['length']; y++)
        {
          const element = this.lavelWithSerialList[index]['SerialList'][y];
          if (element['ParentId'] != null)
          {
            this.vars[String(element['StageId'])] = new LeaderLine(this.document.getElementById(element['ParentId']), this.document.getElementById(element['StageId']))
          }
        }
      }
    }

  }

  removeLine()
  {
    for (let index = 0; index < this.lavelWithSerialList.length; index++)
    {
      for (let y = 0; y < this.lavelWithSerialList[index]['SerialList']['length']; y++)
      {
        const element = this.lavelWithSerialList[index]['SerialList'][y];
        if (element['ParentId'] != null)
        {
          this.vars[String(element['StageId'])].remove();
        }
      }

    }
    this.vars = {};
  }

  ngOnDestroy()
  {
    this.removeLine();

    // if(this.lavelWithSerialList != null || this.lavelWithSerialList.length > 0){

    //// Working Code

    // for (let index = 0; index < this.lavelWithSerialList.length; index++)
    // {
    //   for (let y = 0; y < this.lavelWithSerialList[index]['SerialList']['length']; y++)
    //   {
    //     const element = this.lavelWithSerialList[index]['SerialList'][y];
    //     if (element['ParentId'] != null)
    //     {
    //       this.vars[String(element['StageId'])].remove();
    //     }
    //   }

    // }
    // this.vars = {};

    // document.getElementById('leader-line').setAttribute("style", "display: none !important");
    // $('.leader-line').remove();

    // }


    // if (!this.myTag.classList.contains('leader-line'))
    // {
    //   this.myTag.classList.remove('leader-line');
    // }
  }






  // ngOnInit()
  // {
  //   this.sub = this.route.params.subscribe(params =>
  //   {
  //     this.projectId = params['id'];
  //   })
  //   this.loadStageList(this.projectId);
  //   setTimeout(() =>
  //   {
  //     this.drawLine();
  //   }, 200);
  // }

  // private loadStageList(projectId: any): void
  // {
  //   this.sub = this.aService.GetStageListByProjectId(projectId).subscribe(x =>
  //   {
  //     this.dataList = x.DataList;
  //     this.labelList = x.LavelList;
  //     this.lavelWithSerialList = x.lavelWithSerialList;
  //   });
  // }
  // drawLine()
  // {
  //   for (let index = 0; index < this.lavelWithSerialList.length; index++)
  //   {
  //     for (let y = 0; y < this.lavelWithSerialList[index]['SerialList']['length']; y++)
  //     {
  //       const element = this.lavelWithSerialList[index]['SerialList'][y];
  //       if (element['ParentId'] != null)
  //       {
  //         this.vars[String(element['StageId'])] = new LeaderLine(this.document.getElementById(element['ParentId']),
  //          this.document.getElementById(element['StageId']))
  //       }
  //     }
  //   }
  // }

  // ngOnDestroy()
  // {
  //   for (let index = 0; index < this.lavelWithSerialList.length; index++)
  //   {
  //     for (let y = 0; y < this.lavelWithSerialList[index]['SerialList']['length']; y++)
  //     {
  //       const element = this.lavelWithSerialList[index]['SerialList'][y];
  //       if (element['ParentId'] != null)
  //       {
  //         this.vars[String(element['StageId'])].remove();
  //       }
  //     }
  //   }
  // }
}



