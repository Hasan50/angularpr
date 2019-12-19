import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AreaModel } from '../../../models/AreaModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent implements OnInit, OnDestroy {
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  AreaOb: AreaModel;
  private userId: string;
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) {
    this.userId = localStorage.getItem('userKey');
    this.AreaOb = new AreaModel();
  }



  ngOnInit() {
    if (this.popupModel.Id != "0") { this.getAreaDetail() }
  }
  getAreaDetail() {

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
    this.SaveArea();
  }

  private SaveArea() {
    this.sub = this.aService.SaveArea(this.AreaOb).subscribe(x => {
      if (x.Success) {
        if (this.popupModel.Id == "0") {
          this.toasterService.success("Area Created Successfully", 'Success');
        } else {
          this.toasterService.success("Area Updated Successfully", 'Success');
        }
      }
      else {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

}


