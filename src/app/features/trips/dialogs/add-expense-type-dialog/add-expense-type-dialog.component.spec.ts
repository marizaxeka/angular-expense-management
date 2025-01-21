import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseTypeDialogComponent } from './add-expense-type-dialog.component';

describe('AddExpenseTypeDialogComponent', () => {
  let component: AddExpenseTypeDialogComponent;
  let fixture: ComponentFixture<AddExpenseTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExpenseTypeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExpenseTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
