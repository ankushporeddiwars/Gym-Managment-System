import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Attachment, DeleteFile, MasterDPs, Masters } from '../../../dataModels/common';
import { MATERIAL_MODULES } from '../../../material.config';
import { FileManagementServiceBase } from '../../../../services/proxy-api/file-management.service.base';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AddNewFileAttachemnetComponent } from './add-new-file-attachemnet/add-new-file-attachemnet.component';
import { FileManagementService } from '../../../../services/common/file-management/file-management.service';
import { FileAttachModalComponent } from '../file-attach-modal/file-attach-modal.component';

@Component({
  selector: 'app-file-attachment-table',
  standalone: true,
  imports: [MATERIAL_MODULES, ConfirmDialogComponent],
  providers: [
    { provide: FileManagementServiceBase, useClass: FileManagementService }
  ],
  templateUrl: './file-attachment-table.component.html',
  styleUrl: './file-attachment-table.component.scss'
})
export class FileAttachmentTableComponent {

  @Input() fileTypes: MasterDPs[] = [];
  @Input() attachments: Attachment[] | undefined = [];
  @Input() masters: Masters[] = [];
  @Input() deleteFileSource: string = '';
  @Output() public attachmentFile = new EventEmitter<Attachment[]>();
  files: Attachment[] = [];

  constructor(private fileService: FileManagementServiceBase,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private toastrService: ToastrService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['attachments']?.currentValue) {
      this.attachments = changes['attachments'].currentValue;
      this.bindToTable(this.attachments);
    }
    if (changes['masters']?.currentValue) {
      this.masters = changes['masters'].currentValue;
    }
    if (changes['deleteFileSource']?.currentValue) {
      this.deleteFileSource = changes['deleteFileSource'].currentValue;
    }
    if (changes['fileTypes']?.currentValue) {
      this.fileTypes = changes['fileTypes'].currentValue;
    }
  }

  bindToTable(attachments: Attachment[] | undefined) {
    this.files = [];
    attachments?.forEach(val => this.files.push(Object.assign({}, val)));
    this.files.map(x => x.fileType = this.fileTypes.find(y => y.id === x.fileType)?.displayName);
  }

  downloadFile(serverFileName: string, clientFilename: string) {
    if (serverFileName) {
      this.fileService.downloadFile(serverFileName, clientFilename).subscribe(
        res => this.toastrService.success(res),
        error => this.toastrService.error(error)
      );
    }
  }

  deleteDocument(list: any, index: number) {
    if (index > -1) {
      const user = this.cookieService.get('user');
      const dialogRef = this.dialog.open(ConfirmDialogComponent, { panelClass: 'my-outlined-dialog', disableClose: false, width: '40%' })
      dialogRef.componentInstance.confirmMessage = "Are you sure want to delete file..??";
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.attachments?.splice(index, 1);
          this.bindToTable(this.attachments);
          const file: DeleteFile = {
            attachId: list.attachId ?? 0,
            serverFileName: list.serverFileName,
            source: this.deleteFileSource,
            user: user
          }
          this.fileService.deleteFile(file).subscribe(res => {
            this.toastrService.success(res);
          });
          this.attachmentFile.emit(this.attachments);
        }
      });
    }
  }

  addAttachment() {
    const dialogRef = this.dialog.open(FileAttachModalComponent, {
      width: '40%',
      panelClass: 'my-outlined-dialog'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.attachments?.push(result);
        this.bindToTable(this.attachments);
        this.attachmentFile.emit(this.attachments);
      }
    })
  }

  getDisplayName(group: string, id?: string): string {
    if (id) {
      return this.masters?.filter(x => x.key === group)[0]?.values.find(y => y.id === id)?.displayName ?? '';
    } else {
      return '';
    }
  }
}
