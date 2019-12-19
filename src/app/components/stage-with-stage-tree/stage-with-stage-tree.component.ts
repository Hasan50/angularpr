import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { AddStageWithStageTreeComponent } from './add-stage-with-stage-tree/add-stage-with-stage-tree.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationModalService } from '../../confirm-modal/confirm-modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stage-with-stage-tree',
  templateUrl: './stage-with-stage-tree.component.html',
  styleUrls: ['./stage-with-stage-tree.component.scss']
})
export class StageWithStageTreeComponent implements OnInit, OnDestroy
{
  selectedValue: string;
  private sub: any;
  public dataList: any = [];
  stageId: any;
  @Input() popupModel: any = { Id: "0", StageTreeId: null, StageId: null };
  aModel: any = { Id: "0", StageTreeId: null, StageId: null };
  public stageTreeId: any = null;
  StageTreeList: [];
  @ViewChild('content') content: ElementRef;

  constructor(
    private aService: ApplicationService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private ConfirmationModalService: ConfirmationModalService
  )
  {

  }

  ngOnInit()
  {
    // this.sub = this.route.params.subscribe(params =>
    //   {
    //     this.stageId = params['StageId'];
    //   })

    this.LoadStageTreeDropdownList();

  }


  public openConfirmationDialog(ob)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Change this Stage Status to Complete?')
      .then((confirmed) => this.DeleteStageTreeRelation(confirm, ob.Id, this.stageTreeId))
      .catch(() => console.log('dismissed'));
  }
  DeleteStageTreeRelation(confirm, stageId, StageTreeId)
  {
    if (confirm)
    {
      this.aModel.StageId = stageId;
      this.aModel.StageTreeId = StageTreeId;

      this.sub = this.aService.DeleteStageTreeRelation(this.aModel).subscribe(x =>
      {
        if (x)
        {
          this.toasterService.success("Live Project Added Successfully", 'Success');
          this.loadStageWithStageTreeList();
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
  private loadStageWithStageTreeList(): void
  {
    this.sub = this.aService.GetStageListByStageTreeId(this.stageTreeId).subscribe(x =>
    {
      this.dataList = x;
    });
  }
  private LoadStageTreeDropdownList(): void
  {
    this.sub = this.aService.GetStageTreeDropdownList().subscribe(x =>
    {
      this.StageTreeList = x;
    });
  }
  onChange()
  {
    this.loadStageWithStageTreeList();
  }


  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }

  public openProjectStageAddOrEditPopup(model: any)
  {
    const modalRef = this.modalService.open(AddStageWithStageTreeComponent,
      { size: 'lg', backdrop: false });
    this.popupModel.Id = model;
    this.popupModel.StageTreeId = this.stageTreeId;
    (<AddStageWithStageTreeComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.loadStageWithStageTreeList();
    }).catch((result) =>
    {
      console.log(result);
    });

  }

}
