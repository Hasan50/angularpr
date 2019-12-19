import { Component,ViewChild, ElementRef, OnInit  } from '@angular/core';
import {ApplicationService} from '../../services/application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import {RoomSetupComponent} from './room-setup/room-setup.component';
// import {RackSetupComponent} from './rack-setup/rack-setup.component';
// import { InputHelpComponent } from './input-help/input-help.component';
import {EventEmitterService } from '../../services/eventemiter.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  private sub: any;
  userModel : any
  popupModel: any = { Id: 0 };
  roomList:any = [];
  inputHelpTypeList:any =[];
  rackList:any =[];
  isSettingUpdate = false;

  constructor(private aService:ApplicationService, private modalService: NgbModal,private eventEmitterService: EventEmitterService) 
  {
    this.userModel = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.getMasterData();
    this.eventEmitterService.change.subscribe(x => {
      this.isSettingUpdate = x;
      this.getMasterData();
    });
  }
  getMasterData(){
    this.loadInputHelp();
    this.loadRoomSetup();
    this.loadRackList();
  }

  private loadInputHelp(): void
  {
    this.sub = this.aService.GetInputHelpList().subscribe(x =>
    {
      this.inputHelpTypeList = x;
    });
  }

  private loadRoomSetup(): void
   {
     this.sub = this.aService.GetRoomList().subscribe(x =>
     {
       this.roomList = x;
     });
   }
   private loadRackList(): void
   {
     this.sub = this.aService.GetRackList().subscribe(x =>
     {
       this.rackList = x;
     });
   }

  
   
  //  public inputHelpCreateEditPopup(id: any)
  //  {
  //    const modalRef = this.modalService.open(InputHelpComponent, { size: 'lg', backdrop: false });
  //    this.popupModel = id;
  //    (<InputHelpComponent>modalRef.componentInstance).popupModel = this.popupModel;
  //    modalRef.result.then((result) =>
  //    {
  //    }).catch((result) =>
  //    {
  //      console.log(result);
  //    });
  //  }

  //  public openRoomSetupEditPopup(id: any)
  //  {
  //    const modalRef = this.modalService.open(RoomSetupComponent, { size: 'lg', backdrop: false });
  //    this.popupModel.Id = id;
  //    (<RoomSetupComponent>modalRef.componentInstance).popupModel = this.popupModel;
  //    modalRef.result.then((result) =>
  //    {
  //    }).catch((result) =>
  //    {
  //      console.log(result);
  //    });
  //  }

  //  public rackSetupEditPopup(id: any)
  //  {
  //    const modalRef = this.modalService.open(RackSetupComponent, { size: 'lg', backdrop: false });
  //    this.popupModel.Id = id;
  //    (<RackSetupComponent>modalRef.componentInstance).popupModel = this.popupModel;
  //    modalRef.result.then((result) =>
  //    {
  //    }).catch((result) =>
  //    {
  //      console.log(result);
  //    });
  //  }

   ngOnDestroy()
   {
     this.sub.unsubscribe();
   }
}


