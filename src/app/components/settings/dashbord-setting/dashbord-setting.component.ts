import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'app/services';
import { MasterSettingModel } from 'app/models/MasterSettingModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashbord-setting',
  templateUrl: './dashbord-setting.component.html',
  styleUrls: ['./dashbord-setting.component.scss']
})
export class DashbordSettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
