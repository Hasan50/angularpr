import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import { AddProjectByClientComponent } from './add-project-by-client/add-project-by-client.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalService } from '../../../confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-client-side-pm',
  templateUrl: './client-side-pm.component.html',
  styleUrls: ['./client-side-pm.component.scss']
})
export class ClientSidePmComponent implements OnInit, OnDestroy
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
    this.loadProjectListByClientIdWithPaging();
  }

  loadPage(page: number)
  {
    if (page !== this.previousPage)
    {
      this.previousPage = page;
      this.loadProjectListByClientIdWithPaging();
    }
  }

  // private loadProjectList(): void
  // {
  //   this.sub = this.aService.GetProjectListByClientId(this.userId).subscribe(x =>
  //   {
  //     this.dataList = x;
  //   });
  // }

  private loadProjectListByClientIdWithPaging(): void
  {
    this.sub = this.aService.GetProjectListByClientIdWithPaging(this.userId, this.page, this.itemsPerPage).subscribe(x =>
    {
      this.dataList = x['DataList'];
      this.totalItems = x['TotalItem'];
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  public openClientProjectAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddProjectByClientComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddProjectByClientComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.loadProjectListByClientIdWithPaging();
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  public openConfirmationDialog(id)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Delete this project?')
      .then((confirmed) => this.updateStatus(confirm, id))
      .catch(() => console.log('dismissed'));
  }
  updateStatus(confirm, id)
  {
    if (confirm)
    {
      this.sub = this.aService.DeleteProject(id).subscribe(x =>
      {
        if (x.Success)
        {
          this.loadProjectListByClientIdWithPaging();
          this.toasterService.success("Project Deleted Successfully", 'Success');
        }
        else
        {
          this.toasterService.error(x.Message, 'Error');
        }
      });
    }
  }
}
