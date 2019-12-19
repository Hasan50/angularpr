import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { JwtInterceptor, ErrorInterceptor } from 'helpers';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AlertComponent } from './directives/alert.component';
import { AppConfig } from './app.config';
import { AlertService, AuthenticationService, ApplicationService, CommonService } from './services';
import { EventEmitterService } from './services/eventemiter.service';
import { AuthGuard } from './guard';
import { LoginComponent } from './components/login/login.component';
import { HomeLeftSectionComponent } from './directives/home-left-section/home-left-section.component';
import { LoaderComponent } from './components/loader/loader.component';
// import { InputHelpComponent } from './components/settings/input-help/input-help.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { StageTreeConnectComponent } from './components/stage-tree-connect/stage-tree-connect.component';
import { EditEmployeeComponent } from './components/employee-list/edit-employee/edit-employee.component';
import { EditContractorComponent } from './components/contractor-list/edit-contractor/edit-contractor.component';
import { AddEmployeeComponent } from './components/employee-list/add-employee/add-employee.component';
import { AddContractorComponent } from './components/contractor-list/add-contractor/add-contractor.component';
// import { AddProjectByAgamiComponent } from './components/project-management/agami-side-pm/add-project-by-agami/add-project-by-agami.component';
import { AddProjectByClientComponent } from './components/project-management/client-side-pm/add-project-by-client/add-project-by-client.component';
import { ContractorSideDocumentComponent } from './components/project-management/contractor-side-pm/contractor-side-document/contractor-side-document.component';
import { AddStageComponent } from './components/stage-list/add-stage/add-stage.component';
import { AddStageTreeComponent } from './components/stage-tree/add-stage-tree/add-stage-tree.component';
import { EditStageComponent } from './components/stage-list/edit-stage/edit-stage.component';
import { EditStageTreeComponent } from './components/stage-tree/edit-stage-tree/edit-stage-tree.component';
import { AddProjectStageComponent } from './components/project-stage/add-project-stage/add-project-stage.component';
import { AddProjectContractorComponent } from './components/project-contractor/add-project-contractor/add-project-contractor.component';
import { AddStageWithStageTreeComponent } from './components/stage-with-stage-tree/add-stage-with-stage-tree/add-stage-with-stage-tree.component';
import { ContractorListModalComponent } from './components/admin-live-projects/contractor-list-modal/contractor-list-modal.component';
import { StatusModalComponent } from './components/admin-live-projects/status-modal/status-modal.component';
import { DocumentsModalComponent } from './components/admin-live-projects/documents-modal/documents-modal.component';
import { ClientSideDocumentsModalComponent } from './components/live-projects/client-side-documents-modal/client-side-documents-modal.component';
import { ClientSideStatusModalComponent } from './components/live-projects/client-side-status-modal/client-side-status-modal.component';
import { ClientSideContractorListModalComponent } from './components/live-projects/client-side-contractor-list-modal/client-side-contractor-list-modal.component';
import
{
  MatSelectModule,
  MatRadioModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatCheckboxModule,
  MatDialogModule,
  MatButtonModule,
  MatTooltipModule,
  MatDatepickerModule,
  
  // MatSnackBarModule,
} from '@angular/material';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ConfirmationModalService } from './confirm-modal/confirm-modal.service';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AddCustomerComponent } from './components/customer/add-customers/add-customer.component';
import { AddPackageComponent } from './components/package/add-package/add-package.component';
import { AddPackageAdvanceComponent } from './components/package-advance/add-package-advance/add-package-advance.component';
import { AddRawItemComponent } from './components/raw-item/add-raw-item/add-raw-item.component';
import { SelectUserComponent } from './components/daily-package-assign/select-user/select-user.component';
import { AddPeriodTypeComponent } from './components/period-type/add-period-type/add-period-type.component';
import { AddPackageRawItemComponent } from './components/package-raw-item/add-package-raw-item/add-package-raw-item.component';
import { AddBloodGroupComponent } from './components/blood-group/add-blood-group/add-blood-group.component';
import { AddAreaComponent } from './components/area/add-area/add-area.component';
import { AddSectorComponent } from './components/sector/add-sector/add-sector.component';
import { AddThanaComponent } from './components/thana/add-thana/add-thana.component';
import { AddPostOfficeComponent } from './components/post-office/add-post-office/add-post-office.component';
import { SelectEmployeeComponent } from './components/customer/employee-list/select-employee.component';
import { AddCompanyComponent } from './components/company/add-company/add-company.component';
import { SelectPackageComponent } from './components/daily-package-assign/select-package/select-package.component';
import { AddPostCategoryComponent } from './components/post-category/add-post-category/add-post-category.component';
import { UserSelectPackageComponent } from './components/user-daily-package-assign/user-select-package/user-select-package.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatDatepickerModule,
    SlickCarouselModule,
    BsDatepickerModule.forRoot(),
    // MatSnackBarModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    HomeComponent,
    AlertComponent,
    LoginComponent,
    HomeLeftSectionComponent,
    LoaderComponent,
    // InputHelpComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EditStageComponent,
    EditStageTreeComponent,
    EditContractorComponent,
    // StageTreeConnectComponent,
    ClientSideDocumentsModalComponent,
    ClientSideStatusModalComponent,
    ClientSideContractorListModalComponent,
    ContractorListModalComponent,
    StatusModalComponent,
    DocumentsModalComponent,
    AddContractorComponent,
    // AddProjectByAgamiComponent,
    AddProjectByClientComponent,
    ContractorSideDocumentComponent,
    AddStageComponent,
    AddStageWithStageTreeComponent,
    AddStageTreeComponent,
    AddProjectStageComponent,
    AddProjectContractorComponent,
    ConfirmModalComponent,
    // StarRatingComponent,
    //Customer Add
    AddCustomerComponent,
    AddCompanyComponent,
    AddRawItemComponent,
    AddPackageRawItemComponent,
    AddPackageComponent,
    AddPackageAdvanceComponent,
    AddBloodGroupComponent,
    AddAreaComponent,
    AddSectorComponent,
    AddThanaComponent,
    AddPostOfficeComponent,
    SelectUserComponent,
    AddPeriodTypeComponent,
    SelectEmployeeComponent,
    SelectPackageComponent,
    AddPostCategoryComponent,
    UserSelectPackageComponent

  ],
  entryComponents: [
    // InputHelpComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EditStageComponent,
    EditStageTreeComponent,
    EditContractorComponent,
    // StageTreeConnectComponent,
    ClientSideDocumentsModalComponent,
    ClientSideStatusModalComponent,
    ClientSideContractorListModalComponent,
    ContractorListModalComponent,
    StatusModalComponent,
    DocumentsModalComponent,
    AddContractorComponent,
    // AddProjectByAgamiComponent,
    AddProjectByClientComponent,
    ContractorSideDocumentComponent,
    AddStageComponent,
    AddStageWithStageTreeComponent,
    AddStageTreeComponent,
    AddProjectStageComponent,
    AddProjectContractorComponent,
    ConfirmModalComponent,
    // StarRatingComponent,
    AddCustomerComponent,
    AddCompanyComponent,
    AddRawItemComponent,
    AddPackageRawItemComponent,
    AddPackageComponent,
    AddPackageAdvanceComponent,
    AddBloodGroupComponent,
    AddAreaComponent,
    AddSectorComponent,
    AddThanaComponent,
    AddPostOfficeComponent,
    SelectUserComponent,
    AddPeriodTypeComponent,
    SelectEmployeeComponent,
    SelectPackageComponent,
    AddPostCategoryComponent,
    UserSelectPackageComponent
  ],
  providers: [
    AppConfig,
    AuthGuard,
    AuthenticationService,
    AlertService,
    ApplicationService,
    CommonService,
    EventEmitterService,
    // DialogService,
    ConfirmationModalService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
