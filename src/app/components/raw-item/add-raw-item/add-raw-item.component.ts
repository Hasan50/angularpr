import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageModel } from '../../../models/packageModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-add-raw-item',
  templateUrl: './add-raw-item.component.html',
  styleUrls: ['./add-raw-item.component.scss']
})
export class AddRawItemComponent implements OnInit, OnDestroy {
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  RawItemOb: PackageModel;
  private userId: string;
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) {
    this.userId = localStorage.getItem('userKey');
    this.RawItemOb = new PackageModel();
    this.RawItemOb.AffectiveDate = new Date();
  }



  ngOnInit() {
    if (this.popupModel.Id != "0") { this.getRawItemDetail() }
  }
  getRawItemDetail() {

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  public SaveOrUpdate() {
    this.SaveRawItem();
  }

  private SaveRawItem() {
    this.sub = this.aService.SaveRawItem(this.RawItemOb).subscribe(x => {
      if (x.Success) {
        if (this.popupModel.Id == "0") {
          this.toasterService.success("Raw Item Created Successfully", 'Success');
        } else {
          this.toasterService.success("Raw Item Updated Successfully", 'Success');
        }
      }
      else {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

}


