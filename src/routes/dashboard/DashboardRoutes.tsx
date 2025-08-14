import { Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { PATH } from "../../hooks/Path"
import { Calendar, Debtor, DebtorCreate, Home, DebtorSingle, DebtCreate, DebtSingle, Notification, DebtPayment, Message } from "../../pages"
import DashboardLayout from "../../provider/DashboardLayout"
import { PageLoading } from "../../components"

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path={PATH.main} element={<Suspense fallback={<PageLoading/>}><Home /></Suspense>} />
        <Route path={PATH.calendar} element={<Calendar/>} />
        <Route path={PATH.debtor} element={<Suspense fallback={<PageLoading/>}><Debtor /></Suspense>} />
        <Route path={PATH.debtorSingle} element={<Suspense fallback={<PageLoading/>}><DebtorSingle /></Suspense>}/>
        <Route path={PATH.debtorCreate} element={<DebtorCreate/>}/>
        <Route path={PATH.debtorUpdate} element={<DebtorCreate/>}/>
        <Route path={PATH.debtCreate} element={<DebtCreate/>}/>
        <Route path={PATH.debtUpdate} element={<DebtCreate/>}/>
        <Route path={PATH.debtSingle} element={<DebtSingle/>}/>
        <Route path={PATH.debtPayment} element={<DebtPayment/>}/>
        <Route path={PATH.notification} element={<Suspense fallback={<PageLoading/>}><Notification/></Suspense>}/>
        <Route path={PATH.notificationMessage} element={<Suspense fallback={<PageLoading/>}><Message/></Suspense>}/>
      </Routes>
    </DashboardLayout>
  )
}

export default DashboardRoutes