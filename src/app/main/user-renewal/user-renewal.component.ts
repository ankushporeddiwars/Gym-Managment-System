import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRenewalService } from '../../../services/Renewal/user-renewal.service';
import { IUsers } from '../../dataModels/models/IUser';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-renewal',
  standalone: true,
  imports: [MatCard,MatCardContent,ReactiveFormsModule],
  templateUrl: './user-renewal.component.html',
  styleUrl: './user-renewal.component.scss'
})
export class UserRenewalComponent {

constructor(private route:ActivatedRoute,private userService:UserRenewalService)
{

}

renewalForm = new FormGroup({

});

//dataSource = new IUsers();
ngOnInit()
{
  const userId = this.route.snapshot.paramMap.get('userId');

}
GetUserDetails(id:number)
{

  this.userService
  .getUserDetails()
  .subscribe
  ({
    next:({result:IUser})=>{

    }

  })


}

}
