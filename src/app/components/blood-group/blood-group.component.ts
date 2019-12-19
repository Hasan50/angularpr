import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBloodGroupComponent } from './add-blood-group/add-blood-group.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-blood-group',
  templateUrl: './blood-group.component.html',
  styleUrls: ['./blood-group.component.scss']
})
export class BloodGroupComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadBloodGroupList();
  }

  public openAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddBloodGroupComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddBloodGroupComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     this.loadBloodGroupList(); 
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  private loadBloodGroupList(): void
  {
    this.sub = this.aService.GetBloodGroupList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
