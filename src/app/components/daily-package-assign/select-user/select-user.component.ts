import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageModel } from '../../../models/packageModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent implements OnInit, OnDestroy
{
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  PackageOb: PackageModel;
  private userId: string;
  submitted = false;
  dataList: any;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
  ) 
  {
    this.PackageOb = new PackageModel();
  }



  ngOnInit()
  {
 this.loadCustomerList() 
  }


  ngOnDestroy()
  {
    // this.sub.unsubscribe();
  }

  private loadCustomerList(): void
  {
    this.sub = this.aService.GetCustomerList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
  popUpClose(data){
    this.activeModal.close(data);
  }
}


