import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { Calendar, Debtor, DebtorCreate, Home, DebtorSingle, DebtCreate, DebtSingle, Notification, DebtPayment, Message, Settings } from "../../pages"
import DashboardLayout from "../../provider/DashboardLayout"
import {CalendarSkeleton, DebtorSingleSkeleton, DebtorSkeleton, HomeSkeleton, PageLoading } from "../../components"
import { PATH } from "../../hooks"

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path={PATH.main} element={<Suspense fallback={<HomeSkeleton/>}><Home /></Suspense>} />
        <Route path={PATH.calendar} element={<Suspense fallback={<CalendarSkeleton/>}><Calendar/></Suspense>} />
        <Route path={PATH.debtor} element={<Suspense fallback={<DebtorSkeleton/>}><Debtor /></Suspense>} />
        <Route path={PATH.debtorSingle} element={<Suspense fallback={<DebtorSingleSkeleton/>}><DebtorSingle /></Suspense>}/>
        <Route path={PATH.debtorCreate} element={<DebtorCreate/>}/>
        <Route path={PATH.debtorUpdate} element={<DebtorCreate/>}/>
        <Route path={PATH.debtCreate} element={<DebtCreate/>}/>
        <Route path={PATH.debtUpdate} element={<DebtCreate/>}/>
        <Route path={PATH.debtSingle} element={<DebtSingle/>}/>
        <Route path={PATH.debtPayment} element={<DebtPayment/>}/>
        <Route path={PATH.notification} element={<Notification/>}/>
        <Route path={PATH.notificationMessage} element={<Message/>}/>
        
        <Route path={PATH.settings} element={<Settings/>}/>
      </Routes>
    </DashboardLayout>
  )
}

export default DashboardRoutes