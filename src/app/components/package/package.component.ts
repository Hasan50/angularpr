import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPackageComponent } from './add-package/add-package.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadPackageList();
  }

  public openPackageAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddPackageComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddPackageComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     this.loadPackageList(); 
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  private loadPackageList(): void
  {
    this.sub = this.aService.GetPackageList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
