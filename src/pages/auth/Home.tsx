import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { PATH } from "../../hooks"

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(PATH.login)
  }, [])
  return ""
}

export default Home