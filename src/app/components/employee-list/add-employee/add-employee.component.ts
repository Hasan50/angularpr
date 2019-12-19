import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRegistrationModel } from '../../../models/employeeRegistrationModel';
import { EmployeeModel } from '../../../models/EmployeeModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'app/models/Roles';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, OnDestroy
{
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  RegistrationOb: EmployeeRegistrationModel;
  EmployeeOb:EmployeeModel;
  private userId: string;
  submitted = false;
  bloodGroupList: any;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) 
  {
    this.userId = localStorage.getItem('userKey');
    this.RegistrationOb = new EmployeeRegistrationModel();
    this.EmployeeOb = new EmployeeModel();
    this.RegistrationOb.IsActive = true;
  }



  ngOnInit()
  {
    if (this.popupModel.Id == "0")
    { this.GetEmployeeCode(); }
    else
    {
      this.getEmployeeDetail();
    }
    this.loadBloodGroupList();
  }
  private loadBloodGroupList(): void
  {
    this.sub = this.aService.GetBloodGroupList().subscribe(x =>
    {
      this.bloodGroupList = x;
    });
  }
  getEmployeeDetail()
  {
    // this.sub = this.aService.GetEmployeeDetailsById(this.popupModel.Id).subscribe(x =>
    // {
    //   this.RegistrationOb = x;
    // });
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
  private GetEmployeeCode()
  {
    this.sub = this.aService.GetEmployeeCode().subscribe(x =>
    {
      this.EmployeeOb.EmployeeCode = x
    });
  }
  public SaveOrUpdate()
  {
    this.SaveEmployee();
  }
  private SaveEmployee() {
    this.RegistrationOb.Id = null;
    this.RegistrationOb.UserTypeId = Role.Employee;
    this.RegistrationOb.ImagePath = null;
    this.RegistrationOb.CreatedById = null;
    this.EmployeeOb.Name=this.RegistrationOb.FullName;
    this.EmployeeOb.CreatedById= this.userId;
    this.EmployeeOb.ContactNo= this.RegistrationOb.PhoneNumber;
    const formData = new FormData();
    formData.append('customerob', JSON.stringify(this.RegistrationOb));
    formData.append('employeeOb', JSON.stringify(this.EmployeeOb));
    // formData.append('BlobName', this.DocumentOb.BlobName);
    this.sub = this.aService.SaveEmployee(formData).subscribe(x => {
      if (x.Success) {
        if (this.popupModel.Id == "0") {
          this.toasterService.success("Project Created Successfully", 'Success');
        } else {
          this.toasterService.success("Project Updated Successfully", 'Success');
        }
      }
      else {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

  private UpdateEmployee()
  {
    // this.sub = this.aService.UpdateUser(this.UserOb).subscribe(x =>
    // {
    //   if (x.Success)
    //   {
    //     this.toasterService.success("User Updated Successfully", 'Success');
    //   }
    //   else
    //   {
    //     this.toasterService.error("Something Error Happened. Try again later", 'Error');
    //   }

    //   this.activeModal.close();
    // });
  }

}


