import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    useDebugValue(context.auth, auth => auth?.user ? "Logged In" : "Logged Out");
    return context;
};

export default useAuth;
