import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from 'app/services';
import { SelectUserComponent } from './select-user/select-user.component';
import { never } from 'rxjs';
import { SelectPackageComponent } from './select-package/select-package.component';
@Component({
  selector: 'app-package',
  templateUrl: './daily-package-assign.component.html',
  styleUrls: ['./daily-package-assign.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DailyPackageAssignComponent implements OnInit {
  packageList: any;
  public dataList: any = [];
  public packageSelectedList: any = [];
  popupModel: any = { Id: "0" };
  private sub: any;
public userDue:any;
  private selectedUser: any = {};
  public dt = new Date();
  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { Window["myComponent"] = this; }

  ngOnInit() {
    this.renderDate();
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
        cells += '<div class="today" onclick="Window.myComponent.alertt()">' + i + '</div>';
      } else {  // cells += '<div onclick="Window.myComponent.alertt()">' + i + '</div>';
        var gdate = new Date(
          this.dt.getFullYear(),
          this.dt.getMonth(),
          i
        );
        var t: any = this.getDateInfo(gdate);
        if (t === undefined) {
          cells += '<div onclick="Window.myComponent.alertt()">' + i + '</div>';
        } else {
          var gd = new Date(t.StartTime).getDate();
          if (i == gd && this.dt.getMonth() == today.getMonth())
            cells += '<div onclick={Window.myComponent.alertt("'+t.StartTime+'")}>' + i +' <p>'+t.PackageName+'</p></div>';
          else
            cells += '<div onclick="Window.myComponent.alertt("item")">' + i + '</div>';
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
  public openPackageAddOrEditPopup(id: string) {
    const modalRef = this.modalService.open(SelectUserComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<SelectUserComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) => {
      this.selectedUser = result;
      this.loadDailyPackageList();
    }).catch((result) => {
      console.log(result);

    });
  }
  public openPackageSelectAddOrEditPopup(ob:any) {
    const modalRef = this.modalService.open(SelectPackageComponent, { size: 'lg', backdrop: false });
    this.popupModel = ob;
    (<SelectPackageComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) => {
      // this.selectedUser = result;
      this.loadDailyPackageList();
    }).catch((result) => {
      console.log(result);
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
