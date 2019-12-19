import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BloodGroupModel } from '../../../models/BloodGroupModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-add-blood-group',
  templateUrl: './add-blood-group.component.html',
  styleUrls: ['./add-blood-group.component.scss']
})
export class AddBloodGroupComponent implements OnInit, OnDestroy {
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  BloodGroupOb: BloodGroupModel;
  private userId: string;
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) {
    this.userId = localStorage.getItem('userKey');
    this.BloodGroupOb = new BloodGroupModel();
  }



  ngOnInit() {
    if (this.popupModel.Id != "0") { this.getBloodGroupDetail() }
  }
  getBloodGroupDetail() {

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
    this.SaveBloodGroup();
  }

  private SaveBloodGroup() {
    this.sub = this.aService.SaveBloodGroup(this.BloodGroupOb).subscribe(x => {
      if (x.Success) {
        if (this.popupModel.Id == "0") {
          this.toasterService.success("Blood Group Created Successfully", 'Success');
        } else {
          this.toasterService.success("Blood Group Updated Successfully", 'Success');
        }
      }
      else {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

}


