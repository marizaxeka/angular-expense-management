import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalDetailViewComponent } from './approval-detail-view.component';

describe('ApprovalDetailViewComponent', () => {
  let component: ApprovalDetailViewComponent;
  let fixture: ComponentFixture<ApprovalDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovalDetailViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovalDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
