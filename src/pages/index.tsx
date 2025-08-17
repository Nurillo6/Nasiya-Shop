import { lazy } from "react"
import LoginHome from "./auth/Home"
import DebtorCreate from "./dashboard/debtor/DebtorCreate"
import DebtCreate from "./dashboard/debt/DebtCreate"
import DebtSingle from "./dashboard/debt/DebtSingle"
import DebtPayment from "./dashboard/debt/DebtPayment"
import Settings from "./dashboard/settings"
import Notification from "./dashboard/report/Notification"
import Message from "./dashboard/report/Message"

const Home = lazy(() => import("./dashboard/Home"))
const Calendar = lazy(() => import("./dashboard/calendar"))

const Login = lazy(() => new Promise((resolve:any) => {
    return setTimeout(() => resolve(import("./auth/Login")), 1500)
}))
const Debtor = lazy(() => new Promise((resolve:any) => {
    return setTimeout(() => resolve(import("./dashboard/debtor/Debtor")), 1500)
}))
const DebtorSingle = lazy(() => new Promise((resolve:any) => {
    return setTimeout(() => resolve(import("./dashboard/debtor/DebtorSingle")), 1500)
}))

export {Debtor, Login, Home, DebtorSingle, Notification,Settings,LoginHome, Calendar, DebtorCreate, DebtCreate,DebtSingle,DebtPayment, Message }