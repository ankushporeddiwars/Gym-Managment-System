import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegistrationComponent } from './user-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserRegstrationService } from '../../../services/userRegistration/user-regstration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let userService: jasmine.SpyObj<UserRegstrationService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const mockUserService = jasmine.createSpyObj('UserRegstrationService', ['saveNewUser', 'getUserRegistrationDropDowns']);
    const mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [UserRegistrationComponent],
      providers: [
        { provide: UserRegstrationService, useValue: mockUserService },
        { provide: ToastrService, useValue: mockToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserRegstrationService) as jasmine.SpyObj<UserRegstrationService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should invalidate the form when required fields are empty', () => {
      component.newUserRegistrationForm.controls['userName'].setValue('');
      component.newUserRegistrationForm.controls['userLastName'].setValue('');
      expect(component.newUserRegistrationForm.valid).toBeFalsy();
    });

    it('should validate the form when all required fields are filled', () => {
      component.newUserRegistrationForm.controls['userName'].setValue('John');
      component.newUserRegistrationForm.controls['userLastName'].setValue('Doe');
      component.newUserRegistrationForm.controls['dateOfBirth'].setValue('1990-01-01');
      component.newUserRegistrationForm.controls['contactNumber'].setValue('1234567890');
      component.newUserRegistrationForm.controls['userEmail'].setValue('john.doe@example.com');
      component.newUserRegistrationForm.controls['startMembership'].setValue('2024-01-01');
      expect(component.newUserRegistrationForm.valid).toBeTruthy();
    });
  });

  describe('SaveDetails', () => {
    it('should not call saveNewUser if the form is invalid', () => {
      component.newUserRegistrationForm.controls['userName'].setValue('');
      component.SaveDetails();
      expect(userService.saveNewUser).not.toHaveBeenCalled();
      expect(toastrService.error).toHaveBeenCalledWith('Please fill in the required fields');
    });

    it('should call saveNewUser and show success toast on valid form submission', () => {
      component.newUserRegistrationForm.patchValue({
        userName: 'John',
        userLastName: 'Doe',
        dateOfBirth: '1990-01-01',
        contactNumber: '1234567890',
        userEmail: 'john.doe@example.com',
        startMembership: '2024-01-01',
      });

      userService.saveNewUser.and.returnValue(of({}));
      component.SaveDetails();
      expect(userService.saveNewUser).toHaveBeenCalled();
      expect(toastrService.success).toHaveBeenCalledWith('User registered successfully');
    });

    it('should show error toast on saveNewUser failure', () => {
      component.newUserRegistrationForm.patchValue({
        userName: 'John',
        userLastName: 'Doe',
        dateOfBirth: '1990-01-01',
        contactNumber: '1234567890',
        userEmail: 'john.doe@example.com',
        startMembership: '2024-01-01',
      });

      userService.saveNewUser.and.returnValue(throwError(() => new Error('Save failed')));
      component.SaveDetails();
      expect(toastrService.error).toHaveBeenCalledWith('Save failed');
    });
  });

  describe('GetDropDownValues', () => {
    it('should load dropdown values successfully', () => {
      const mockDropdowns = [
        { id: 1, package: 'Basic', duration: 1, months: '1 Month' },
        { id: 2, package: 'Premium', duration: 3, months: '3 Months' },
      ];
      userService.getUserRegistrationDropDowns.and.returnValue(of(mockDropdowns));

      component.GetDropDownValues();
      expect(component.users).toEqual(mockDropdowns);
      expect(component.memberShipTypeList.length).toBe(2);
      expect(toastrService.success).toHaveBeenCalledWith('Dropdown values loaded successfully');
    });

    it('should show error toast on failure to load dropdown values', () => {
      userService.getUserRegistrationDropDowns.and.returnValue(throwError(() => new Error('Failed to load')));
      component.GetDropDownValues();
      expect(toastrService.error).toHaveBeenCalledWith('Failed to load dropdown values: Failed to load');
    });
  });

  describe('CanExit', () => {
    it('should prompt the user when there are unsaved changes', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      component.newUserRegistrationForm.controls['userName'].setValue('John');
      component.isSubmitted = false;
      const canExit = component.CanExit();
      expect(canExit).toBeFalse();
      expect(window.confirm).toHaveBeenCalledWith('You have unsaved changes do you want to navigate away');
    });

    it('should allow navigation if form is saved', () => {
      component.isSubmitted = true;
      const canExit = component.CanExit();
      expect(canExit).toBeTrue();
    });
  });

  describe('File Selection and Upload', () => {
    it('should set image preview when a file is selected', () => {
      const mockFile = new File([''], 'test-image.jpg', { type: 'image/jpeg' });
      const mockEvent = { target: { files: [mockFile] } };

      const readerSpy = spyOn(FileReader.prototype, 'readAsDataURL').and.callFake(function () {
        this.onload({ target: { result: 'mock-data-url' } } as any);
      });

      component.onFileSelected(mockEvent as any);
      expect(component.selectedImage).toBe('mock-data-url');
      expect(component.imageFile).toBe(mockFile);
      expect(readerSpy).toHaveBeenCalledWith(mockFile);
    });
  });
});