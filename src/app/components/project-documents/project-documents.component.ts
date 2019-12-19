import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

@Component({
  selector: 'app-project-documents',
  templateUrl: './project-documents.component.html',
  styleUrls: ['./project-documents.component.scss']
})
export class ProjectDocumentsComponent implements OnInit, OnDestroy
{

  private sub: any;
  public dataList: any = [];
  popupModel: any = { Id: "0" };

  @ViewChild('content') content: ElementRef;
  constructor(private aService: ApplicationService, private modalService: NgbModal, private router: Router)
  {

  }

  ngOnInit()
  {
    this.loadUserList();
  }

  private loadUserList(): void
  {
    this.sub = this.aService.GetUserList().subscribe(x =>
    {
      this.dataList = x;
    });
  }

  ngOnDestroy()
  {
    this.sub.unsubscribe();
  }



}
