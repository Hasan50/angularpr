import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPackageRawItemComponent } from './add-package-raw-item/add-package-raw-item.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-package-raw-item',
  templateUrl: './package-raw-item.component.html',
  styleUrls: ['./package-raw-item.component.scss']
})
export class PackageRawItemComponent implements OnInit {
  popupModel: any = { Id: null,PackageId:null };
  private sub: any;
  public packageRawItemList: any = [];
  public packageList: any = [];
  public rawItemList: any = [];
  public dataList: any = [];
  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadPackageList();
  }

  public openAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddPackageRawItemComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddPackageRawItemComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
    this.getPackageRawItemsByPackageId(); 
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  public onChange(){
    this.getPackageRawItemsByPackageId();
  }
  private loadPackageList(): void {
    this.sub = this.aService.GetPackageCboList().subscribe(x => {
      this.packageList = x;
    });
  }
  public getPackageRawItemsByPackageId(): void{
    this.sub = this.aService.GetPackageRawItemList(this.popupModel.PackageId).subscribe(x => {
      this.dataList = x;
    });
  }
}
