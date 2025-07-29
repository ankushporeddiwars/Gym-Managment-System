import { Routes } from '@angular/router';
import { NotFoundComponent } from './account/not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { PackageComponent } from './main/master/package/package/package.component';
import { LoginComponent } from './account/login/login.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { UserRegistrationComponent } from './main/user-registration/user-registration.component';
import { UserRenewalComponent } from './main/user-renewal/user-renewal.component';
import { FindMembersComponent } from './main/find-members/find-members.component';
import { EnquiryComponent } from './main/enquiry/enquiry.component';
import { AllusersComponent } from './main/allusers/allusers.component';
import { ExportDataComponent } from './main/export-data/export-data.component';
import { SettingsComponent } from './main/settings/settings.component';
import { PrintReceiptComponent } from './main/print-receipt/print-receipt.component';
import { TrainerdetailsComponent } from './main/trainerdetails/trainerdetails.component';
import { CanActivated } from './account/guards/auth.guard';
import { DeActivatedGuard } from './account/guards/deActivate.guard';
import { AuthGuard } from './account/guards/guardWIthInterface';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'main',
        component: MainComponent,
        //canActivate: [CanActivated],
        // canActivate:[AuthGuard],        
        canActivateChild:[AuthGuard],
        children: [                
            {
                path: 'dashboard', component: DashboardComponent   //when we want to restrict parent as well as child the use canActivate
                 //and only if we have to restrict to child then use canActivateChild
            },
            {
                path: 'masters',
                children: [
                    {
                        path: 'package', component: PackageComponent                      
                    },
                ]
            },
            {
                path: 'registration', component: UserRegistrationComponent
                //canDeactivate: [DeActivatedGuard]   //1st way using Service
               // canDeactivate : [(comp :UserRegistrationComponent) =>{ return comp.CanExit();}]  //Another way without creating extra file or service(15 and Higher version only).
            },
            {
                path: 'renewal/:userId', component: UserRenewalComponent
            },
            {
                path: 'searchMembers', component: FindMembersComponent
            },
            {
                path: 'enquiry', component: EnquiryComponent
            },
            {
                path: 'allUsers', component: AllusersComponent
            },
            {
                path: 'exportData', component: ExportDataComponent
            },
            {
                path: 'setting', component: SettingsComponent
            },
            {
                path: 'printReceipt', component: PrintReceiptComponent
            },
            {
                path: 'trainerDetails', component: TrainerdetailsComponent
            },
            {
                path: '**', component: NotFoundComponent
            }
        ]
    }

];
