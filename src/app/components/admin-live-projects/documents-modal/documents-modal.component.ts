import { Component, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectDocumentModel } from '../../../models/projectDocumentModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalService } from '../../../confirm-modal/confirm-modal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { AppConfig } from '../../../app.config';

@Component({
  selector: 'app-documents-modal',
  templateUrl: './documents-modal.component.html',
  styleUrls: ['./documents-modal.component.scss']
})
export class DocumentsModalComponent implements OnInit
{
  ngForm: FormGroup;
  public documentList: any = [];
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  DocumentOb: ProjectDocumentModel;
  private userId: string;
  submitted = false;
  FileDiv = false;
  LinkDiv = false;
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
    @Inject(DOCUMENT) private document: Document,
    private config: AppConfig,
    private ConfirmationModalService: ConfirmationModalService

  ) 
  {
    this.DocumentOb = new ProjectDocumentModel();
    this.userId = localStorage.getItem('userKey');
  }

  onSelectedFile(event)
  {
    if (event.target.files.length)
    {
      const file = event.target.files[0];
      this.DocumentOb.BlobName = file;
    }
  }
  onSubmit()
  {
    var ob =
    {
      Id: null,
      ProjectId: this.popupModel.Id,
      UploadedAt: null,
      UploadedById: this.userId,
      Link: this.DocumentOb.Link,
      IsDocument: this.DocumentOb.IsDocument,
      Title: this.DocumentOb.Title,
    }
    const formData = new FormData();
    formData.append('title', JSON.stringify(ob));
    formData.append('BlobName', this.DocumentOb.BlobName);

    this.sub = this.aService.UploadDocuments(formData).subscribe(x =>
    {
      if (x.Success)
      {
        this.GetDocumentListByProjectId();
        this.DocumentOb.Title = null;
        this.DocumentOb.Link = null;
        this.DocumentOb.BlobName = '';
        this.toasterService.success("Client Created Successfully", 'Success');
      }
    });
  }

  showDiv(x)
  {
    if (x == 1)
    {
      this.FileDiv = false;
      this.LinkDiv = true;
    }
    else if (x == 2)
    {
      this.FileDiv = true;
      this.LinkDiv = false;
    }
  }
  GetDocumentListByProjectId()
  {
    this.sub = this.aService.GetDocumentsListByProjectId(this.popupModel.Id).subscribe(x =>
    {
      this.documentList = x;
    });
  }
  goToUrl(blobname): void
  {
    this.document.location.href = this.config.apiUrl + "/DownloadFileApi/GetDownloadFile?filename=" + blobname;
  }
  ngOnInit()
  {
    this.GetDocumentListByProjectId();
    this.ngForm = this.fb.group({
      Title: [''],
      BlobName: ['']
    });
  }

  onChange(item)
  {
    item.IsSelect = !item.IsSelect;
  }

  public openConfirmationDialog(model)
  {
    this.ConfirmationModalService.confirm('Please confirm..', 'Do you really want to Delete This Document?')
      .then((confirmed) => this.deleteDocument(confirmed, model))
      .catch(() => console.log('dismissed'));
  }

  deleteDocument(confirm, model)
  {
    if (confirm)
    {
      this.sub = this.aService.DeleteDocument(model).subscribe(x =>
      {
        if (x.Success)
        {
          this.GetDocumentListByProjectId();
          this.toasterService.success("Client Deleted Successfully", 'Success');
        }
        else
        {
          this.toasterService.error("Something Error Happened. Try again later", 'Error');
        }
      });
    }
  }
}
