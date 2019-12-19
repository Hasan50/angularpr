import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContractorRegistrationModel } from '../../../models/contractorRegistrationModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-contractor',
  templateUrl: './edit-contractor.component.html',
  styleUrls: ['./edit-contractor.component.scss']
})
export class EditContractorComponent implements OnInit, OnDestroy
{
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  ContractorOb: ContractorRegistrationModel;
  private userId: string;
  submitted =false;

  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService
  ) 
  {
    this.userId = localStorage.getItem('userKey');
    this.ContractorOb = new ContractorRegistrationModel();
    this.ContractorOb.IsActive = true;
  }

  ngOnInit()
  {
    if (this.popupModel.Id != "0")
    { this.GetContractorDetailsById() }
  }
  GetContractorDetailsById()
  {
    this.sub = this.aService.GetContractorDetailsById(this.popupModel.Id).subscribe(x =>
    {
      this.ContractorOb = x;
    });
  }

  numberOnly(event): boolean
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
      return false;
    }
    return true;
  }
  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }


  public SaveOrUpdate()
  {
    this.submitted=true;
    this.SaveContractor();
  }

  private SaveContractor()
  {

    this.sub = this.aService.SaveContractor(this.ContractorOb).subscribe(x =>
    {
      if (x.Success)
      {
        this.toasterService.success("Contractor Saved Successfully", 'Success');
      }
      else
      {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

}


