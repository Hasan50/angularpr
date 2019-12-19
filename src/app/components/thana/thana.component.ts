import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddThanaComponent } from './add-thana/add-thana.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-thana',
  templateUrl: './thana.component.html',
  styleUrls: ['./thana.component.scss']
})
export class ThanaComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadThanaList();
  }

  public openAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddThanaComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddThanaComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     this.loadThanaList(); 
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  private loadThanaList(): void
  {
    this.sub = this.aService.GetThanaList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
