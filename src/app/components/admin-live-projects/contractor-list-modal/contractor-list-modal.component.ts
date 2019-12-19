import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectContractorModel } from '../../../models/projectContractorModel';
import { FormGroup } from '@angular/forms';
import { ConfirmationModalService } from '../../../confirm-modal/confirm-modal.service';

@Component({
  selector: 'app-contractor-list-modal',
  templateUrl: './contractor-list-modal.component.html',
  styleUrls: ['./contractor-list-modal.component.scss']
})
export class ContractorListModalComponent implements OnInit
{
  options: FormGroup;
  private sub: any;
  private userId: string;
  ProjectOb: ProjectContractorModel;
  rating = {};
  public dataList: any = [];
  public selectedDataList: any = [];
  public ProjectContractorList: any = [];
  popupModel: any = { Id: "0", ClientId: null, ProjectId: null };

  @ViewChild('content') content: ElementRef; public contractorList: any = [];
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
    private ConfirmationModalService: ConfirmationModalService,

  ) 
  {
    this.ProjectOb = new ProjectContractorModel();
    this.userId = localStorage.getItem('userKey');
  }

  GetContractorListByProjectId()
  {
    this.sub = this.aService.GetContractorListByProjectId(this.popupModel.Id).subscribe(x =>
    {
      this.contractorList = x;
      this.contractorList.forEach(element =>
      {
        this.rating[element.Id] = element.Feedback;
      });
    });
  }
  public openConfirmationDialog(id)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Delete This Contractor?')
      .then((confirmed) => this.DeleteProjectContractor(confirm, id))
      .catch(() => console.log('dismissed'));
  }
  DeleteProjectContractor(confirm, id)
  {
    if (confirm)
    {
      this.sub = this.aService.DeleteProjectContractor(id).subscribe(x =>
      {
        if (x.Success)
        {
          this.GetContractorListByProjectId();
          this.toasterService.success("Contractor Deleted Successfully", 'Success');
        }
        else
        {
          this.toasterService.error("Something Error Happened. Try again later", 'Error');
        }
      });
    }
  }
  ngOnInit()
  {
    this.GetContractorListByProjectId();
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
    if (this.popupModel.Id != "0")
    {
      this.SaveProjectContractor();
    }
    // else
    // {
    //   this.UpdateUser();
    // }
  }

  scroll(el: HTMLElement)
  {
    el.scrollIntoView();
  }


  private SaveProjectContractor()
  {
    this.selectedDataList = this.dataList.filter(item => item.IsSelect === true);
    for (let index = 0; index < this.selectedDataList.length; index++)
    {
      this.ProjectOb =
        {
          Id: null,
          ProjectId: this.popupModel.Id,
          ContractorId: this.selectedDataList[index].Id,
          Feedback: null,
          UpdatedAt: null,
          UpdatedById: this.userId,
          CreatedAt: null,
          CreatedById: this.userId,
        }
      if (this.checkExistContractor(this.ProjectOb.ContractorId) === false)
      {
        this.ProjectContractorList.push(this.ProjectOb);
      }
      else this.toasterService.error("Contractor/s Already Exists in the List", 'Error');
    }
    if (this.ProjectContractorList.length > 0)
    {
      this.sub = this.aService.SaveProjectContractor(this.ProjectContractorList).subscribe(x =>
      {
        if (x.Success)
        {
          this.selectedDataList = [];
          this.ProjectContractorList = [];
          this.GetContractorListByProjectId();
          this.loadContractorList();
          this.toasterService.success("Contractor Added Successfully", 'Success');
        }
        else
        {
          this.selectedDataList = [];
          this.ProjectContractorList = [];
          this.toasterService.error("Something Error Happened. Try again later", 'Error');
        }


      });
    }
  }
  checkExistContractor(contractorId)
  {
    for (let index = 0; index < this.contractorList.length; index++)
    {
      const element = this.contractorList[index];
      if (element.ContractorId === contractorId)
      {
        return true;
      }
    }
    return false;
  }
  ngOnDestroy()
  {
    // this.sub.unsubscribe();
  }
}
