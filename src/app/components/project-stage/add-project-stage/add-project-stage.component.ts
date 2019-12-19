import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectStatusModel } from '../../../models/projectStatusModel';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project-stage',
  templateUrl: './add-project-stage.component.html',
  styleUrls: ['./add-project-stage.component.scss']
})
export class AddProjectStageComponent implements OnInit, OnDestroy
{
  options: FormGroup;
  private sub: any;
  private userId: string;
  ProjectOb: ProjectStatusModel;

  public dataList: any = [];
  public selectedDataList: any = [];
  public ProjectStatusList: any = [];
  popupModel: any = { Id: "0", ClientId: null, ProjectId: null };

  @ViewChild('content') content: ElementRef;
  constructor(
    private aService: ApplicationService,
    public activeModal: NgbActiveModal,
    private toasterService: ToastrService
  )
  {
    this.userId = localStorage.getItem('userKey');
    this.ProjectOb = new ProjectStatusModel();
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
          ProjectId: this.popupModel.ProjectId,
          StatusId: this.selectedDataList[index].Id,
          UpdatedAt: null,
          UpdatedById: this.userId,
        }
      this.ProjectStatusList.push(this.ProjectOb);
    }
    this.sub = this.aService.SaveProjectStage(this.ProjectStatusList).subscribe(x =>
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
  // checkExistStage(contractorId)
  // {
  //   for (let index = 0; index < this.contractorList.length; index++)
  //   {
  //     const element = this.contractorList[index];
  //     if (element.ContractorId === contractorId)
  //     {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  ngOnDestroy()
  {
    // this.sub.unsubscribe();
  }
}
