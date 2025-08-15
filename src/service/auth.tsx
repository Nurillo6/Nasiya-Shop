import { instance } from "../hooks"

export const Login = (data:{login:string, password:string}, setCookies:any) => {
    instance().post("/seller/login", data).then(res => {
        setCookies("token", res.data.data.accessToken)
        location.pathname = "/"
    })
}