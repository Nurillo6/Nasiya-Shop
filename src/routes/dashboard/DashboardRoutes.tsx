import { Route, Routes } from "react-router-dom"
import { PATH } from "../../hooks/Path"
import { Calendar, Debtor, DebtorCreate, Home, DebtorSingle, DebtCreate } from "../../pages"
import DashboardLayout from "../../provider/DashboardLayout"
import { Suspense } from "react"
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
      </Routes>
    </DashboardLayout>
  )
}

export default DashboardRoutes