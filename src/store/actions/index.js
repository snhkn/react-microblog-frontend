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

export const registerNewUser
    = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("/auth/signup", sendData);
            reset();
            toast.success(data?.message || "User Registered Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
        } finally {
            setLoader(false);
        }
};

export const logOutUser = (navigate) => async (dispatch) => {
  try {
    await api.post("/auth/logout");
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    dispatch({ type: "LOG_OUT" });
    localStorage.removeItem("auth");
    navigate("/login");
  }
};
