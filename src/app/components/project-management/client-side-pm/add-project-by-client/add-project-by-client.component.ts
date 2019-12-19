import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicationService } from '../../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
import { AgamiProjectModel } from '../../../../models/agamiProjectModel';

@Component({
  selector: 'app-add-project-by-client',
  templateUrl: './add-project-by-client.component.html',
  styleUrls: ['./add-project-by-client.component.scss']
})
export class AddProjectByClientComponent implements OnInit, OnDestroy
{
  options: FormGroup;
  private sub: any;
  @Input() popupModel: any = { Id: "0" };
  ProjectOb: AgamiProjectModel;
  private userId: string;

  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService
  ) 
  {
    this.userId = localStorage.getItem('userKey');
    this.ProjectOb = new AgamiProjectModel();
  }

  ngOnInit()
  {
    if (this.popupModel.Id == "0")
    { this.GetProjectCode(); }
    else
    {
      this.getProjectDetail();
    }
  }
  getProjectDetail()
  {
    this.sub = this.aService.GetProjectDetailsById(this.popupModel.Id).subscribe(x =>
    {
      this.ProjectOb = x;
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
    this.SaveProject();
  }

  private GetProjectCode()
  {
    this.sub = this.aService.GetEmployeeCode().subscribe(x =>
    {
      this.ProjectOb.ProjectCode = x
    });
  }
  private SaveProject()
  {
    this.sub = this.aService.SaveProject(this.ProjectOb).subscribe(x =>
    {
      if (x.Success)
      {
        if (this.popupModel.Id == "0")
        {
          this.toasterService.success("Project Created Successfully", 'Success');
        } else
        {
          this.toasterService.success("Project Updated Successfully", 'Success');
        }
      }
      else
      {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

  // private UpdateProject()
  // {
  //   this.sub = this.aService.UpdateProject(this.ProjectOb).subscribe(x =>
  //   {
  //     if (x.Success)
  //     {
  //       this.toasterService.success("Project Updated Successfully", 'Success');
  //     }
  //     else
  //     {
  //       this.toasterService.error("Something Error Happened. Try again later", 'Error');
  //     }

  //     this.activeModal.close();
  //   });
  // }


  makeid(length)
  {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++)
    {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // console.log(makeid(50))
}


