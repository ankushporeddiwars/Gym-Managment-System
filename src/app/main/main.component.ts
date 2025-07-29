import { Component } from '@angular/core';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FooterComponent, SidebarComponent, CommonModule],
  providers: [HttpClientModule],
  templateUrl: './main.component.html',
})
export class MainComponent {
  isSideNavbarShow = true;

  constructor(private router: Router) {
    // this.router.navigate(['main/dashboard']);
  }

  isSideNavbarhidden(event: any) {
    this.isSideNavbarShow = event;
  }
}
