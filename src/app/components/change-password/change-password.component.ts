import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { LocalPasswordModel } from '../../models/localPasswordModel';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tasks',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit, OnDestroy
{
  userModel: any;
  private sub: any;
  public dataList: any = [];
  UserOb: LocalPasswordModel;
  submitted = false;
  returnUrl: string;
  @ViewChild('content') content: ElementRef;

  constructor(
    private aService: ApplicationService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  )
  {
    this.userModel = JSON.parse(localStorage.getItem('currentUser'));

    this.UserOb = new LocalPasswordModel();
    this.UserOb.UserName = this.userModel.Details.LoginID
  }

  ngOnInit()
  {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public ChangePassword()
  {
    this.submitted = true;
    this.sub = this.aService.ChangePassword(this.UserOb).subscribe(x =>
    {
      if (x.Success)
      {
        this.toasterService.success("Password changed Successfully", 'Success');
        this.router.navigate([this.returnUrl]);
      }
      else
      {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }
    });
  }

  ngOnDestroy()
  {
    // this.sub.unsubscribe();
  }

}
