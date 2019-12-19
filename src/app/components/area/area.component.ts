import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAreaComponent } from './add-area/add-area.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadAreaList();
  }

  public openAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddAreaComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddAreaComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     this.loadAreaList(); 
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  private loadAreaList(): void
  {
    this.sub = this.aService.GetAreaList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
