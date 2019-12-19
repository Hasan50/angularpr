import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectContractorModel } from '../../../models/projectContractorModel';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-client-side-status-modal',
  templateUrl: './client-side-status-modal.component.html',
  styleUrls: ['./client-side-status-modal.component.scss']
})
export class ClientSideStatusModalComponent implements OnInit
{
  options: FormGroup;
  private sub: any;
  private userId: string;
  ProjectOb: ProjectContractorModel;

  public dataList: any = [];
  public selectedDataList: any = [];
  public ProjectContractorList: any = [];
  popupModel: any = { Id: "0", ClientId: null, ProjectId: null };

  @ViewChild('content') content: ElementRef; public contractorList: any = [];


  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) 
  {
    this.ProjectOb = new ProjectContractorModel();
    this.userId = localStorage.getItem('userKey');
  }

  GetStatusListByProjectId()
  {
    this.sub = this.aService.GetContractorListByProjectId(this.popupModel.Id).subscribe(x =>
    {
      this.contractorList = x;
    });
  }

  ngOnInit()
  {
    this.GetStatusListByProjectId();
    this.loadContractorList();
  }

  private loadContractorList(): void
  {
    this.sub = this.aService.GetContractorList().subscribe(x =>
    {
      this.dataList = x;
    });
  }

  // public SaveOrUpdate()
  // {
  //   if (this.popupModel.Id != "0")
  //   {
  //     this.SaveProjectContractor();
  //   }
  //   // else
  //   // {
  //   //   this.UpdateUser();
  //   // }
  // }

  scroll(el: HTMLElement)
  {
    el.scrollIntoView();
  }

  // private SaveProjectContractor()
  // {
  //   this.selectedDataList = this.dataList.filter(item => item.IsSelect === true);
  //   for (let index = 0; index < this.selectedDataList.length; index++)
  //   {
  //     this.ProjectOb =
  //       {
  //         Id: null,
  //         ProjectId: this.popupModel.Id,
  //         ContractorId: this.selectedDataList[index].Id,
  //         UpdatedAt: null,
  //         UpdatedById: this.userId,
  //         CreatedAt: null,
  //         CreatedById: this.userId,
  //       }
  //     this.ProjectContractorList.push(this.ProjectOb);
  //     this.sub = this.aService.SaveProjectContractor(this.ProjectContractorList).subscribe(x =>
  //     {
  //       if (x.Success)
  //       {
  //         this.selectedDataList = [];
  //         this.ProjectContractorList = [];
  //         this.GetStatusListByProjectId();
  //         this.toasterService.success("Contractor Added Successfully", 'Success');
  //       }
  //       else
  //       {
  //         this.selectedDataList = [];
  //         this.ProjectContractorList = [];
  //         this.toasterService.error("Something Error Happened. Try again later", 'Error');
  //       }


  //     });
  //   }
  //   // this.sub = this.aService.SaveProject(this.ProjectOb).subscribe(x =>
  //   // {
  //   //   if (x.Success)
  //   //   {
  //   //     this.toasterService.success("Project Created Successfully", 'Success');
  //   //   }
  //   //   else
  //   //   {
  //   //     this.toasterService.error("Something Error Happened. Try again later", 'Error');
  //   //   }

  //   //   this.activeModal.close();
  //   // });
  // }

  ngOnDestroy()
  {
    // this.sub.unsubscribe();
  }
}
