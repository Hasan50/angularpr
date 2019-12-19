import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserDashboardComponent } from '../../user-dashboard/user-dashboard.component';
import { ContractorDashboardComponent } from '../../contractor-dashboard/contractor-dashboard.component';
import { SettingsComponent } from '../../components/settings/settings.component';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { ContractorListComponent } from '../../components/contractor-list/contractor-list.component';
import { StageListComponent } from '../../components/stage-list/stage-list.component';
import { StageTreeComponent } from '../../components/stage-tree/stage-tree.component';
import { StageWithStageTreeComponent } from '../../components/stage-with-stage-tree/stage-with-stage-tree.component';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { ContractorSidePmComponent } from '../../components/project-management/contractor-side-pm/contractor-side-pm.component';
import { ClientSidePmComponent } from '../../components/project-management/client-side-pm/client-side-pm.component';
// import { AgamiSidePmComponent } from '../../components/project-management/agami-side-pm/agami-side-pm.component';
import { ProjectsPipelineComponent } from '../../components/projects-pipeline/projects-pipeline.component';
import { ProjectCompletedComponent } from '../../components/project-completed/project-completed.component';
import { ProjectCancelledComponent } from '../../components/project-cancelled/project-cancelled.component';
import { ProjectDocumentsComponent } from '../../components/project-documents/project-documents.component';
import { PreBidProjectsComponent } from '../../components/pre-bid-projects/pre-bid-projects.component';
import { LiveProjectsComponent } from '../../components/live-projects/live-projects.component';
import { ProjectStageComponent } from '../../components/project-stage/project-stage.component';
import { AdminLiveProjectComponent } from '../../components/admin-live-projects/admin-live-project.component';
import { ProjectContractorComponent } from '../../components/project-contractor/project-contractor.component';
import { StageTreeConnectComponent } from '../../components/stage-tree-connect/stage-tree-connect.component';
import { CSStageTreeConnectComponent } from '../../components/cs-stage-tree-connect/cs-stage-tree-connect.component';
import { CustomerComponent } from 'app/components/customer/customer.component';
import { AuthGuard } from 'app/guard';
import { Role } from 'app/models/Roles';
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
import { MasterSettingComponent } from 'app/components/settings/master-setting/master-setting.component';
import { CompanyComponent } from 'app/components/company/company.component';
import { UserDailyPackageAssignComponent } from 'app/components/user-daily-package-assign/user-daily-package-assign.component';
import { DashbordSettingComponent } from 'app/components/settings/dashbord-setting/dashbord-setting.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'customers', component: CustomerComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'company', component: CompanyComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'raw-items', component: RawItemComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'blood-group', component: BloodGroupComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'area', component: AreaComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'sector', component: SectorComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'thana', component: ThanaComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'post-office', component: PostOfficeComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'period-type', component: PeriodTypeComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'package-raw-items', component: PackageRawItemComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'package', component: PackageComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'package-advance', component: PackageAdvanceComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'daily-package-assign', component: DailyPackageAssignComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'user-daily-package-assign', component: UserDailyPackageAssignComponent, canActivate: [AuthGuard], data: { roles: [Role.User] } },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.User] } },
    { path: 'contractor-dashboard', component: ContractorDashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.Employee] } },
    { path: 'settings', component: SettingsComponent },
    { path: 'contractor-list', component: ContractorListComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'project-contractor', component: ProjectContractorComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'stage-tree-connect/:id', component: StageTreeConnectComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'cs-stage-tree-connect/:id', component: CSStageTreeConnectComponent, canActivate: [AuthGuard], data: { roles: [Role.User] } },
    { path: 'project-management-contractor', component: ContractorSidePmComponent },
    { path: 'project-management-client', component: ClientSidePmComponent, canActivate: [AuthGuard], data: { roles: [Role.User] } },
    // { path: 'project-management-agami', component: AgamiSidePmComponent },
    { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'change-password', component: ChangePasswordComponent },
    { path: 'admin-live-project', component: AdminLiveProjectComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'project-pipeline', component: ProjectsPipelineComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'project-completed', component: ProjectCompletedComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'project-cancelled', component: ProjectCancelledComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

    { path: 'project-documents', component: ProjectDocumentsComponent },
    { path: 'live-projects', component: LiveProjectsComponent, canActivate: [AuthGuard], data: { roles: [Role.User] } },
    { path: 'stage-list', component: StageListComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'stage-tree-relation', component: StageWithStageTreeComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'stage-tree', component: StageTreeComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'pre-bid-projects', component: PreBidProjectsComponent, canActivate: [AuthGuard], data: { roles: [Role.User] } },
    { path: 'project-stage', component: ProjectStageComponent },
    { path: 'master-setting', component: MasterSettingComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'Dashbord-setting', component: DashbordSettingComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

];
