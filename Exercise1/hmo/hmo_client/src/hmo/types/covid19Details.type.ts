// export type Covid19DetailsType = {
//     clientId: string
//     vaccineDates: {
//         type: [
//             {
//                 dateReceived: Date,
//                 manufacturer: String
//             }
//         ],
//     },
//     positiveTestDate: Date,
//     recoveryDate: Date
// }
export type Covid19DetailsType = {
    clientId: string
    vaccineDates: 
         [
            {
                dateReceived: Date,
                manufacturer: String
            }
        ],
    
    positiveTestDate: Date,
    recoveryDate: Date
}

