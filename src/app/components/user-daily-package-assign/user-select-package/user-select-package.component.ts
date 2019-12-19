import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageModel } from '../../../models/packageModel';
import { ApplicationService } from 'app/services';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  templateUrl: './user-select-package.component.html',
  styleUrls: ['./user-select-package.component.scss']
})
export class UserSelectPackageComponent implements OnInit, OnDestroy {
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = {};
  PackageOb: PackageModel;
  private userId: string;
  submitted = false;
  dataList: any;
  packageList: any;
  public packageSelectedList: any = [];
  public packageAssignedList: any = [];
  private selectedUser: any = {};
  selectedDate: any;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) {
    this.PackageOb = new PackageModel();
    console.log(this.popupModel);
  }



  ngOnInit() {
    this.packageSelectedList = [];
    this.packageAssignedList = this.popupModel.Package.Package;
    this.loadPackageList();
    this.selectedUser = this.popupModel.SelectedUser;
    this.selectedDate=this.popupModel.SelectedDate;
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onCheckboxChange(item, event) {
    if (event.checked) {
      item.UserCrediantialId = this.selectedUser.Id;
      this.packageSelectedList.push(item);
    } else {
      var index = this.packageSelectedList.findIndex(x => x === item.Value);
      this.packageSelectedList.splice(index, 1);
    }
  }
  private loadPackageList(): void {
    this.sub = this.aService.GetPackageCboList().subscribe(x => {
      this.packageList = x;
      this.packageList.forEach(element => {
        element.Count = 0;
      });
      this.setAssignedPackage();
    });
  }
  private setAssignedPackage() {
    if (this.packageAssignedList.length < 1) return;
    this.packageList.forEach(element => {
      var ob = this.packageAssignedList.filter(function (item) { return item.Value == element.Value; })[0];
      if (ob != undefined)
        element.Selected = ob.Selected;
        element.Count = ob.Count;
    });
  }
  private SavePackageAssign() {
    if (this.packageSelectedList.length === 0) return;
    var modelList = [];
    this.packageSelectedList.forEach(element => {
      var ob = {};
      ob['PackageId'] = element.Value;
      ob['UserCrediantialId'] = element.UserCrediantialId;
      ob['PackageCount'] = element.Count;
      ob['DeliveryAssignDate'] = this.selectedDate;
      modelList.push(ob);
    });
    const formData = new FormData();
    formData.append('packageAssignList', JSON.stringify(modelList));
    this.sub = this.aService.SavePackageAssign(formData).subscribe(x => {
      if (x.Success) {
        this.popUpClose();
        if (this.popupModel.Id == "0") {
        } else {
        }
      }
      else {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }
    });
  }
  popUpClose() {
    this.activeModal.close();
  }
}


