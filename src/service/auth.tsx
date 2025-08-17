import { instance } from "../hooks"

export const Login = (data:{login:string, password:string}, setCookies:any) => {
    instance.post("/seller/login", data).then(res => {
        setCookies("accessToken", res.data.data.accessToken)
        setCookies("refreshToken", res.data.data.refreshToken)
        location.pathname = "/"
    })
}