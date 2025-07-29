import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AllUserService } from '../../../services/allUsers/all-user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IUsers } from '../../dataModels/models/IUser';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allusers',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, CommonModule],
  templateUrl: './allusers.component.html',
  styleUrl: './allusers.component.scss'
})
export class AllusersComponent implements OnInit {
  dataSource = new MatTableDataSource<IUsers>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'FirstName', 
    'LastName', 
    'ContactNumber',
    'Height',
    'Weight',
    'Gender',
    'Address',
    'City',
    'Email',
    'DateOfBirth',
    'StartDate',
    'EndDate',
    'Actions'
  ]; 

constructor(private allUsers : AllUserService,
  private toasterService: ToastrService,
  private router:Router)
{

}

  ngOnInit(): void {
    this.GetAllUsers();
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator; // Bind paginator to data source
    this.dataSource.sort = this.sort;         // Bind sort to data source
  }
  applyFilter(event: Event): void {
     const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GetAllUsers(){
    this.allUsers
    .getAllUserDetails()
    .subscribe({
      next : (result :IUsers[])=>{
        this.dataSource.data = result;
        console.log(result);
      },
      error : (err: HttpErrorResponse)=>{
        console.log(err.message);
        this.toasterService.error('Failed to load user details: ' + err.message);
      },
      complete: () => {
        this.toasterService.success('User details loaded successfully');
        console.log('User details loaded successfully');
      }
    })
  }

  onEdit(row: any) {
    console.log(row);
    this.router.navigate(['main/renewal', row.userId]);
  }
}

