import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
import { ContractorRegistrationModel } from '../../../models/contractorRegistrationModel';


@Component({
  selector: 'app-add-contractor',
  templateUrl: './add-contractor.component.html',
  styleUrls: ['./add-contractor.component.scss']
})
export class AddContractorComponent implements OnInit, OnDestroy
{
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  ContractorOb: ContractorRegistrationModel;
  private userId: string;
  submitted = false;

  constructor(public activeModal: NgbActiveModal, private aService: ApplicationService, private toasterService: ToastrService) 
  {
    this.userId = localStorage.getItem('userKey');
    this.ContractorOb = new ContractorRegistrationModel();
    this.ContractorOb.IsActive = true;
  }

  ngOnInit()
  {

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
    // this.sub.unsubscribe();
  }


  public SaveOrUpdate()
  {
    if (this.popupModel.Id == "0")
    {
      this.submitted = true;
      this.SaveContractor();
    }
    else
    {
      this.UpdateContractor();
    }
  }

  private SaveContractor()
  {
  
    this.sub = this.aService.SaveContractor(this.ContractorOb).subscribe(x =>
    {
      if (x.Success)
      {
        this.toasterService.success("Contractor Created Successfully", 'Success');
      }
      else
      {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

  private UpdateContractor()
  {
    // this.sub = this.aService.UpdateUser(this.UserOb).subscribe(x =>
    // {
    //   if (x.Success)
    //   {
    //     this.toasterService.success("Contractor Updated Successfully", 'Success');
    //   }
    //   else
    //   {
    //     this.toasterService.error("Something Error Happened. Try again later", 'Error');
    //   }

    //   this.activeModal.close();
    // });
  }

}


