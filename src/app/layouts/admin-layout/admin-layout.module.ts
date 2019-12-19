import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';
import { ContractorDashboardComponent } from '../../contractor-dashboard/contractor-dashboard.component';
import { SettingsComponent } from '../../components/settings/settings.component';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { ContractorListComponent } from '../../components/contractor-list/contractor-list.component';
import { StageListComponent } from '../../components/stage-list/stage-list.component';
import { StageTreeComponent } from '../../components/stage-tree/stage-tree.component';
import { StageWithStageTreeComponent } from '../../components/stage-with-stage-tree/stage-with-stage-tree.component';
import { ContractorSidePmComponent } from '../../components/project-management/contractor-side-pm/contractor-side-pm.component';
import { ClientSidePmComponent } from '../../components/project-management/client-side-pm/client-side-pm.component';
// import { AgamiSidePmComponent } from '../../components/project-management/agami-side-pm/agami-side-pm.component';
import { ProjectCompletedComponent } from '../../components/project-completed/project-completed.component';
import { ProjectCancelledComponent } from '../../components/project-cancelled/project-cancelled.component';
import { ProjectsPipelineComponent } from '../../components/projects-pipeline/projects-pipeline.component';
import { ProjectDocumentsComponent } from '../../components/project-documents/project-documents.component';
import { PreBidProjectsComponent } from '../../components/pre-bid-projects/pre-bid-projects.component';
import { LiveProjectsComponent } from '../../components/live-projects/live-projects.component';
import { ProjectStageComponent } from '../../components/project-stage/project-stage.component';
import { ProjectWithStageTreeComponent } from '../../components/project-with-stage-tree/project-with-stage-tree.component';
import { StageTreeConnectComponent } from '../../components/stage-tree-connect/stage-tree-connect.component';
import { CSStageTreeConnectComponent } from '../../components/cs-stage-tree-connect/cs-stage-tree-connect.component';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPaginationModule } from 'ngx-pagination';
import
{
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatTabsModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangePasswordComponent } from 'app/components/change-password/change-password.component';
import { AdminLiveProjectComponent } from 'app/components/admin-live-projects/admin-live-project.component';
import { ProjectContractorComponent } from 'app/components/project-contractor/project-contractor.component';
import { ProjectContractorBodyComponent } from 'app/components/project-contractor/project-contractor-body.component.';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerComponent } from 'app/components/customer/customer.component';
import { PackageComponent } from 'app/components/package/package.component';
import { DailyPackageAssignComponent } from 'app/components/daily-package-assign/daily-package-assign.component';
import { PackageAdvanceComponent } from 'app/components/package-advance/package-advance.component';
import { RawItemComponent } from 'app/components/raw-item/raw-item.component';
import { PeriodTypeComponent } from 'app/components/period-type/period-type.component';
import { PackageRawItemComponent } from 'app/components/package-raw-item/package-raw-item.component';
import { BloodGroupComponent } from 'app/components/blood-group/blood-group.component';
import { AreaComponent } from 'app/components/area/area.component';
import { SectorComponent } from 'app/components/sector/sector.component';
import { ThanaComponent } from 'app/components/thana/thana.component';
import { PostOfficeComponent } from 'app/components/post-office/post-office.component';

import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';

import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';

import { ButtonAllModule } from '@syncfusion/ej2-angular-buttons';

import { CheckBoxAllModule } from '@syncfusion/ej2-angular-buttons';

import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';

import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';

import { MasterSettingComponent } from 'app/components/settings/master-setting/master-setting.component';

import { DashbordSettingComponent} from 'app/components/settings/dashbord-setting/dashbord-setting.component';

import { CompanyComponent } from 'app/components/company/company.component';
import { UserDailyPackageAssignComponent } from 'app/components/user-daily-package-assign/user-daily-package-assign.component';
import { PostCategoryComponent } from 'app/components/post-category/post-category.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    NgbModule,
    ScheduleAllModule, RecurrenceEditorAllModule,   NumericTextBoxAllModule, DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule, CheckBoxAllModule, ToolbarAllModule,   DropDownListAllModule, ContextMenuAllModule, MaskedTextBoxModule, UploaderAllModule, MultiSelectAllModule, TreeViewModule, ButtonAllModule,

  ],
  declarations: [
    DashboardComponent,
    UserDashboardComponent,
    ContractorDashboardComponent,
    ProjectsPipelineComponent,
    ProjectCompletedComponent,
    ProjectCancelledComponent,
    ProjectDocumentsComponent,
    LiveProjectsComponent,
    AdminLiveProjectComponent,
    PreBidProjectsComponent,
    SettingsComponent,
    EmployeeListComponent,
    StageTreeConnectComponent,
    CSStageTreeConnectComponent,
    ContractorListComponent,
    ProjectContractorComponent,
    ProjectContractorBodyComponent,
    ContractorSidePmComponent,
    ClientSidePmComponent,
    // AgamiSidePmComponent,
    StageListComponent,
    StageWithStageTreeComponent,
    StageTreeComponent,
    ProjectStageComponent,
    ProjectWithStageTreeComponent,
    ChangePasswordComponent,
    CustomerComponent,
    RawItemComponent,
    BloodGroupComponent,
    AreaComponent,
    SectorComponent,
    ThanaComponent,
    PostOfficeComponent,
    CompanyComponent,
    PackageRawItemComponent,
    PackageComponent,
    PackageAdvanceComponent,
    DailyPackageAssignComponent,
    UserDailyPackageAssignComponent,
    PeriodTypeComponent,
    MasterSettingComponent,
    DashbordSettingComponent,
    PostCategoryComponent
  ],
  entryComponents: [
  ]
})

export class AdminLayoutModule { }
