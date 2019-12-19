import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerRegistrationModel } from '../../../models/customerRegistrationModel';
import { UserWithPackageModel } from '../../../models/UserWithPackageModel';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-select-employee',
  templateUrl: './select-employee.component.html',
  styleUrls: ['./select-employee.component.scss']
})
export class SelectEmployeeComponent implements OnInit, OnDestroy {
  hideElement: true;
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  CustomerOb: CustomerRegistrationModel;
  UserWithPackageOb: UserWithPackageModel;
  private userId: string;
  submitted = false;
  dataList: [];
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
  ) {
    this.userId = localStorage.getItem('userKey');
  }

  ngOnInit() {
   this.loadEmployeeList();
  }
  getCustomerDetail() {

  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }
  private loadEmployeeList(): void
  {
    this.sub = this.aService.GetEmployeeList().subscribe(x =>
    {
      this.dataList = x;
    });
  }
  popUpClose(data){
    this.activeModal.close(data);
  }
}


