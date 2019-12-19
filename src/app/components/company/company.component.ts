import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCompanyComponent } from './add-company/add-company.component';
import { ApplicationService } from 'app/services';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  popupModel: any = { Id: "0" };
  private sub: any;
  public dataList: any = [];

  constructor(
    private modalService: NgbModal,
    private aService: ApplicationService,

  ) { }

  ngOnInit() {
    this.loadCompanyList();
  }

  public openAddOrEditPopup(id: string)
  {
    const modalRef = this.modalService.open(AddCompanyComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<AddCompanyComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {
     this.loadCompanyList(); 
    }).catch((result) =>
    {
      console.log(result);
    });
  }
  private loadCompanyList(): void
  {
    this.sub = this.aService.GetCompanyList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
}
