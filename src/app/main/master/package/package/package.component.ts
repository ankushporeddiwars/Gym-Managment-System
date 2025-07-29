import { Component, OnInit } from '@angular/core';
import { MastersServicebase } from '../../../../../services/proxy-api/master-servivce.base';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent implements OnInit {

  constructor(private masterService: MastersServicebase) {

  }
  
  ngOnInit() {
    this.masterService.getAllMasters().subscribe({
      next: (response: any) => {
        console.log("Master service called.",response);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }
}
