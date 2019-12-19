import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy
{

  private sub: any;
  public dataList: any = [];
  popupModel: any = { Id: 0 };
  public clientList: any = [];
  public contractorList: any = [];
  constructor(private aService: ApplicationService, private modalService: NgbModal) 
  {

  }

  ngOnInit()
  {
    this.GetExecution();
  }

  // private loadCurrentStatus(): void
  // {
  //   this.sub = this.aService.GetFileCurrentStatus().subscribe(x =>
  //   {
  //     this.dataList = x;
  //   });
  // }

  private GetExecution(): void
  {
    this.sub = this.aService.GetExecution().subscribe(x =>
    {
     
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

}


