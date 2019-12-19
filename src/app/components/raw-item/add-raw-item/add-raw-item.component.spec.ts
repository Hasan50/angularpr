import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRawItemComponent } from './add-raw-item.component';

describe('AddRawItemComponent', () => {
  let component: AddRawItemComponent;
  let fixture: ComponentFixture<AddRawItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRawItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRawItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
