import { Component, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { NavService } from '../../../../services/common/nav/nav.service';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { trigger } from '@angular/animations';
import { MenuModel } from '../../../dataModels/common/common';


@Component({
  selector: 'app-menu-list-item',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatListModule, CommonModule],
  providers: [NavService, MatIconRegistry, HttpClient],
  animations: [
    trigger('indicatorRotate', [

    ])
  ],
  templateUrl: './menu-list-item.component.html',
  styleUrl: './menu-list-item.component.scss'
})
export class MenuListItemComponent {

  expanded!: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: MenuModel;
  @Input() depth!: number;
  @Input() showLeftNav: boolean = true;

  constructor(public navService: NavService, public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  onItemSelected(item: MenuModel) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
