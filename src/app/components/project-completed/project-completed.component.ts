import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ConfirmationModalService } from '../../confirm-modal/confirm-modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-completed',
  templateUrl: './project-completed.component.html',
  styleUrls: ['./project-completed.component.scss']
})
export class ProjectCompletedComponent implements OnInit, OnDestroy
{
  private sub: any;
  public dataList: any = [];
  private userId: string;
  popupModel: any = { Id: "0" };

  itemsPerPage: number = 10;
  totalItems: any;
  page: any = 1;
  previousPage: any;


  @ViewChild('content') content: ElementRef;
  constructor(
    private aService: ApplicationService,
    private modalService: NgbModal,
    private router: Router,
    private toasterService: ToastrService,
    private ConfirmationModalService: ConfirmationModalService
  )
  {
    this.userId = localStorage.getItem('userKey');
  }

  ngOnInit()
  {
    this.loadProjectList();
  }

  private loadProjectList(): void
  {
    this.sub = this.aService.GetProjectCompletedList().subscribe(x =>
    {
      this.dataList = x;
    });
  }

  loadPage(page: number)
  {
    if (page !== this.previousPage)
    {
      this.previousPage = page;
      this.loadProjectLiveListWithPaging();
    }
  }
  private loadProjectLiveListWithPaging(): void
  {
    this.sub = this.aService.GetProjectPrebidListWithPaging(this.page, this.itemsPerPage).subscribe(x =>
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
