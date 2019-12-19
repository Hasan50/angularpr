import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPackageAdvanceComponent } from './add-package-advance/add-package-advance.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-package',
  templateUrl: './package-advance.component.html',
  styleUrls: ['./package-advance.component.scss']
})
export class PackageAdvanceComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadPackageAdvanceList();
  }

  public openPackageAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddPackageAdvanceComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddPackageAdvanceComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     this.loadPackageAdvanceList(); 
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  private loadPackageAdvanceList(): void
  {
    this.sub = this.aService.GetAdvancePackageList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
