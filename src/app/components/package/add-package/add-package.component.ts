import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageModel } from '../../../models/packageModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit, OnDestroy
{
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  PackageOb: PackageModel;
  private userId: string;
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) 
  {
    this.userId = localStorage.getItem('userKey');
    this.PackageOb = new PackageModel();
  this.PackageOb.AffectiveDate = new Date();
  }



  ngOnInit()
  {
    if (this.popupModel.Id != "0")
    { this.getPackageDetail() }
  }
  getPackageDetail()
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
    this.SavePackage();
  }

  private SavePackage()
  {
    this.sub = this.aService.SavePackage(this.PackageOb).subscribe(x =>
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


