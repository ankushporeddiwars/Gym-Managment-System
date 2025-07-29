import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFileAttachemnetComponent } from './add-new-file-attachemnet.component';

describe('AddNewFileAttachemnetComponent', () => {
  let component: AddNewFileAttachemnetComponent;
  let fixture: ComponentFixture<AddNewFileAttachemnetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewFileAttachemnetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewFileAttachemnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
