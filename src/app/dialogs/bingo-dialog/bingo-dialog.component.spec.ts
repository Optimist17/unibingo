import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoDialogComponent } from './bingo-dialog.component';

describe('BingoDialogComponent', () => {
  let component: BingoDialogComponent;
  let fixture: ComponentFixture<BingoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
