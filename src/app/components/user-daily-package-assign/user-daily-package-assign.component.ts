import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from 'app/services';
import { ToastrService } from 'ngx-toastr';
import { ChangeEventArgs } from "@syncfusion/ej2-buttons";
import { UserSelectPackageComponent } from './user-select-package/user-select-package.component';
@Component({
  selector: 'app-package',
  templateUrl: './user-daily-package-assign.component.html',
  styleUrls: ['./user-daily-package-assign.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDailyPackageAssignComponent implements OnInit {
  @ViewChild('scheduleObj')
  packageList: any;
  private selectedDate=null;
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];
  public packageSelectedList: any = [];
  public packageAssignedList: any = [];
  private selectedUser: any = {};
  public dt = new Date();
public userDue:any;
constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,

  ) { 
    var cruser=JSON.parse(localStorage.getItem('currentUser'));
    this.selectedUser.Id= cruser.UserKey;
    this.selectedUser.PhoneNumber= cruser.Details.PhoneNumber;
    this.selectedUser.FullName= cruser.Details.FullName;
    Window["myComponent"] = this; 
  }

  ngOnInit() {
    this.loadDailyPackageList();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  renderDate() {
    this.dt.setDate(1);
    var day = this.dt.getDay();
    var today = new Date();
    var endDate = new Date(
      this.dt.getFullYear(),
      this.dt.getMonth() + 1,
      0
    ).getDate();

    var prevDate = new Date(
      this.dt.getFullYear(),
      this.dt.getMonth(),
      0
    ).getDate();
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
    document.getElementById("month").innerHTML = months[this.dt.getMonth()];
    document.getElementById("date_str").innerHTML = this.dt.toDateString();
    var cells = "";
    for (let x = day; x > 0; x--) {
      cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
    }
    console.log('prev day', day);
    for (let i = 1; i <= endDate; i++) {
      if (i == today.getDate() && this.dt.getMonth() == today.getMonth()) {
        cells += '<div class="today" onclick="Window.myComponent.alertt("'+today+'")">' + i + '</div>';
      } else {  // cells += '<div onclick="Window.myComponent.alertt()">' + i + '</div>';
        var gdate = new Date(
          this.dt.getFullYear(),
          this.dt.getMonth(),
          i
        );
        var t: any = this.getDateInfo(gdate);
        if (t === undefined) {
          cells += '<div onclick="Window.myComponent.alertt("'+gdate+'")">' + i + '</div>';
        } else {
          var gd = new Date(t.StartTime).getDate();
          if (i == gd && this.dt.getMonth() == today.getMonth())
            cells += '<div onclick={Window.myComponent.alertt("'+t.StartTime+'")}>' + i +' <p>'+t.PackageName+'</p></div>';
          else
            cells += '<div onclick="Window.myComponent.alertt("'+gdate+'")">' + i + '</div>';
        }
      }
    }
    document.getElementsByClassName("days")[0].innerHTML = cells;

  }
  alertt(value) {
    var d=this.getDateInfo( new Date(value));
    var ob={
      Package:d,
      SelectedUser:this.selectedUser,
      SelectedDate: new Date(value)
    }
    this.openPackageSelectAddOrEditPopup(ob);
  }
  moveDate(para) {
    if (para == "prev") {
      this.dt.setMonth(this.dt.getMonth() - 1);
    } else if (para == 'next') {
      this.dt.setMonth(this.dt.getMonth() + 1);
    }
    this.renderDate();
  }
  getDateInfo(date) {
    var d = this.dataList.filter(function (item) {
      var a = new Date(item.StartTime).toLocaleDateString();
      return a == date.toLocaleDateString();
    });
    return d[0];
  }
  onCheckboxChange(item, args, event) {
    if (event.checked) {
      args.data[0][item.Text] = true;
    } else {
      // var index = this.userWeekDaySelectedList.findIndex(x => x === item.WeekDayName);
      // this.userWeekDaySelectedList.splice(index, 1);
    }
  }
  public openPackageSelectAddOrEditPopup(ob:any) {
    const modalRef = this.modalService.open(UserSelectPackageComponent, { size: 'lg', backdrop: false });
    this.popupModel = ob;
    (<UserSelectPackageComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) => {
      // this.selectedUser = result;
      this.loadDailyPackageList();
    }).catch((result) => {
      console.log(result);
    });
  }
  private SavePackageAssign() {
    if(this.packageSelectedList.length===0) return;
    var modelList=[];
    this.packageSelectedList.forEach(element => {
      var ob={};
      ob['PackageId']=element.Value;
      ob['UserCrediantialId']=element.UserCrediantialId;
      ob['PackageCount']=element.Count;
      ob['DeliveryAssignDate']=this.selectedDate;
      modelList.push(ob);
    });
    const formData = new FormData();
    formData.append('packageAssignList', JSON.stringify(modelList));
    this.sub = this.aService.SavePackageAssign(formData).subscribe(x => {
      if (x.Success) {
        if (this.popupModel.Id == "0") {
        } else {
        }
      }
      else {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }
    });
  }
  private loadDailyPackageList(): void {
    this.sub = this.aService.GetDailyUserPackageList(this.selectedUser.Id,this.dt.toDateString()).subscribe(x => {
      this.dataList = x.datalist;
      this.userDue=x.UserDue;
      this.renderDate();
    });
  }
  public addPackageOnList(args: { [key: string]: Object }) {
    this.packageSelectedList.push(args);
  }
}
