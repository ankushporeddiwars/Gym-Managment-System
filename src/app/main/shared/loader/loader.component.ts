import { Component } from '@angular/core';
import { LoaderService } from '../../../../services/common/loader/loader.service';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  providers: [LoaderService],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  isLoading;
  constructor(private LoaderService: LoaderService) {
    this.isLoading = this.LoaderService.isloadingShow;
  }

}
