import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ThanaModel } from '../../../models/ThanaModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-add-thana',
  templateUrl: './add-thana.component.html',
  styleUrls: ['./add-thana.component.scss']
})
export class AddThanaComponent implements OnInit, OnDestroy {
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  ThanaOb: ThanaModel;
  private userId: string;
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) {
    this.userId = localStorage.getItem('userKey');
    this.ThanaOb = new ThanaModel();
  }



  ngOnInit() {
    if (this.popupModel.Id != "0") { this.getThanaDetail() }
  }
  getThanaDetail() {

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
    this.SaveThana();
  }

  private SaveThana() {
    this.sub = this.aService.SaveThana(this.ThanaOb).subscribe(x => {
      if (x.Success) {
        if (this.popupModel.Id == "0") {
          this.toasterService.success("Thana Created Successfully", 'Success');
        } else {
          this.toasterService.success("Thana Updated Successfully", 'Success');
        }
      }
      else {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

}


