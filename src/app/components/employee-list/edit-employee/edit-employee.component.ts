import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegistrationModel } from '../../../models/employeeRegistrationModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit, OnDestroy
{
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  RegistrationOb: EmployeeRegistrationModel;
  private userId: string;
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) 
  {
    this.userId = localStorage.getItem('userKey');
    this.RegistrationOb = new EmployeeRegistrationModel();
    this.RegistrationOb.IsActive = true;
  }



  ngOnInit()
  {
    // if (this.popupModel.Id != "0")
    // { this.getEmployeeDetail() }
  }
  // getEmployeeDetail()
  // {
  //   this.sub = this.aService.GetEmployeeDetailsById(this.popupModel.Id).subscribe(x =>
  //   {
  //     this.RegistrationOb = x;
  //   });
  // }

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
    this.SaveEmployee();
  }

  private SaveEmployee()
  {
    this.sub = this.aService.SaveCLient(this.RegistrationOb).subscribe(x =>
    {
      if (x.Success)
      {
        if (this.popupModel.Id == "0")
        {
          this.toasterService.success("Project Created Successfully", 'Success');
        } else
        {
          this.toasterService.success("Project Updated Successfully", 'Success');
        }
      }
      else
      {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

 

}


