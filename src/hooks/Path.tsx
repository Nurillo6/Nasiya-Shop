
const PATH = {
    main:"/",
    login:"/login",
    calendar:"/debt/date",
    debtor:"/debtor",
    debtorCreate:"/debtor/create",
    debtorSingle:"/debtor/:id",
    debtorUpdate:"/debtor/:id/update",
    debtCreate:"/debtor/:id/create-debt",
    debtUpdate:"/debtor/:id/debt/:debtId/update",
    debtSingle:"/debtor/:id/debt/:debtId",
    debtPayment:"/debtor/:id/debt/:debtId/payment",
    notification:"/notification",
    notificationMessage:"/notification/:debtorId",
    settings:"/settings",
}
export default PATH