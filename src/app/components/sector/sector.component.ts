import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSectorComponent } from './add-sector/add-sector.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadSectorList();
  }

  public openAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddSectorComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddSectorComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     this.loadSectorList(); 
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  private loadSectorList(): void
  {
    this.sub = this.aService.GetSectorList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
