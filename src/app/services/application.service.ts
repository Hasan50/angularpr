import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, ResponseContentType, ResponseType } from '@angular/http';
import { AppConfig } from '../app.config';
import 'rxjs/add/operator/map'

@Injectable()
export class ApplicationService implements OnInit {




  constructor(private http: HttpClient, private http2: Http, private config: AppConfig) {
  }
  ngOnInit(): void {

  }
  // DownloadFileApi


  // public DownloadFile()
  // {
  //    let options = new RequestOptions({responseType: ResponseContentType.Blob});
  //   return this.http2.get(this.config.apiUrl + 'DownloadFileApi/DownloadFile',options).map((response: Response) => <Blob>response.blob())  ;
  // }
  // public DownloadFile()
  // {

  //     return this.http.get(this.config.apiUrl + 'DownloadFileApi/DownloadFile', {responseType: 'blob'}).map(res => {
  //       return res;
  //   });
  // }
  public DownloadFile() {

    return this.http.get<any>(this.config.apiUrl + 'DownloadFileApi/GetDownloadFile');
  }
  public CreateUser(aModel) {
    aModel.CreatedById = localStorage.getItem("userKey");;
    return this.http.post<any>(this.config.apiUrl + 'AccountApi/Register/', aModel);
  }

  public ChangePassword(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'AccountApi/ChangePassword/', aModel);
  }

  public UpdateUser(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'UserApi/UpdateUser/', aModel);
  }
  public GetExecution() {
    return this.http.get<any>(this.config.apiUrl + 'AccountApi/GetExecution');
  }
  public GetUserDetails() {
    return this.http.get<any>(this.config.apiUrl + 'AccountApi/GetUserDetails?userKey=' + localStorage.getItem("userKey"));
  }
  public GetUserById(id: string) {
    return this.http.get<any>(this.config.apiUrl + 'AccountApi/GetUserDetails?userKey=' + id);
  }
  public GetUserList() {
    return this.http.get<any>(this.config.apiUrl + 'UserApi/GetAll');
  }

  // Contractor setup

  public GetContractorList() {
    return this.http.get<any>(this.config.apiUrl + 'ContractorApi/GetContractorList');
  }

  public GetContractorListWithPaging(currentPage, pageSize) {
    return this.http.get<any>(this.config.apiUrl + 'ContractorApi/GetContractorListWithPaging?currentPage=' + currentPage + '&pageSize=' + pageSize);
  }

  public SaveContractor(aModel) {
    if (aModel.Id == null) {
      aModel.CreatedById = localStorage.getItem("userKey");
      return this.http.post<any>(this.config.apiUrl + 'ContractorApi/CreateContractor', aModel);
    } else {
      aModel.UpdatedById = localStorage.getItem("userKey");
      return this.http.post<any>(this.config.apiUrl + 'ContractorApi/UpdateContractor', aModel);
    }
  }

  public DeleteContractor(id) {
    return this.http.post<any>(this.config.apiUrl + 'ContractorApi/DeleteContractor/', id);
  }



  public DeleteProjectContractor(id) {
    return this.http.post<any>(this.config.apiUrl + 'ContractorApi/DeleteProjectContractor/', id);
  }

  public SaveProjectContractor(aModel) {
    if (aModel.Id == null) {
      aModel.CreatedById = localStorage.getItem("userKey");
    } else {
      aModel.UpdatedById = localStorage.getItem("userKey");
    }
    return this.http.post<any>(this.config.apiUrl + 'ContractorApi/SaveProjectContractor', aModel);
  }

  public GetContractorListByProjectId(id: any) {
    return this.http.get<any>(this.config.apiUrl + 'ContractorApi/GetContractorListByProjectId?projectId=' + id);
  }

  public GetContractorDetailsById(id: any) {
    return this.http.get<any>(this.config.apiUrl + 'ContractorApi/GetContractorDetailsById?id=' + id);
  }
  public UpdateProjectContractorFeedback(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'ContractorApi/UpdateProjectContractorFeedback', aModel);
  }

  // Client setup

  public GetClientList() {
    return this.http.get<any>(this.config.apiUrl + 'ClientApi/GetClientList');
  }


  public GetClientListWithPaging(currentPage, pageSize) {
    return this.http.get<any>(this.config.apiUrl + 'ClientApi/GetClientListWithPaging?currentPage=' + currentPage + '&pageSize=' + pageSize);
  }

  public GetClientDetailsById(id: any) {
    return this.http.get<any>(this.config.apiUrl + 'ClientApi/GetClientDetailsById?id=' + id);
  }

  public GetClientDropdownList() {
    return this.http.get<any>(this.config.apiUrl + 'ClientApi/GetClientDropdownList');
  }

  public SaveCLient(aModel) {
    if (aModel.Id == null) {
      aModel.CreatedById = localStorage.getItem("userKey");
      return this.http.post<any>(this.config.apiUrl + 'ClientApi/CreateClient', aModel);
    } else {
      aModel.UpdatedById = localStorage.getItem("userKey");
      return this.http.post<any>(this.config.apiUrl + 'ClientApi/UpdateClient', aModel);
    }
  }

  public DeleteClient(id) {
    return this.http.post<any>(this.config.apiUrl + 'ClientApi/DeleteClient/', id);
  }

  // StageTreeApi
  public GetStageTreeList() {
    return this.http.get<any>(this.config.apiUrl + 'StageTreeApi/GetStageTreeList');
  }

  public SaveStageTree(aModel) {
    if (aModel.Id == null) {
      aModel.CreatedById = localStorage.getItem("userKey");
    }
    return this.http.post<any>(this.config.apiUrl + 'StageTreeApi/SaveStageTree', aModel);
  }

  public UpdateStageTree(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'StageTreeApi/UpdateStageTree', aModel);
  }

  public GetStageTreeDetailsById(id: any) {
    return this.http.get<any>(this.config.apiUrl + 'StageTreeApi/GetStageTreeDetailsById?id=' + id);
  }

  public GetStageTreeDropdownList() {
    return this.http.get<any>(this.config.apiUrl + 'StageTreeApi/GetStageTreeDropdownList');
  }

  public GetStageTreeDropdownListByCount() {
    return this.http.get<any>(this.config.apiUrl + 'StageTreeApi/GetStageTreeDropdownListByCount');
  }



  public GetStageWithStageTreeList() {
    return this.http.get<any>(this.config.apiUrl + 'StageTreeApi/GetStageWithStageTreeList');
  }

  public SaveStageWithStageTree(aModel) {
    if (aModel.Id == null) {
      aModel.CreatedById = localStorage.getItem("userKey");
    } else {
      aModel.UpdatedById = localStorage.getItem("userKey");
    }
    return this.http.post<any>(this.config.apiUrl + 'StageTreeApi/SaveStageWithStageTree', aModel);
  }

  public GetStageListByStageTreeId(stageTreeId: Int16Array) {
    return this.http.get<any>(this.config.apiUrl + 'StageTreeApi/GetStageListByStageTreeId?stageTreeId=' + stageTreeId);
  }


  public DeleteStageTree(id) {
    return this.http.post<any>(this.config.apiUrl + 'StageTreeApi/DeleteStageTree/', id);
  }

  public DeleteStageTreeRelation(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'StageTreeApi/DeleteStageTreeRelation', aModel);
  }

  // StageApi
  public GetStageList() {
    return this.http.get<any>(this.config.apiUrl + 'StageApi/GetStageList');
  }

  public GetStageListWithPaging(currentPage, pageSize) {
    return this.http.get<any>(this.config.apiUrl + 'StageApi/GetStageListWithPaging?currentPage=' + currentPage + '&pageSize=' + pageSize);
  }

  public GetStageListByProjectId(projectId: any) {
    return this.http.get<any>(this.config.apiUrl + 'StageApi/GetStageListByProjectId?projectId=' + projectId);
  }

  public SaveStage(aModel) {
    if (aModel.Id == null) {
      aModel.CreatedById = localStorage.getItem("userKey");

    }
    return this.http.post<any>(this.config.apiUrl + 'StageApi/SaveStage', aModel);
  }

  public UpdateStage(aModel) {

    return this.http.post<any>(this.config.apiUrl + 'StageApi/UpdateStage', aModel);
  }
  public GetstageDetailsById(id: any) {
    return this.http.get<any>(this.config.apiUrl + 'StageApi/GetstageDetailsById?id=' + id);
  }

  public DeleteStage(id) {
    return this.http.post<any>(this.config.apiUrl + 'StageApi/DeleteStage/', id);
  }


  public SaveProjectStage(aModel) {
    if (aModel.Id == null) {
      aModel.CreatedById = localStorage.getItem("userKey");
    } else {
      aModel.UpdatedById = localStorage.getItem("userKey");
    }
    return this.http.post<any>(this.config.apiUrl + 'StageApi/SaveProjectStage', aModel);
  }

  public UpdateProjectStageToComplete(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'StageApi/UpdateProjectStageToComplete', aModel);
  }

  // AgamiProjectApi

  public UploadDocuments(formData) {
    return this.http.post<any>(this.config.apiUrl + 'AgamiProjectApi/UploadDocuments', formData);
  }

  public GetDocumentsListByProjectId(id: any) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetDocumentsListByProjectId?projectId=' + id);
  }

  public DeleteDocument(model) {
    return this.http.post<any>(this.config.apiUrl + 'AgamiProjectApi/DeleteDocument/', model);
  }


  public GetProjectList() {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectList');
  }

  public GetProjectListWithPaging(currentPage, pageSize) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectListWithPaging?currentPage=' + currentPage + '&pageSize=' + pageSize);
  }

  public GetProjectDetailsById(id: any) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectDetailsById?id=' + id);
  }

  public GetProjectLiveList() {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectLiveList');
  }

  public GetProjectLiveListWithPaging(currentPage, pageSize) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectLiveListWithPaging?currentPage=' + currentPage + '&pageSize=' + pageSize);
  }

  public GetProjectPrebidList() {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectPrebidList');
  }

  public GetProjectCompletedList() {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectCompletedList');
  }

  public GetProjectCancelledList() {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectCancelledList');
  }
  public GetProjectCountForAdmin() {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectCountForAdmin');
  }

  public GetProjectCountForUser(userId: string) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectCountForClient?userId=' + userId);
  }

  public GetProjectPrebidListWithClient() {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectPrebidListWithClient');
  }


  public GetProjectPrebidListWithPaging(currentPage, pageSize) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectPrebidListWithPaging?currentPage=' + currentPage + '&pageSize=' + pageSize);
  }

  public GetProjectListByClientId(userId: string) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectListByClientId?userId=' + userId);
  }

  public GetProjectListByClientIdWithPaging(userId: string, currentPage, pageSize) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectListByClientIdWithPaging?currentPage=' + currentPage + '&pageSize=' + pageSize + '&userId=' + userId);
  }

  public GetProjectListByClientIdAndStatusIdPrebId(userId: string) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectListByClientIdAndStatusIdPrebId?userId=' + userId);
  }

  public GetProjectListByClientIdAndStatusIdPrebIdWithPaging(userId: string, currentPage, pageSize) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectListByClientIdAndStatusIdPrebIdWithPaging?currentPage=' + currentPage + '&pageSize=' + pageSize + '&userId=' + userId);
  }

  public GetProjectListByClientIdAndStatusIdLive(userId: string) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectListByClientIdAndStatusIdLive?userId=' + userId);
  }

  public GetProjectListByClientIdAndStatusIdLiveWithPaging(userId: string, currentPage, pageSize) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectListByClientIdAndStatusIdLiveWithPaging?currentPage=' + currentPage + '&pageSize=' + pageSize + '&userId=' + userId);
  }

  public GetProjectListWithStageTreeByClientId(userId: string) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectListWithStageTreeByClientId?userId=' + userId);
  }

  public GetProjectListByContractorId(userId: string) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectListByContractorId?userId=' + userId);
  }

  public GetProjectListByClientName(name: string) {
    return this.http.get<any>(this.config.apiUrl + 'AgamiProjectApi/GetProjectListByClientName?userId=' + name);
  }


  public SaveProject(aModel) {
    if (aModel.Id == null) {
      aModel.CreatedById = localStorage.getItem("userKey");
      return this.http.post<any>(this.config.apiUrl + 'AgamiProjectApi/SaveProject', aModel);
    } else {
      aModel.UpdatedById = localStorage.getItem("userKey");
      return this.http.post<any>(this.config.apiUrl + 'AgamiProjectApi/UpdateProject', aModel);
    }
  }

  public DeleteProject(id) {
    return this.http.post<any>(this.config.apiUrl + 'AgamiProjectApi/DeleteProject/', id);
  }

  public UpdateProjectStatusToLive(projectId) {
    return this.http.post<any>(this.config.apiUrl + 'AgamiProjectApi/UpdateProjectStatusToLive/', projectId);
  }

  public UpdateProjectStatusToComplete(projectId) {
    return this.http.post<any>(this.config.apiUrl + 'AgamiProjectApi/UpdateProjectStatusToComplete/', projectId);
  }

  public UpdateProjectStatusToCancelled(projectId) {
    return this.http.post<any>(this.config.apiUrl + 'AgamiProjectApi/UpdateProjectStatusToCancelled/', projectId);
  }


  public SaveProjectWithStageTree(aModel) {
    if (aModel.Id == null) {
      aModel.CreatedById = localStorage.getItem("userKey");
    } else {
      aModel.UpdatedById = localStorage.getItem("userKey");
    }
    return this.http.post<any>(this.config.apiUrl + 'AgamiProjectApi/SaveProjectWithStageTree', aModel);
  }

  // InputHelp

  public GetInputHelpList() {
    return this.http.get<any>(this.config.apiUrl + 'InputHelpApi/GetAll');
  }

  public GetDepartmentList() {
    return this.http.get<any>(this.config.apiUrl + 'InputHelpApi/GetDepartmentList');
  }

  public GetDesignationList() {
    return this.http.get<any>(this.config.apiUrl + 'InputHelpApi/GetDesignationList');
  }

  public GetInputHelpById(id: Int16Array) {
    return this.http.get<any>(this.config.apiUrl + 'InputHelpApi/Get?id=' + id);
  }

  public SaveInputHelp(aModel) {
    if (aModel.Id == null) {
      aModel.CreatedById = localStorage.getItem("userKey");
    } else {
      aModel.UpdatedById = localStorage.getItem("userKey");
    }
    return this.http.post<any>(this.config.apiUrl + 'InputHelpApi/Save/', aModel);
  }

  public GetInputTypeAll() {
    return this.http.get<any>(this.config.apiUrl + 'InputHelpApi/GetInputTypeAll');
  }

  // Room Setup

  public GetRoomList() {
    return this.http.get<any>(this.config.apiUrl + 'RoomSetupApi/GetAll');
  }

  public GetRoomById(id: Int16Array) {
    return this.http.get<any>(this.config.apiUrl + 'RoomSetupApi/Get?id=' + id);
  }

  public SaveRoom(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'RoomSetupApi/Save/', aModel);
  }

  // Rack Setup

  public GetRoomListIfHasRack() {
    return this.http.get<any>(this.config.apiUrl + 'RoomSetupApi/RoomsHasRack');
  }

  public GetRackList() {
    return this.http.get<any>(this.config.apiUrl + 'RackSetupApi/GetAll');
  }

  public GetRackById(id: Int16Array) {
    return this.http.get<any>(this.config.apiUrl + 'RackSetupApi/Get?id=' + id);
  }

  public SaveRack(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'RackSetupApi/Save/', aModel);
  }

  // File Information

  public GetFileList() {
    return this.http.get<any>(this.config.apiUrl + 'FileInformationApi/GetAll');
  }

  public GetFileById(id: any) {
    return this.http.get<any>(this.config.apiUrl + 'FileInformationApi/Get?id=' + id);
  }

  public SaveFile(aModel) {
    aModel.CreatedById = localStorage.getItem("userKey");
    return this.http.post<any>(this.config.apiUrl + 'FileInformationApi/Save/', aModel);
  }

  // File Movement

  public GetMovementsByFileId(id: Int16Array) {
    return this.http.get<any>(this.config.apiUrl + 'FileMovementApi/GetMovements?fileId=' + id);
  }

  public SaveFileMovement(code: string, uid: string) {
    return this.http.get<any>(this.config.apiUrl + 'FileMovementApi/Save?code=' + code + '&userKey=' + uid);
  }

  // File reports

  public GetRackStatus() {
    return this.http.get<any>(this.config.apiUrl + 'FileReportApi/GetRackStatus');
  }

  public GetFileCurrentStatus() {
    return this.http.get<any>(this.config.apiUrl + 'FileReportApi/GetCurrentStatus');
  }

  public GetFileListByRackId(rackId: any) {
    return this.http.get<any>(this.config.apiUrl + 'FileReportApi/GetFileListByRackId?rackId=' + rackId);
  }

  public GetMyRoomStatus(roomId: any) {
    return this.http.get<any>(this.config.apiUrl + 'FileReportApi/GetMyRoomStatus?roomId=' + roomId);
  }
  public SaveCustomer(aModel) {
    if (aModel.Id == null) {
      return this.http.post<any>(this.config.apiUrl + 'AccountApi/Register', aModel);
    } else {
      aModel.UpdatedById = localStorage.getItem("userKey");
      return this.http.post<any>(this.config.apiUrl + 'ClientApi/UpdateClient', aModel);
    }
  }
  public GetCompanyList() {
    return this.http.get<any>(this.config.apiUrl + 'CompanyApi/GetCompanyList');
  }
  public SaveCompany(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'CompanyApi/Save/', aModel);
  }
  public GetBloodGroupList() {
    return this.http.get<any>(this.config.apiUrl + 'BloodGroupApi/GetBloodGroupList');
  }
  public SaveBloodGroup(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'BloodGroupApi/Save/', aModel);
  }
  public GetAreaList() {
    return this.http.get<any>(this.config.apiUrl + 'AreaApi/GetAreaList');
  }
  public SaveArea(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'AreaApi/Save/', aModel);
  }
  public GetSectorList() {
    return this.http.get<any>(this.config.apiUrl + 'SectorApi/GetSectorList');
  }
  public SaveSector(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'SectorApi/Save/', aModel);
  }
  public GetThanaList() {
    return this.http.get<any>(this.config.apiUrl + 'ThanaApi/GetThanaList');
  }
  public SaveThana(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'ThanaApi/Save/', aModel);
  }
  public GetPostOfficeList() {
    return this.http.get<any>(this.config.apiUrl + 'PostOfficeApi/GetPostOfficeList');
  }
  public SavePostOffice(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'PostOfficeApi/Save/', aModel);
  }
  public GetRawItemList() {
    return this.http.get<any>(this.config.apiUrl + 'RawItemApi/GetRawItemList');
  }
  public SaveRawItem(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'RawItemApi/Save/', aModel);
  }
  public GetPackageRawItemList(packageId) {
    return this.http.get<any>(this.config.apiUrl + 'PackageRawItemApi/GetPackageRawItemList?packageId='+packageId);
  }
  public SavePackageRawItem(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'PackageRawItemApi/Save/', aModel);
  }
  public GetPackageList() {
    return this.http.get<any>(this.config.apiUrl + 'PackageApi/GetPackageList');
  }
  public GetPackageCboList() {
    return this.http.get<any>(this.config.apiUrl + 'PackageApi/GetPackageCboList');
  }
  public SavePackage(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'PackageApi/Save/', aModel);
  }
  public GetCustomerList() {
    return this.http.get<any>(this.config.apiUrl + 'UserApi/GetUserList');
  }
  public GetDailyUserPackageList(userId,selectddate)
  {
    return this.http.get<any>(this.config.apiUrl + 'PackageApi/GetDailyUserPackageList?userId='+userId+'&selectddate='+selectddate);
  }
  public SavePackageAdvance(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'PackageAdvanceApi/SavePackageAdvance/', aModel);
  }
  public GetAdvancePackageList() {
    return this.http.get<any>(this.config.apiUrl + 'PackageAdvanceApi/GetAdvancePackageList');
  }
  public GetPackageWithAdvanceList() {
    return this.http.get<any>(this.config.apiUrl + 'PackageApi/GetPackageWithAdvanceList');
  }
  public GetPeriodTypeCboList() {
    return this.http.get<any>(this.config.apiUrl + 'PeriodTypeApi/GetPeriodTypeCboList');
  }
  public GetPeriodTypeList() {
    return this.http.get<any>(this.config.apiUrl + 'PeriodTypeApi/GetPeriodTypeList');
  }
  public PeriodTypeSave(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'PeriodTypeApi/Save/', aModel);
  }
  public GetPackageWithPeriodTypeList() {
    return this.http.get<any>(this.config.apiUrl + 'PackageApi/GetPackageWithPeriodTypeList');
  }
  public GetEmployeeCode() {
    return this.http.get<any>(this.config.apiUrl + 'AccountApi/GetProjectCode');
  }

  public SaveEmployee(aModel) {
    if (aModel.Id == null) {
      return this.http.post<any>(this.config.apiUrl + 'AccountApi/EmployeeRegister', aModel);
    } else {
      aModel.UpdatedById = localStorage.getItem("userKey");
      return this.http.post<any>(this.config.apiUrl + 'ClientApi/UpdateClient', aModel);
    }
  }
  public GetEmployeeList() {
    return this.http.get<any>(this.config.apiUrl + 'UserApi/GetEmployeeList');
  }
  public SaveMasterSetting(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'MasterSettingApi/Save', aModel);
  }
  public GetMasterSetting() {
    return this.http.get<any>(this.config.apiUrl + 'MasterSettingApi/GetMasterSetting');
  }
  public GetDayShiftCboList() {
    return this.http.get<any>(this.config.apiUrl + 'PackageApi/GetDayShiftCboList');
  }
  public SavePackageAssign(aModel) {
    return this.http.post<any>(this.config.apiUrl + 'PackageApi/SavePackageAssign/', aModel);
  }
}
