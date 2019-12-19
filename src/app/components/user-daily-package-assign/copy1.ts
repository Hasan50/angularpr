import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from 'app/services';
import { ToastrService } from 'ngx-toastr';
import { ChangeEventArgs } from "@syncfusion/ej2-buttons";
import {
  ScheduleComponent, EventSettingsModel, GroupModel, View, EventRenderedArgs, TimelineYearService
  , Orientation, PopupEventArgs, MonthService, EJ2Instance
} from '@syncfusion/ej2-angular-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement, extend } from '@syncfusion/ej2-base';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
import {CheckBox} from '@syncfusion/ej2-angular-buttons';
@Component({
  selector: 'app-package',
  templateUrl: './user-daily-package-assign.component.html',
  styleUrls: ['./user-daily-package-assign.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineYearService, MonthService]
})
export class UserDailyPackageAssignComponent implements OnInit {
  @ViewChild('scheduleObj')
  public scheduleObj: ScheduleComponent;
  public currentView: View = 'TimelineYear';
  public showQuickInfo: boolean = false;
  public packageFields: Object = { text: 'Text', value: 'Text' };
  packageList: any;
  public dataList: any = [];
  public packageSelectedList: any = [];
  // public eventSettings: EventSettingsModel = {
  //   dataSource: this.dataList
  // };
  private selectedDate=null;
  public group: GroupModel = { allowGroupEdit: true, resources: ['Conferences'] };
  public allowMultiple: Boolean = true;
  onCreate() {
    const scheduleObj = this.scheduleObj;  // Schedule instance
    // this.sub = this.aService.GetDailyUserPackageList(this.selectedUser.Id).subscribe(x => {
    //   //this.dataList = x.datalist;
    //   scheduleObj.eventSettings.dataSource = x.datalist;
    // });
  }

  public orientationData: Object[] = [
    { text: 'Horizontal', value: 'Horizontal' },
    { text: 'Vertical', value: 'Vertical' }
  ];
  public orientationValues = 'Horizontal';
  public orientationFields: Object = { text: 'text', value: 'value' };
  popupModel: any = { Id: "0" };
  private sub: any;

  private selectedUser: any = {};
  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,

  ) { 
    var cruser=JSON.parse(localStorage.getItem('currentUser'));
    this.selectedUser.Id= cruser.UserKey;
    this.selectedUser.PhoneNumber= cruser.Details.PhoneNumber;
    this.selectedUser.FullName= cruser.Details.FullName;

    console.log(this.selectedUser)
  }

  ngOnInit() {
    this.onCreate();
    this.loadPackageList();
  }
  // orientationChange(args: ChangeEventArgs): void {
  //   this.scheduleObj.views = [{ option: 'TimelineYear', orientation: args.value as Orientation }];
  //   this.scheduleObj.dataBind();
  // }
  public dateParser(data: string) {
    return new Date(data);
  }
  onChange(args: ChangeEventArgs): void {
    this.scheduleObj.eventSettings.editFollowingEvents = args['checked'];
  }

  public onPopupOpen(args: any): void {
    if (args.type === "Editor") {
      let data = args.data;
      this.selectedDate = data.StartTime;
      this.refreshPackageList();
      this.packageList.forEach(element => {
       var ob= data.Package.filter(function(item) { return item.Value ==element.Value;})[0];
        element.Selected= ob.Selected;
        element.Count= ob.Count;
      });
      this.packageSelectedList=[];
    }
  }

  public onActionBegin(args: { [key: string]: Object }): void {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      let data: any;
      if (args.requestType === 'eventCreate') {
        data = <any>args.data[0];
      //  this.setPlackgeOnData(args);
      } else if (args.requestType === 'eventChange') {
        data = <any>args.data;
      //  this.setPlackgeOnData(data);
      }
      this.SavePackageAssign();
    }
  }
  onCheckboxChange(item, event) {
    if (event.checked) {
      item.UserCrediantialId=this.selectedUser.Id;
      this.packageSelectedList.push(item);
    } else {
       var index = this.packageSelectedList.findIndex(x => x === item.Value);
      this.packageSelectedList.splice(index, 1);
    }
  }

  private loadPackageList(): void {
    this.sub = this.aService.GetPackageCboList().subscribe(x => {
      this.packageList = x;
      this.refreshPackageList();
    });
  }
  refreshPackageList()
  {
    this.packageList.forEach(element => {
      element.Count = 0;
      element.Selected=false;
    });
  }
  private loadDailyPackageList(): void {
    // this.sub = this.aService.GetDailyUserPackageList(this.selectedUser.Id).subscribe(x => {
    //   this.dataList = x.datalist;
    // });
  }
  public addPackageOnList(args: { [key: string]: Object }) {
    this.packageSelectedList.push(args);
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
  private setPlackgeOnData(args: { [key: string]: Object }){
      let data: any;
        data = <any>args.data[0];
        for (let index = 0; index < this.packageSelectedList.length; index++) {
      const element = this.packageSelectedList[index];
      data[element.Text]=true;
     this.scheduleObj.dataBind();
    }
  }
}
