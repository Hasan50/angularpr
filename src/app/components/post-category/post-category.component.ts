import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPostCategoryComponent } from './add-post-category/add-post-category.component';
import { ApplicationService } from 'app/services';

@Component({
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {
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
    const modalRef = this.modalService.open(AddPostCategoryComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddPostCategoryComponent>modalRef.componentInstance).popupModel = this.popupModel;
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
