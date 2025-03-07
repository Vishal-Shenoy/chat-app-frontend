export const persistUser = () => {
    const value = localStorage.getItem("persist") || undefined;
    console.log(typeof value)
    if(value === undefined){
        localStorage.setItem("persist",true)
    }else if(value === "true"){
        console.log("hello")
        localStorage.setItem("persist",false);
    }else{
        console.log("should come")
        localStorage.setItem("persist",true);
    }
}

export const checkUserPersist = () => {
    return localStorage.getItem("persist") || false;
}