import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerRegistrationModel } from '../../../models/customerRegistrationModel';
import { UserWithPackageModel } from '../../../models/UserWithPackageModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'app/models/Roles';
import { SelectEmployeeComponent } from '../employee-list/select-employee.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserWeekDayOffModel } from 'app/models/UserWeekDayOffModel';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  CustomerOb: CustomerRegistrationModel;
  UserWithPackageOb: UserWithPackageModel;
  UserWeekDayOffOb: UserWeekDayOffModel;
  private userId: string;
  submitted = false;
  bsValue: any
  bloodGroupList: any;
  dataList: [];
  packageList: [];
  advanceList: [];
  periodTypes: [];
  weekDayList: any;
  userWeekDaySelectedList: any[];
  dayShiftList: [];
  dayShiftWithPackageList: any[];
  dayShiftMornigPackgeOb: { Id, DayShiftId, PackageId, Amount, PeriodTypeId }
  dayShiftLunchPackgeOb: { Id, DayShiftId, PackageId, Amount, PeriodTypeId }
  dayShiftDinerPackgeOb: { Id, DayShiftId, PackageId, Amount, PeriodTypeId }
  dayShiftSelect: any;
  tabs = ['BreackFast', 'Lunch', 'Diner'];
  selectedTab = 1;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
    private modalService: NgbModal,
  ) {
    this.userId = localStorage.getItem('userKey');
    this.CustomerOb = new CustomerRegistrationModel();
    this.UserWithPackageOb = new UserWithPackageModel();
    this.UserWeekDayOffOb = new UserWeekDayOffModel();
    this.weekDayList = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    this.CustomerOb.SalesExecutiveId = null;
    this.CustomerOb.DeliveryManId = null;
    this.UserWithPackageOb.PackageId = null;
    this.UserWithPackageOb.PeriodTypeId = null;
    this.UserWithPackageOb.Amount = null;
    this.userWeekDaySelectedList = [];
    this.dayShiftWithPackageList = [];
    this.CustomerOb.IsActive = true;
    this.dayShiftMornigPackgeOb = {
      Id: null,
      DayShiftId: null,
      PackageId: null,
      Amount: null,
      PeriodTypeId: null
    }
    this.dayShiftLunchPackgeOb = {
      Id: null,
      DayShiftId: null,
      PackageId: null,
      Amount: null,
      PeriodTypeId: null
    }
    this.dayShiftDinerPackgeOb = {
      Id: null,
      DayShiftId: null,
      PackageId: null,
      Amount: null,
      PeriodTypeId: null
    }
    this.dayShiftSelect = null;

  }



  ngOnInit() {
    this.loadPackageAWithdvanceList();
    this.loadBloodGroupList();
    this.GetDayShiftCboList();
  }
  getCustomerDetail() {

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  private loadPackageAWithdvanceList(): void {
    this.sub = this.aService.GetPackageWithPeriodTypeList().subscribe(x => {
      this.packageList = x.packageList;
      this.periodTypes = x.periodTypes;
    });
  }

  public SaveOrUpdate() {
    this.SaveCustomer();
  }

  private SaveCustomer() {
    this.CustomerOb.Id = null;
    this.CustomerOb.UserTypeId = Role.User;
    this.CustomerOb.ImagePath = null;
    this.CustomerOb.CreatedById = null;
    this.dayShiftWithPackageList=[];
    if (this.dayShiftMornigPackgeOb.DayShiftId != null)
      this.dayShiftWithPackageList.push(this.dayShiftMornigPackgeOb);
    if (this.dayShiftLunchPackgeOb.DayShiftId != null)
      this.dayShiftWithPackageList.push(this.dayShiftLunchPackgeOb);
    if (this.dayShiftDinerPackgeOb.DayShiftId != null)
      this.dayShiftWithPackageList.push(this.dayShiftDinerPackgeOb);
    const formData = new FormData();
    formData.append('customerob', JSON.stringify(this.CustomerOb));
    formData.append('advanceOb', JSON.stringify(this.dayShiftWithPackageList));
    formData.append('weekdayoff', JSON.stringify(this.userWeekDaySelectedList));
    // formData.append('BlobName', this.DocumentOb.BlobName);
    this.sub = this.aService.SaveCustomer(formData).subscribe(x => {
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
  private loadBloodGroupList(): void {
    this.sub = this.aService.GetBloodGroupList().subscribe(x => {
      this.bloodGroupList = x;
    });
  }
  private GetDayShiftCboList(): void {
    this.sub = this.aService.GetDayShiftCboList().subscribe(x => {
      this.dayShiftList = x;
    });
  }

  public openEmployeePopup() {
    const modalRef = this.modalService.open(SelectEmployeeComponent, { size: 'lg', backdrop: false });
    (<SelectEmployeeComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) => {
      this.CustomerOb.SalesExecutiveId = result.Id;
      this.CustomerOb.SalesExecutiveName = result.FullName + " (" + result.EmployeeCode + ")";
    }).catch((result) => {
      console.log(result);
    });
  }
  public openEmployeeDeliveryPopup() {
    const modalRef = this.modalService.open(SelectEmployeeComponent, { size: 'lg', backdrop: false });
    (<SelectEmployeeComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) => {
      this.CustomerOb.DeliveryManId = result.Id;
      this.CustomerOb.DeliveryManName = result.FullName + " (" + result.EmployeeCode + ")";
    }).catch((result) => {
      console.log(result);
    });
  }
  onPackageChange(item, event) {
    if (event.value != null) {
      if (this.dayShiftSelect == "BreackFast") {
        this.dayShiftMornigPackgeOb.Amount = item.Price;
      }
      if (this.dayShiftSelect == "Lunch") {
        this.dayShiftLunchPackgeOb.Amount = item.Price;
      }
      if (this.dayShiftSelect == "Diner") {
        this.dayShiftDinerPackgeOb.Amount = item.Price;
      }
    } else {
      if (this.dayShiftSelect == "BreackFast") {
        this.dayShiftMornigPackgeOb.Amount = null;
      }
      if (this.dayShiftSelect == "Lunch") {
        this.dayShiftLunchPackgeOb.Amount = null;
      }
      if (this.dayShiftSelect == "Diner") {
        this.dayShiftDinerPackgeOb.Amount = null;
      }
    }
  }
  onCheckboxChange(item, event) {
    if (event.checked) {
      this.UserWeekDayOffOb = new UserWeekDayOffModel();
      this.UserWeekDayOffOb = {
        Id: null,
        UserId: this.userId,
        WeekDayName: item
      }
      this.userWeekDaySelectedList.push(this.UserWeekDayOffOb);
    } else {
      var index = this.userWeekDaySelectedList.findIndex(x => x === item.WeekDayName);
      this.userWeekDaySelectedList.splice(index, 1);
    }
  }
  onDaySiftCheckboxChange(item, event) {
    if (event.checked) {
      this.dayShiftSelect = item;
      if (this.dayShiftSelect == "BreackFast") {
        var a = this.dayShiftList.filter(r => r["Text"] == item)[0];
        this.dayShiftMornigPackgeOb.DayShiftId = a["Value"];
      }
      if (this.dayShiftSelect == "Lunch") {
        var a = this.dayShiftList.filter(r => r["Text"] == item)[0];
        this.dayShiftLunchPackgeOb.DayShiftId = a["Value"];
      }
      if (this.dayShiftSelect == "Diner") {
        var a = this.dayShiftList.filter(r => r["Text"] == item)[0];
        this.dayShiftDinerPackgeOb.DayShiftId = a["Value"];
      }
    } else {
      this.dayShiftSelect = null;
      if (item.Text == "BreackFast") {
        this.dayShiftMornigPackgeOb = {
          Id: null,
          DayShiftId: null,
          PackageId: null,
          Amount: null,
          PeriodTypeId: null
        }
      }
      if (item.Text == "Lunch") {
        this.dayShiftLunchPackgeOb = {
          Id: null,
          DayShiftId: null,
          PackageId: null,
          Amount: null,
          PeriodTypeId: null
        }
      }
      if (this.dayShiftSelect == "Diner") {
        this.dayShiftDinerPackgeOb = {
          Id: null,
          DayShiftId: null,
          PackageId: null,
          Amount: null,
          PeriodTypeId: null
        }
      }
    }
  }
}


