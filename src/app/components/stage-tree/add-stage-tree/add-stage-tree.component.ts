import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StageTreeModel } from '../../../models/StageTreeModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-stage-tree',
  templateUrl: './add-stage-tree.component.html',
  styleUrls: ['./add-stage-tree.component.scss']
})
export class AddStageTreeComponent implements OnInit, OnDestroy
{
  options: FormGroup;
  private sub: any;

  @Input() popupModel: any = { Id: "0" };
  StageOb: StageTreeModel;
  private userId: string;
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) 
  {
    this.userId = localStorage.getItem('userKey');
    this.StageOb = new StageTreeModel();
    this.StageOb.IsActive = true;
  }



  ngOnInit()
  {





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
    if (this.popupModel.Id == "0")
    {
      this.submitted = true;
      this.SaveStageTree();
    }
    else
    {
      this.UpdateStageTree();
    }
  }

  private SaveStageTree()
  {
    // this.StageOb.LoginKey = this.userId;
    this.sub = this.aService.SaveStageTree(this.StageOb).subscribe(x =>
    {
      if (x.Success)
      {
        this.toasterService.success("Stage Tree Created Successfully", 'Success');
      }
      else
      {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

  private UpdateStageTree()
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


