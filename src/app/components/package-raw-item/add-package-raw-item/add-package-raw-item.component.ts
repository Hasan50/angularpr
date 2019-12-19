import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageRawItemModel } from '../../../models/PackageRawItemModel';
import { ApplicationService } from '../../../services/application.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-add-package-raw-item',
  templateUrl: './add-package-raw-item.component.html',
  styleUrls: ['./add-package-raw-item.component.scss']
})
export class AddPackageRawItemComponent implements OnInit, OnDestroy {
  hideElement: true;
  options: FormGroup;
  private sub: any;
  private PackageRawItems: any = [];
  @Input() popupModel: any = { Id: null,PackageId:null};
  PackageRawItemOb: PackageRawItemModel;
  public rawItemList: any = [];
  submitted = false;
  constructor(
    public activeModal: NgbActiveModal,
    private aService: ApplicationService,
    private toasterService: ToastrService,
  ) {
    this.PackageRawItemOb = new PackageRawItemModel();
  }

  ngOnInit() {
    this.loadRawItemList();
  }
  ngOnDestroy() {
     this.sub.unsubscribe();
  }

  public SaveOrUpdate() {
    this.SavePackageRawItem();
  }

  private SavePackageRawItem() {
    this.sub = this.aService.SavePackageRawItem(this.PackageRawItems).subscribe(x => {
      if (x.Success) {
        if (this.popupModel.Id == "0") {
          this.toasterService.success("Package with Raw Item Created Successfully", 'Success');
        } else {
          this.toasterService.success("Package with Raw Item Updated Successfully", 'Success');
        }
      }
      else {
        this.toasterService.error("Something Error Happened. Try again later", 'Error');
      }

      this.activeModal.close();
    });
  }

  private loadRawItemList(): void {
    this.sub = this.aService.GetRawItemList().subscribe(x => {
      this.rawItemList = x;
    });
  }
  onCheckboxChange(itemId, event) {
    if (event.checked) {
      this.PackageRawItemOb.RawItemId = itemId;
      this.PackageRawItemOb.PackageId = this.popupModel.PackageId;
      this.PackageRawItems.push(this.PackageRawItemOb);
    } else {
      this.PackageRawItemOb.RawItemId = null;
      this.PackageRawItemOb.PackageId = null;
      const index = this.PackageRawItems.findIndex(item=> item.RawItemId == itemId);
      if (index > -1) {
        this.PackageRawItems.splice(index, 1);
      }
    }
  }

}


