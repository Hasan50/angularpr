import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageModel } from '../../../models/packageModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
import { PackageAdvanceModel } from 'app/models/PackageAdvanceModel';
declare var $: any;
@Component({
  selector: 'app-add-package-advance',
  templateUrl: './add-package-advance.component.html',
  styleUrls: ['./add-package-advance.component.scss']
})
export class AddPackageAdvanceComponent implements OnInit, OnDestroy
{
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  PackageAdvanceOb: PackageAdvanceModel;
  private userId: string;
  submitted = false;
  packageList=[];
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) 
  {
    this.userId = localStorage.getItem('userKey');
    this.PackageAdvanceOb = new PackageAdvanceModel();
  }
  ngOnInit()
  {
  this.GetPackageCboList() 
  }
  getPackageDetail()
  {
 
  }
  private GetPackageCboList(): void
  {
    this.sub = this.aService.GetPackageCboList().subscribe(x =>
    {
      this.packageList = x;
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
    // this.sub.unsubscribe();
  }

  public SaveOrUpdate()
  {
    this.SavePackageAdvance();
  }

  private SavePackageAdvance()
  {
    this.sub = this.aService.SavePackageAdvance(this.PackageAdvanceOb).subscribe(x =>
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


