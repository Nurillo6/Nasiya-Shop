import { lazy } from "react"
import LoginHome from "./auth/Home"
import Calendar from "./dashboard/Calendar"
import DebtorCreate from "./dashboard/DebtorCreate"
import DebtCreate from "./dashboard/DebtCreate"

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

export {Debtor, Login, Home, DebtorSingle,LoginHome, Calendar, DebtorCreate, DebtCreate}