import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy
{

  private sub: any;
  public dataList: any = [];
  private userId: string;

  popupModel: any = { Id: 0 };

  constructor(private aService: ApplicationService, private modalService: NgbModal) 
  {
    this.userId = localStorage.getItem('userKey');
  }

  ngOnInit()
  {
    this.LoadProjectCountForUser();
  }

  private LoadProjectCountForUser(): void
  {
    this.sub = this.aService.GetProjectCountForUser(this.userId).subscribe(x =>
    {
      this.dataList = x;
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

}


