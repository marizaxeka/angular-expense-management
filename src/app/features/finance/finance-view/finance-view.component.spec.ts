import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceViewComponent } from './finance-view.component';

describe('FinanceViewComponent', () => {
  let component: FinanceViewComponent;
  let fixture: ComponentFixture<FinanceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinanceViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
