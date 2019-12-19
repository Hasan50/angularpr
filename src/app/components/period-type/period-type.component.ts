import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPeriodTypeComponent } from './add-period-type/add-period-type.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-period-type',
  templateUrl: './period-type.component.html',
  styleUrls: ['./period-type.component.scss']
})
export class PeriodTypeComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadRawItemList();
  }

  public openAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddPeriodTypeComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddPeriodTypeComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     this.loadRawItemList(); 
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  private loadRawItemList(): void
  {
    this.sub = this.aService.GetPeriodTypeList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
