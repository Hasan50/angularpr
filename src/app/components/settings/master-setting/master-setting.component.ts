import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'app/services';
import { MasterSettingModel } from 'app/models/MasterSettingModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './master-setting.component.html',
  styleUrls: ['./master-setting.component.scss']
})
export class MasterSettingComponent implements OnInit {
  private sub: any;
  public dataList: any = [];
masterSettingOb:MasterSettingModel;
  constructor(
    private aService: ApplicationService,
    private toasterService: ToastrService,

  ) { 
    this.masterSettingOb= new MasterSettingModel();
  }

  ngOnInit() {
    this.loadMasterSetting();
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
   Save() {
    this.sub = this.aService.SaveMasterSetting(this.masterSettingOb).subscribe(x => {
      if (x.Success) {
          this.toasterService.success("Created Successfully", 'Success');
      }
      else {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }
    });
  }

  private loadMasterSetting(): void
  {
    this.sub = this.aService.GetMasterSetting().subscribe(x =>
    {
      this.masterSettingOb = x;
    });
  }
}
