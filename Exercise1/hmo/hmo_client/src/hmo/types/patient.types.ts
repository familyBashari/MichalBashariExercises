
export type PatientType = {
    // name: any | string
    id:string,
    firstName:String,
    lastName:String,
    address:{
        city:String,
        street:String,
        buildingNumber: Number
    },
    birthDate:Date,
    tel:String,
    mobilePhone:String,
    image: File
}