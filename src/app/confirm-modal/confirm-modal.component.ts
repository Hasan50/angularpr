import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit
{
title:null;
message:null;
btnCancelText:null;
btnOkText:null;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit()
  {
  }

  public decline()
  {
    this.activeModal.close(false);
  }

  public accept()
  {
    this.activeModal.close(true);
  }

  public dismiss()
  {
    this.activeModal.dismiss();
  }

}
