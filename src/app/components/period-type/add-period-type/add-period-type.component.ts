import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PeriodTypeModel } from '../../../models/PeriodTypeModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-add-period-type',
  templateUrl: './add-period-type.component.html',
  styleUrls: ['./add-period-type.component.scss']
})
export class AddPeriodTypeComponent implements OnInit, OnDestroy {
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  PeriodTypeOb: PeriodTypeModel;
  private userId: string;
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) {
    this.userId = localStorage.getItem('userKey');
    this.PeriodTypeOb = new PeriodTypeModel();
  }



  ngOnInit() {
    if (this.popupModel.Id != "0") { this.getPeriodTypeDetail() }
  }
  getPeriodTypeDetail() {

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
    this.SavePeriodType();
  }

  private SavePeriodType() {
    this.sub = this.aService.PeriodTypeSave(this.PeriodTypeOb).subscribe(x => {
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


