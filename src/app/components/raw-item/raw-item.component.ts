import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRawItemComponent } from './add-raw-item/add-raw-item.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-raw-item',
  templateUrl: './raw-item.component.html',
  styleUrls: ['./raw-item.component.scss']
})
export class RawItemComponent implements OnInit {
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
    const modalRef = this.modalService.open(AddRawItemComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddRawItemComponent>modalRef.componentInstance).popupModel = this.popupModel;
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
    this.sub = this.aService.GetRawItemList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
