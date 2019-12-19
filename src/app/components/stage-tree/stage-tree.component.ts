import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { AddStageTreeComponent, } from './add-stage-tree/add-stage-tree.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ConfirmationModalService } from '../../confirm-modal/confirm-modal.service';
import { ToastrService } from 'ngx-toastr';
import { EditStageTreeComponent } from './edit-stage-tree/edit-stage-tree.component';
@Component({
  selector: 'app-stage-tree',
  templateUrl: './stage-tree.component.html',
  styleUrls: ['./stage-tree.component.scss']
})
export class StageTreeComponent implements OnInit, OnDestroy
{

  private sub: any;
  public dataList: any = [];
  popupModel: any = { Id: "0" };

  @ViewChild('content') content: ElementRef;

  constructor(
    private aService: ApplicationService,
    private modalService: NgbModal,
    private router: Router,

    private toasterService: ToastrService,
    private ConfirmationModalService: ConfirmationModalService, )
  {

  }

  ngOnInit()
  {
    this.loadStageTreeList();
  }

  private loadStageTreeList(): void
  {
    this.sub = this.aService.GetStageTreeList().subscribe(x =>
    {
      this.dataList = x;
    });
  }

  ngOnDestroy()
  {
    // this.sub.unsubscribe();
  }

  public openStageTreeAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddStageTreeComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddStageTreeComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.loadStageTreeList();
    }).catch((result) =>
    {
      console.log(result);
    });
  }

  public openConfirmationDialog(id)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Delete This Stage?')
      .then((confirmed) => this.deleteStageTree(confirm, id))
      .catch(() => console.log('dismissed'));
  }

  deleteStageTree(confirm, id)
  {
    if (confirm)
    {
      this.sub = this.aService.DeleteStageTree(id).subscribe(x =>
      {
        if (x.Success)
        {
          this.loadStageTreeList();
          this.toasterService.success("Stage Deleted Successfully", 'Success');
        }
        else
        {
          this.toasterService.error(x.Message, 'Error');
        }
      });
    }
  }

  public openStageTreeEditPopup(id: string)
  {
    const modalRef = this.modalService.open(EditStageTreeComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<EditStageTreeComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.loadStageTreeList();
    }).catch((result) =>
    {
      console.log(result);
    });
  }
}

