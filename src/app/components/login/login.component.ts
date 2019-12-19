import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { AppConfig } from '../../app.config';
import { Role } from 'app/models/Roles';
@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  host: { 'class': 'row' }

})

export class LoginComponent implements OnInit, AfterViewInit
{
  hide = true;
  options: FormGroup;
  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage = '';
  isInvalidUser = false;
  isInvalidPassword = false;
  private authWindow: Window;
  failed: boolean;
  error: string;
  errorDescription: string;
  origin: string;
  isRequesting: boolean;
  currentUser: any;

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private authenticationService: AuthenticationService, private config: AppConfig)
  {
    if (window.addEventListener)
    {
      window.addEventListener("message", this.handleMessage.bind(this), false);
    } else
    {
      (<any>window).attachEvent("onmessage", this.handleMessage.bind(this));
    }
    this.origin = window.location.origin;
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
  ngAfterViewInit()
  {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
  }
  ngOnInit()
  {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login()
  {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data =>
        {
          //this.router.navigate([this.returnUrl]);
          this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          if (this.currentUser != null && this.currentUser.Details != null
            && this.currentUser.Details.UserTypeId == Role.Admin)
          {
            this.router.navigate(['dashboard']);
          }
          if (this.currentUser != null && this.currentUser.Details != null
            && this.currentUser.Details.UserTypeId == Role.User)
          {
            this.router.navigate(['user-dashboard']);
          }
          if (this.currentUser != null && this.currentUser.Details != null
            && this.currentUser.Details.UserTypeId == Role.Employee)
          {
            this.router.navigate(['contractor-dashboard']);
          }
          this.loading = false;
        },
        error =>
        {
          this.loading = false;
        });
  }

  handleMessage(event: Event)
  {
    if (!this.authWindow)
    {
      return;
    }
    const message = event as MessageEvent;
    // Only trust messages from the below origin.
    if (message.origin !== this.origin) return;

    this.authWindow.close();

    const result = JSON.parse(message.data);
    if (!result.status)
    {
      this.failed = true;
      this.error = result.error;
      this.errorDescription = result.errorDescription;
    }

  }

}
