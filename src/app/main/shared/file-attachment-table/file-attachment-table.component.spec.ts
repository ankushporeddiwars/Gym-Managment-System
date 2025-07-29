import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAttachmentTableComponent } from './file-attachment-table.component';

describe('FileAttachmentTableComponent', () => {
  let component: FileAttachmentTableComponent;
  let fixture: ComponentFixture<FileAttachmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAttachmentTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FileAttachmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
