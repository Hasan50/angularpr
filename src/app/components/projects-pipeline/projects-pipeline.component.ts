import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ConfirmationModalService } from '../../confirm-modal/confirm-modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects-pipeline',
  templateUrl: './projects-pipeline.component.html',
  styleUrls: ['./projects-pipeline.component.scss']
})
export class ProjectsPipelineComponent implements OnInit, OnDestroy
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
    this.loadProjectLiveListWithPaging();
  }

  // private loadProjectList(): void
  // {
  //   this.sub = this.aService.GetProjectPrebidList().subscribe(x =>
  //   {
  //     this.dataList = x;
  //   });
  // }

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

  public openConfirmationDialog(id)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Change this project to live Project?')
      .then((confirmed) => this.updateStatus(confirm, id))
      .catch(() => console.log('dismissed'));
  }
  updateStatus(confirm, id)
  {
    if (confirm)
    {
      this.sub = this.aService.UpdateProjectStatusToLive(id).subscribe(x =>
      {
        if (x.Success)
        {
          this.loadProjectLiveListWithPaging();
          this.toasterService.success("Live Project Added Successfully", 'Success');
        }
        else
        {
          this.toasterService.error("Something Error Happened. Try again later", 'Error');
        }
      });
    }
  }

  public openCancelDialog(id)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Reject this project?')
      .then((confirmed) => this.updateStatusToCancelled(confirm, id))
      .catch(() => console.log('dismissed'));
  }

  updateStatusToCancelled(confirm, id)
  {
    if (confirm)
    {
      this.sub = this.aService.UpdateProjectStatusToCancelled(id).subscribe(x =>
      {
        if (x.Success)
        {
          this.loadProjectLiveListWithPaging();
          this.toasterService.success("Project Rejection Successfull", 'Success');
        }
        else
        {
          this.toasterService.error("Something Error Happened. Try again later", 'Error');
        }
      });
    }
  }
}
