import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ContractorSideDocumentComponent } from './contractor-side-document/contractor-side-document.component'

@Component({
  selector: 'app-contractor-side-pm',
  templateUrl: './contractor-side-pm.component.html',
  styleUrls: ['./contractor-side-pm.component.scss']
})
export class ContractorSidePmComponent implements OnInit, OnDestroy
{

  private sub: any;
  public dataList: any = [];
  private userId: string;
  popupModel: any = { Id: "0" };

  @ViewChild('content') content: ElementRef;
  constructor(private aService: ApplicationService, private modalService: NgbModal, private router: Router)
  {
    this.userId = localStorage.getItem('userKey');
  }

  ngOnInit()
  {
    this.GetProjectListByContractorId();
  }

  private GetProjectListByContractorId(): void
  {

    this.sub = this.aService.GetProjectListByContractorId(this.userId).subscribe(x =>
    {
      this.dataList = x;
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }
  public openDocumentsModal(id: string)
  {
    const modalRef = this.modalService.open(ContractorSideDocumentComponent, { size: 'lg', backdrop: false });
    this.popupModel.Id = id;
    (<ContractorSideDocumentComponent>modalRef.componentInstance).popupModel = this.popupModel;
    modalRef.result.then((result) =>
    {

    }).catch((result) =>
    {
      console.log(result);
    });
  }

}
