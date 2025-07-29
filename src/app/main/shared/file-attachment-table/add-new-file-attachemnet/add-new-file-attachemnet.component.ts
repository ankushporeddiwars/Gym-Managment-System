import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, input } from '@angular/core';
import { Attachment, MasterDPs, Masters } from '../../../../dataModels/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MATERIAL_MODULES } from '../../../../material.config';
import { FileManagementServiceBase } from '../../../../../services/proxy-api/file-management.service.base';
import { CookieService } from 'ngx-cookie-service';
import { FileUploadComponent } from "../../file-upload/file-upload.component";
import { FileManagementService } from '../../../../../services/common/file-management/file-management.service';

@Component({
  selector: 'app-add-new-file-attachemnet',
  standalone: true,
  templateUrl: './add-new-file-attachemnet.component.html',
  styleUrl: './add-new-file-attachemnet.component.scss',
  imports: [MATERIAL_MODULES, FileUploadComponent],
  providers: [
    { provide: FileManagementServiceBase, useClass: FileManagementService }
  ],
})
export class AddNewFileAttachemnetComponent implements OnChanges {
  fileTypes: MasterDPs[] = [];
  status: string = '';
  uploadedFiles!: File;
  masters: Masters[] = [];
  statusClass: string = '';

  @Input() data: any;
  @Output() Closed = new EventEmitter<any>();

  public attachmentForm = new FormGroup({
    fileType: new FormControl('', Validators.required),
    fileDescription: new FormControl('', Validators.required),
  });

  constructor(private fileService: FileManagementServiceBase,
    private cookieService: CookieService,
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.fileTypes = changes['data']?.currentValue.fileTypes as MasterDPs[];
    }
  }

  NewFileAdded(event: any) {
    if (event) {
      this.uploadedFiles = event;
    }
  }

  save() {
    if (this.uploadedFiles) {
      this.fileService.uploadFile(this.uploadedFiles).subscribe(res => {
        if (res) {
          this.status = res.massage;
          const user = this.cookieService.get('user');
          const evidence: Attachment = {
            clientFileName: this.uploadedFiles.name,
            serverFileName: res.serverPath,
            fileType: this.attachmentForm.controls['fileType'].value!,
            fileDesc: this.attachmentForm.controls['fileDescription'].value!,
            createBy: user
          }
          setTimeout(() => {
            this.Closed.emit(evidence);
          }, 1000);
        }
      });
    } else {
      this.status = 'Please enter mandatory feild..!';
    }
  }
}
