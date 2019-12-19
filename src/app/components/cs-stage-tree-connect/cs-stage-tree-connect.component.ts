import { Component, OnInit, OnDestroy, ViewChild, Input, ElementRef, Inject, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import 'leader-line';
import { from } from 'rxjs';
import { ApplicationService } from 'app/services';
declare let LeaderLine: any;
import { AgamiProjectModel } from '../../models/agamiProjectModel';

@Component({
  selector: 'app-cs-stage-tree-connect',
  templateUrl: './cs-stage-tree-connect.component.html',
  styleUrls: ['./cs-stage-tree-connect.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CSStageTreeConnectComponent implements OnInit, OnDestroy 
{
  sub: any;
  vars = {};
  projectId: any;
  dataList: [];
  labelList: [];
  lavelWithSerialList: [];
  @Input() popupModel: any;
  ProjectOb: AgamiProjectModel;
  constructor(
    @Inject(DOCUMENT) private document,
    private aService: ApplicationService,
    private elRef: ElementRef,
    private route: ActivatedRoute
  )
  {
    this.ProjectOb = new AgamiProjectModel();
  }

  ngOnInit()
  {
    this.sub = this.route.params.subscribe(params =>
    {
      this.projectId = params['id'];
    })
    this.loadStageList(this.projectId);
    this.getProjectDetail();
    setTimeout(() =>
    {
      this.drawLine();
    }, 1000);
  }
  getProjectDetail()
  {
    this.sub = this.aService.GetProjectDetailsById(this.projectId).subscribe(x =>
    {
      this.ProjectOb = x;
    });
  }
  private loadStageList(projectId: any): void
  {
    this.sub = this.aService.GetStageListByProjectId(projectId).subscribe(x =>
    {
      this.dataList = x.DataList;
      this.labelList = x.LavelList;
      this.lavelWithSerialList = x.LavelWithSerialList;
    });
  }
  drawLine()
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

  ngOnDestroy()
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

  }

}



