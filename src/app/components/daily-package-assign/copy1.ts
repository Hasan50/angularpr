import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from 'app/services';
import { SelectUserComponent } from './select-user/select-user.component';

@Component({
  selector: 'app-package',
  templateUrl: './daily-package-assign.component.html',
  styleUrls: ['./daily-package-assign.component.scss']
})
export class DailyPackageAssignComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

private selectedUser:any={};
  packageList: any;
  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
  }

  public openPackageAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(SelectUserComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<SelectUserComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
      this.selectedUser=result;
      this.loadPackageList();
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  private loadPackageList(): void
  {
    // this.sub = this.aService.GetDailyUserPackageList(this.selectedUser.Id).subscribe(x =>
    // {
    //   this.dataList = x.datalist;
    //   this.packageList=x.packageList;
    // });
  }
}
