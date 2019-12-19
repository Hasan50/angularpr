import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPostOfficeComponent } from './add-post-office/add-post-office.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-post-office',
  templateUrl: './post-office.component.html',
  styleUrls: ['./post-office.component.scss']
})
export class PostOfficeComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadPostOfficeList();
  }

  public openAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddPostOfficeComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddPostOfficeComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     this.loadPostOfficeList(); 
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  private loadPostOfficeList(): void
  {
    this.sub = this.aService.GetPostOfficeList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
