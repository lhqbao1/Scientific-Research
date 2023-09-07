import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const RoleBaseRoute = (props) => {
    //get URL
    const isLecturerRoute = window.location.pathname.startsWith('/lecturer');
    //get user info from redux
    const user = useSelector(state => state.accountLecturer.user)
    //check role user
    const userRole = user.role
    if (isLecturerRoute === true && userRole === 'lecturer') {
        return (<>{props.children}</>)
    } else {
        return (<Loading />)
    }
}

const ProtectedRouteLecturer = (props) => {
    const isAuthenticated = useSelector(state => state.accountLecturer.isAuthenticated)

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

export default ProtectedRouteLecturer;