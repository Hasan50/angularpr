import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StageHierarchyModel } from '../../../models/stageHierarchyModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../services/common.service';


export interface ColumnNumber
{
  value: string;
  viewValue: string;
}


export interface SerialNumber
{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.scss']
})
export class AddStageComponent implements OnInit, OnDestroy
{

  columnNumber: ColumnNumber[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
  ];

  serialNumber: SerialNumber[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
  ];

  // columnNumberControl = new FormControl('', [Validators.required]);
  submitted = false;
  private sub: any;

  public parentTypes: any = [];

  @Input() popupModel: any = { Id: "0" };
  StageOb: StageHierarchyModel;
  private userId: string;


  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
    private commonService: CommonService
  ) 
  {
    this.userId = localStorage.getItem('userKey');
    this.StageOb = new StageHierarchyModel();
    this.StageOb.Name = null;
    this.StageOb.ParentId = 0;
    this.StageOb.LevelNo = 0;
    this.StageOb.SerialNo = 0;
    this.StageOb.IsActive = true;
    this.StageOb.CreatedById = null;
    this.StageOb.CreatedAt = null;
  }



  ngOnInit()
  {
    this.loadStageList();
    // this.registerForm = this.formBuilder.group({
    //   Name: ['', Validators.required],
    // });
  }


  private loadStageList(): void
  {
    this.sub = this.aService.GetStageList().subscribe(x =>
    {
      this.parentTypes = x;
    });
  }
  numberOnly(event): boolean
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
    {
      return false;
    }
    return true;
  }


  ngOnDestroy()
  {
    // this.sub.unsubscribe();
  }

  public SaveOrUpdate()
  {
    this.submitted = true;
    if (this.commonService.IsNullOrEmpty(this.StageOb.Name))
    {
      return;
    }
    if (this.popupModel.Id == "0")
    {
      this.SaveStage();
    }
    else
    {
      this.UpdateStage();
    }
  }

  private SaveStage()
  {
    this.sub = this.aService.SaveStage(this.StageOb).subscribe(x =>
    {
      if (x.Success)
      {
        this.toasterService.success("Stage Created Successfully", 'Success');
      }
      else
      {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

  private UpdateStage()
  {
    // this.sub = this.aService.UpdateUser(this.UserOb).subscribe(x =>
    // {
    //   if (x.Success)
    //   {
    //     this.toasterService.success("User Updated Successfully", 'Success');
    //   }
    //   else
    //   {
    //     this.toasterService.error("Something Error Happened. Try again later", 'Error');
    //   }

    //   this.activeModal.close();
    // });
  }

}


