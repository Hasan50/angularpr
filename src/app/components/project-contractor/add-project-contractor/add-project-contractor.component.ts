import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectContractorModel } from '../../../models/projectContractorModel';

import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project-contractor',
  templateUrl: './add-project-contractor.component.html',
  styleUrls: ['./add-project-contractor.component.scss']
})
export class AddProjectContractorComponent implements OnInit, OnDestroy
{
  options: FormGroup;
  private sub: any;
  private userId: string;
  ProjectOb: ProjectContractorModel;

  public dataList: any = [];
  public selectedDataList: any = [];
  public ProjectContractorList: any = [];
  popupModel: any = { Id: "0", ClientId: null, ProjectId: null };

  @ViewChild('content') content: ElementRef;
  constructor(
    private aService: ApplicationService,
    public activeModal: NgbActiveModal,
    private toasterService: ToastrService
  )
  {
    this.userId = localStorage.getItem('userKey');
    this.ProjectOb = new ProjectContractorModel();
  }

  ngOnInit()
  {
    this.loadContractorList();
  }

  onChange(item)
  {
    item.IsSelect = !item.IsSelect;
  }

  private loadContractorList(): void
  {
    this.sub = this.aService.GetContractorList().subscribe(x =>
    {
      this.dataList = x;
    });
  }

  public SaveOrUpdate()
  {
    if (this.popupModel.Id == "0")
    {
      this.SaveProjectContractor();
    }
    // else
    // {
    //   this.UpdateUser();
    // }
  }

  private SaveProjectContractor()
  {
    this.selectedDataList = this.dataList.filter(item => item.IsSelect === true);
    for (let index = 0; index < this.selectedDataList.length; index++)
    {
      this.ProjectOb =
        {
          Id: null,
          ProjectId: this.popupModel.ProjectId,
          ContractorId: this.selectedDataList[index].Id,
          UpdatedAt: null,
          Feedback: null,
          UpdatedById: this.userId,
          CreatedAt: null,
          CreatedById: this.userId,
        }
      this.ProjectContractorList.push(this.ProjectOb);
    }
    this.sub = this.aService.SaveProjectContractor(this.ProjectContractorList).subscribe(x =>
    {
      if (x.Success)
      {
        this.toasterService.success("Contractor Added Successfully", 'Success');
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
