import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAttachModalComponent } from './file-attach-modal.component';

describe('FileAttachModalComponent', () => {
  let component: FileAttachModalComponent;
  let fixture: ComponentFixture<FileAttachModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAttachModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileAttachModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
