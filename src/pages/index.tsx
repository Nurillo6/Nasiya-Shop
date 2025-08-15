import { lazy } from "react"
import LoginHome from "./auth/Home"
import Calendar from "./dashboard/Calendar"
import DebtorCreate from "./dashboard/DebtorCreate"
import DebtCreate from "./dashboard/DebtCreate"
import DebtSingle from "./dashboard/DebtSingle"
import DebtPayment from "./dashboard/DebtPayment"
import Settings from "./dashboard/settings"

const Home = lazy(() => new Promise((resolve:any) => {
    return setTimeout(() => resolve(import("./dashboard/Home")), 1000)
}))
const Login = lazy(() => new Promise((resolve:any) => {
    return setTimeout(() => resolve(import("./auth/Login")), 1500)
}))
const Debtor = lazy(() => new Promise((resolve:any) => {
    return setTimeout(() => resolve(import("./dashboard/Debtor")), 1000)
}))
const DebtorSingle = lazy(() => new Promise((resolve:any) => {
    return setTimeout(() => resolve(import("./dashboard/DebtorSingle")), 1000)
}))
const Notification = lazy(() => new Promise((resolve:any) => {
    return setTimeout(() => resolve(import("./dashboard/report/Notification")), 1000)
}))
const Message = lazy(() => new Promise((resolve:any) => {
    return setTimeout(() => resolve(import("./dashboard/report/Message")), 1000)
}))

export {Debtor, Login, Home, DebtorSingle, Notification,Settings,LoginHome, Calendar, DebtorCreate, DebtCreate,DebtSingle,DebtPayment, Message }