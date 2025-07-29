import { Component, OnChanges, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { UserRegstrationService } from '../../../services/userRegistration/user-regstration.service';
import { ToastrService } from 'ngx-toastr';
import { IRegistration, IuserRegistrationDropDowns, KeyValueMemberships } from '../../dataModels/models/Registration';
import { HttpErrorResponse } from '@angular/common/http';
import { IDeActivatedComponent } from '../../account/guards/Interface/IdeActivatedGuard';
import { Observable, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    CommonModule,
  ],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.scss',
})
export class UserRegistrationComponent implements OnInit,IDeActivatedComponent {
  
  newUserRegistrationForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    userLastName: new FormControl<string>('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl(''),
    height: new FormControl('',Validators.required),
    weight: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    contactNumber: new FormControl('', Validators.required),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    membershipType: new FormControl(''),
    membershipDuration: new FormControl(''),
    startMembership: new FormControl('', Validators.required),
    endMembership: new FormControl(''),
    fees: new FormControl(''),
    pendingFees: new FormControl(''),
    pendingAmtPayingDate: new FormControl(''),
    // uploadImage : new FormControl(''),
  });

  constructor(
    private userService: UserRegstrationService,
    private toasterService: ToastrService
  ) {}

  private userSubscription: Subscription;
  myObservable$ : Observable<number>=of(42);
  myPromise : Promise<string> =Promise.resolve("This is My string");

  users: IuserRegistrationDropDowns[] = [];
  memberShipTypeList: Array<{ id: number; package: string }> = [];
  packageMonthsList: Array<{ duration: number; months: string }> = [];
  selectedImage: string | ArrayBuffer | null = 'assets/Default_Image.png';
  imageFile: File | null = null;  // Holds the selected image file
  isSubmitted :Boolean =false;

  onFileSelected(event: any): void {
    const file = event.target.files[0];  // Get the selected file
    if (file) {
      this.imageFile = file;

      // Preview the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result;  // Set the image preview
      };
      reader.readAsDataURL(file);  // Read the file as a Data URL
    }
  }

  uploadImage(): void {
    if (this.imageFile) {
      const formData = new FormData();
      formData.append('image', this.imageFile);
    }
  }

  ngOnInit(){
    this.GetDropDownValues();
  }

  SaveDetails(){
    this.isSubmitted =true;
    if (this.newUserRegistrationForm.invalid) {
      this.toasterService.error('Please fill in the required fields');
      return;
    }

    const users: IRegistration = {
      UserId: 0,
      FirstName: this.newUserRegistrationForm.value.userName!,
      LastName: this.newUserRegistrationForm.value.userLastName!,
      DateOfBirth: new Date(this.newUserRegistrationForm.value.dateOfBirth!),
      Gender: this.newUserRegistrationForm.value.gender!,
      Height: Number(this.newUserRegistrationForm.value.height!),
      Weight: Number(this.newUserRegistrationForm.value.weight!),
      Address: this.newUserRegistrationForm.value.address!,
      City: this.newUserRegistrationForm.value.city!,
      ContactNumber: Number(this.newUserRegistrationForm.value.contactNumber!),
      Email: this.newUserRegistrationForm.value.userEmail!,
      PackageType: Number(this.newUserRegistrationForm.value.membershipType!),
      PackageId: Number(this.newUserRegistrationForm.value.membershipDuration!),
      StartDate: new Date(this.newUserRegistrationForm.value.startMembership!),
      EndDate: new Date(this.newUserRegistrationForm.value.endMembership!),
      Fees: Number(this.newUserRegistrationForm.value.fees!),
      RemainingAmount: Number(this.newUserRegistrationForm.value.pendingFees!),
      RemaingAmtPayDate: new Date(this.newUserRegistrationForm.value.pendingAmtPayingDate!),
      // Photo: this.newUserRegistrationForm.value.uploadImage!,
      PTDuration: 10,
      TrainerId: 11,
    };

    this.userSubscription = this.userService.saveNewUser(users).subscribe({
      next: (result: IRegistration) => {
        this.toasterService.success('User registered successfully');
        this.newUserRegistrationForm.reset();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
        this.toasterService.error(err.message);
      },
      complete: () => {
        console.log('User registration completed');
      },
    });
  }

  GetDropDownValues(){
    this.userService
    .getUserRegistrationDropDowns()
    .subscribe({
      next:(result:IuserRegistrationDropDowns[])=>{
        this.users = result;
        this.users.forEach(list => {
          const packageExists = this.memberShipTypeList.some(item => item.package === list.package);
          const monthExists = this.packageMonthsList.some(item => item.duration === list.duration);
            //we can use find will return value and  some will return true or false
          if(!monthExists)
          {
            this.packageMonthsList.push({ duration: list.duration, months: list.months });
          }
          if(!packageExists){
            this.memberShipTypeList.push({ id: list.id, package: list.package });
          }
      });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err.message);
        this.toasterService.error('Failed to load dropdown values: ' + err.message);
      },
      complete: () => {
        this.toasterService.success('Dropdown values loaded successfully');
        console.log('Dropdown values loaded successfully');
      },
      
    })
  }
  
  CanExit()
  {
    if(this.newUserRegistrationForm.valid && !this.isSubmitted)
    {
      let name ="Ankush";
      var lastName ="Poreddiwar";

      return confirm("You have unsaved changes do you want to navigate away");
    }
    else
    {
      return true;
    }
  }
  
  ngDestroy(){
    if(this.userSubscription)
    {
      this.userSubscription.unsubscribe();
    }
  }
  
}