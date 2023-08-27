import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const RoleBaseRoute = (props) => {
    //get URL
    const isStudentRoute = window.location.pathname.startsWith('/student');
    console.log(window.location.pathname)
    //get user info from redux
    const user = useSelector(state => state.account.user)
    //check role user
    const userRole = user.role
    if (isStudentRoute === true && userRole === 'student') {
        return (<>{props.children}</>)
    } else {
        return (<Loading />)
    }
}

const ProtectedRouteStudent = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated)

    return (
        <>
            {isAuthenticated === true
                ? <>
                    <RoleBaseRoute>
                        {props.children}
                    </RoleBaseRoute>
                </>
                : <Navigate to='/login' replace />
            }
        </>
    )
}

export default ProtectedRouteStudent;