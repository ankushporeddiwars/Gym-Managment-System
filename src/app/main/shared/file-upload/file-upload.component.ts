import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  @Output() fileSelected = new EventEmitter<any>();

  onFilechange(event: any) {
    event.stopPropagation();
    if (event.target.files.length > 0) {
      this.fileSelected.emit(event.target.files[0]);
    }
  }
}
