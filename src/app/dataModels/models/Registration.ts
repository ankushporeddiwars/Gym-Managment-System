export interface IRegistration{
    UserId : number,
    FirstName :string,
    LastName : string,
    Height : number,
    Weight : number,
    ContactNumber : number,
    Gender : string,
    Address : string,
    City : string
    Email :string,
   // Photo :BinaryData,
    DateOfBirth :Date,
    StartDate : Date,
    EndDate :Date,
    PackageId : number,
    PackageType : number,
    Fees : number,
    RemainingAmount : number,
    RemaingAmtPayDate : Date
    PTDuration : number,
    TrainerId : number
}

export interface IuserRegistrationDropDowns
{
    months: string,
    package:string,
    packageType:number,
    fee:number,
    duration:number,
    isActive:number,
    id:number
}

export class KeyValueMemberships {
   public static keyValuePairs: { [key: string]: string }
}