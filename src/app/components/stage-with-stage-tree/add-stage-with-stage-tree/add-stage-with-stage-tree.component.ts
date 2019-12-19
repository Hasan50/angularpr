import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StageWithStageTreeModel } from '../../../models/StageWithStageTreeModel';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-stage-with-stage-tree',
  templateUrl: './add-stage-with-stage-tree.component.html',
  styleUrls: ['./add-stage-with-stage-tree.component.scss']
})
export class AddStageWithStageTreeComponent implements OnInit, OnDestroy
{
  options: FormGroup;
  private sub: any;
  private userId: string;
  ProjectOb: StageWithStageTreeModel;

  public dataList: any = [];
  public selectedDataList: any = [];
  public ProjectStatusList: any = [];
  popupModel: any = { Id: "0", StageTreeId: null };

  @ViewChild('content') content: ElementRef;
  constructor(
    private aService: ApplicationService,
    public activeModal: NgbActiveModal,
    private toasterService: ToastrService
  )
  {
    this.userId = localStorage.getItem('userKey');
    this.ProjectOb = new StageWithStageTreeModel();
  }

  ngOnInit()
  {
    this.loadStageList();
  }

  onChange(item)
  {
    item.IsSelect = !item.IsSelect;
  }

  private loadStageList(): void
  {
    this.sub = this.aService.GetStageList().subscribe(x =>
    {
      this.dataList = x;
    });
  }

  public SaveOrUpdate()
  {
    if (this.popupModel.Id == "0")
    {
      this.SaveProjectStage();
    }
    // else
    // {
    //   this.UpdateUser();
    // }
  }

  private SaveProjectStage()
  {
    this.selectedDataList = this.dataList.filter(item => item.IsSelect === true);
    for (let index = 0; index < this.selectedDataList.length; index++)
    {
      this.ProjectOb =
        {
          Id: null,
          StageId: this.selectedDataList[index].Id,
          StageTreeId: this.popupModel.StageTreeId,
          CreatedById: this.userId,
          CreatedAt: null,
          UpdatedAt: null,
          UpdatedById: this.userId,
        }
      this.ProjectStatusList.push(this.ProjectOb);
    }
    this.sub = this.aService.SaveStageWithStageTree(this.ProjectStatusList).subscribe(x =>
    {
      if (x.Success)
      {
        this.toasterService.success("Stage Added Successfully", 'Success');
      }
      else
      {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });

    // this.sub = this.aService.SaveProject(this.ProjectOb).subscribe(x =>
    // {
    //   if (x.Success)
    //   {
    //     this.toasterService.success("Project Created Successfully", 'Success');
    //   }
    //   else
    //   {
    //     this.toasterService.error("Something Error Happened. Try again later", 'Error');
    //   }

    //   this.activeModal.close();
    // });
  }

  ngOnDestroy()
  {
    // this.sub.unsubscribe();
  }
}
