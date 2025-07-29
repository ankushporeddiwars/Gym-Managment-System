import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs';
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MenuListItemComponent } from '../menu-list-item/menu-list-item.component';
import { LoginService } from '../../../../services/login/login.service';
import { CommonModule } from '@angular/common';
import { MenuModel } from '../../../dataModels/common/common';
import { MasterService } from '../../../../services/Master/master.service';
import { LoginServicebase } from '../../../../services/proxy-api/login-service.base';
import { MastersServicebase } from '../../../../services/proxy-api/master-servivce.base';
import { NavService } from '../../../../services/common/nav/nav.service';
@UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatSidenav, MatMenuModule, MatListModule, MatToolbarModule, MatIconModule, RouterOutlet, MenuListItemComponent],
  providers: [{ provide: LoginServicebase, useClass: LoginService },
  { provide: MastersServicebase, useClass: MasterService }
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  @ViewChild('appDrawer') appDrawer!: ElementRef;
  version = VERSION;
  showLeftNav: boolean = true;
  menuModel: MenuModel[] = [
    {
      menuId: 1,
      displayName: "Dashboards",
      route: './main/dashboard',
      children: []
    },
    {
      menuId: 2,
      displayName: "Master",
      children: [
        {
          menuId: 1,
          displayName: "Packages",
          route: './main/masters/package',
          children: [ ]
        }
      ]
    },
    {
      menuId:3,
      displayName:"User Registration",
      route: './main/registration'
    },
    {
      menuId:4,
      displayName:"User Renewal",
      route: './main/renewal'
    },
    {
      menuId:5,
      displayName:"Find Members",
      route: './main/searchMembers'
    },
    {
      menuId:6,
      displayName:"All Users",
      route: './main/allUsers'
    },
    {
      menuId:7,
      displayName:"Enquiry",
      route: './main/enquiry'
    },
    {
      menuId:8,
      displayName:"Trainer Details",
      route: './main/trainerDetails'
    },
    {
      menuId:9,
      displayName:"Export Data",
      route: './main/exportData'
    },
    {
      menuId:10,
      displayName:"Print Receipt",
      route: './main/printReceipt'
    },
    {
      menuId:11,
      displayName:"Trainer Details",
      route: './main/trainerDetails'
    }
  ];



  constructor(private observer: BreakpointObserver,
    private router: Router,
    private authService: LoginServicebase,
    private navService: NavService,
    private mastersService: MastersServicebase,
    private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.getMenuList();
  }

  getMenuList() {
    const user: string = this.cookieService.get('user');
    // this.mastersService.GetMenuDets(user).subscribe(res => {
    //   this.menuModel = res.updateResults;
    // })
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    this.observer
      .observe(['(max-width: 800px)', '(max-height: 100%)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  showAndHideLeftNav() {
    if (this.showLeftNav) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
    this.showLeftNav = !this.showLeftNav;
  }

  logout() {
    this.authService.LogOut();
  }
}
