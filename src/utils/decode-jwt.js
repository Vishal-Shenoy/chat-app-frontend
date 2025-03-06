import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
    localStorage.setItem("accessToken",token);
    const decoded = jwtDecode(token);
    const result = {
        _id : decoded?._id,
        userName : decoded?.userName,
        email : decoded?.email,
        profileUrl : decoded?.profileUrl
    }
    return result;
}
