import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";


@Component({
  selector: 'app-pre-bid-projects',
  templateUrl: './pre-bid-projects.component.html',
  styleUrls: ['./pre-bid-projects.component.scss']
})
export class PreBidProjectsComponent implements OnInit, OnDestroy
{
  private sub: any;
  public dataList: any = [];
  private userId: string;
  popupModel: any = { Id: "0" };

  @ViewChild('content') content: ElementRef;

  itemsPerPage: number = 10;
  totalItems: any;
  page: any = 1;
  previousPage: any;

  constructor(
    private aService: ApplicationService,
    private modalService: NgbModal,
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
      this.loadProjectPrebidListWithPaging();
    }
  }

  ngOnInit()
  {
    this.loadProjectPrebidListWithPaging();
  }

  // private loadProjectList(): void
  // {
  //   this.sub = this.aService.GetProjectListByClientIdAndStatusIdPrebId(this.userId).subscribe(x =>
  //   {
  //     this.dataList = x;
  //   });
  // }

  private loadProjectPrebidListWithPaging(): void
  {
    this.sub = this.aService.GetProjectListByClientIdAndStatusIdPrebIdWithPaging(this.userId, this.page, this.itemsPerPage).subscribe(x =>
    {
      this.dataList = x['DataList'];
      this.totalItems = x['TotalItem'];
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }
}
