import { Component, EventEmitter, Output } from '@angular/core';
import { FileManagementServiceBase } from '../../../../services/proxy-api/file-management.service.base';
import { CookieService } from 'ngx-cookie-service';
import { Attachment } from '../../../dataModels/common';
import { FileManagementService } from '../../../../services/common/file-management/file-management.service';
import { MATERIAL_MODULES } from '../../../material.config';

@Component({
  selector: 'app-file-attach-modal',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './file-attach-modal.component.html',
  styleUrl: './file-attach-modal.component.scss',
  providers: [
    { provide: FileManagementServiceBase, useClass: FileManagementService }
  ],
})
export class FileAttachModalComponent {
  @Output() Closed = new EventEmitter<Attachment>();
  uploadedFiles!: File;
  status: string = '';

  constructor(private fileService: FileManagementServiceBase,
    private cookieService: CookieService
  ) {
  }

  onFilechange(event: any) {
    event.stopPropagation();
    if (event.target.files.length > 0) {
      this.uploadedFiles = event.target.files[0];
    }
  }

  uploadFile() {
    if (this.uploadedFiles) {
      this.fileService.uploadFile(this.uploadedFiles).subscribe(res => {
        if (res) {
          this.status = res.massage;
          const user = this.cookieService.get('user');
          const evidence: Attachment = {
            clientFileName: this.uploadedFiles.name,
            serverFileName: res.serverPath,
            createBy: user
          }
          this.Closed.emit(evidence);
        }
      });
    } else {
      this.status = 'Please select any file to upload..!';
    }
  }
}
