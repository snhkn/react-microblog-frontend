import api from '../../api/api'


export const authenticateSignInUser =
    (sendData, toast, reset, navigate, setLoader) => async (dispatch) =>{

        try{
            setLoader(true);
            const {data} = await api.post("/auth/signin", sendData);
            dispatch({type: "LOGIN_USER", payload:data});
            localStorage.setItem("auth", JSON.stringify(data));
            reset();
            toast.success("Login Success");
            navigate("/");
        }catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message || "Internal server error");
        }finally{
            setLoader(false);
        }

};