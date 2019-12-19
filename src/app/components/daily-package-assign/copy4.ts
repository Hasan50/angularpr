import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from 'app/services';
import { ToastrService } from 'ngx-toastr';
import { SelectUserComponent } from './select-user/select-user.component';
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
  templateUrl: './daily-package-assign.component.html',
  styleUrls: ['./daily-package-assign.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [TimelineYearService, MonthService]
})
export class DailyPackageAssignComponent implements OnInit {
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

  ) { }

  ngOnInit() {
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
      // let customEle = args.element.querySelector('.custom-event-editor');
      // if (customEle) {
      //   customEle.remove();
      // }
      // var d = args.element.ej2_instances[0];
      // d.open = function () {
      //   let data = args.data;
      //   let checkboxes = document.querySelector('.e-form-container tbody');
      //   for (let i = 1; i <= checkboxes.children.length; i++) {
      //     if (data['Package ' + i] === 'true') {
      //       ((checkboxes.children[i - 1].querySelector('.e-checkbox') as EJ2Instance).ej2_instances[0] as CheckBox).checked = true;
      //     }
      //   }
      // }
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
  public openPackageAddOrEditPopup(id: string) {
    const modalRef = this.modalService.open(SelectUserComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<SelectUserComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) => {
      this.selectedUser = result;
      this.onCreate();
    }).catch((result) => {
      console.log(result);

    });
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
