import { Component, Input, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent implements OnInit
{
  public contractorList: any = [];
  private sub: any; 
  @Input() popupModel: any = { Id: "0" };
  private userId: string;
  submitted = false;
  constructor(   
    public activeModal: NgbActiveModal,
    // private aService: ApplicationService,
    // private toasterService: ToastrService,
  ) 
  {
    this.userId = localStorage.getItem('userKey');
  }

  // GetStatusListByProjectId()
  // {
  //   this.sub = this.aService.GetContractorListByProjectId(this.popupModel.Id).subscribe(x =>
  //   {
  //     this.contractorList = x;
  //   });
  // }   
  // ngAfterViewInit()
  // {
  //   this.jsPlumbInstance = jsPlumb.getInstance();
  // }

  ngOnInit()
  {

  }


}
