import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDocumentModel } from '../../../../models/projectDocumentModel';
import { ApplicationService } from '../../../../services/application.service';
import { DOCUMENT } from '@angular/common';
import { AppConfig } from '../../../../app.config';

@Component({
  selector: 'app-contractor-side-document',
  templateUrl: './contractor-side-document.component.html',
  styleUrls: ['./contractor-side-document.component.scss']
})
export class ContractorSideDocumentComponent implements OnInit
{

  public documentList: any = [];
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  private userId: string;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    @Inject(DOCUMENT) private document: Document,
    private config: AppConfig,

  ) 
  {
    this.userId = localStorage.getItem('userKey');
  }


  GetDocumentListByProjectId()
  {
    this.sub = this.aService.GetDocumentsListByProjectId(this.popupModel.Id).subscribe(x =>
    {
      this.documentList = x;
    });
  }

  ngOnInit()
  {
    this.GetDocumentListByProjectId();
  }

  goToUrl(blobname): void
  {
    this.document.location.href = this.config.apiUrl + "/DownloadFileApi/GetDownloadFile?filename=" + blobname;
  }
}
