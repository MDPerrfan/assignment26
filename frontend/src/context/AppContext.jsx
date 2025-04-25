import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const backendUrl = "http://localhost:5000"

    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState()
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [user, setUser] = useState(null)

    //Get all events
    const getAllevents = async () => {
        try {
            setLoading(true)
            const { data } =await axios.get(backendUrl + '/api/events/')
            if (data) {
                setEvents(data);
                setLoading(false)
            }else{
                toast.error("Failed to get events!")
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getUserData = async () => {
        try {
            // Ideally store token in localStorage and attach it here
            const token = localStorage.getItem('token')
            if (!token) return;
            const { data } = await axios.get(backendUrl + '/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUser(data)
        } catch (error) {
            console.error("Get user failed:", error)
        }
    }
    //logout
    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedin(false);
        setUser(null);
      }
      
    useEffect(() => {
        getAllevents();
        getUserData();

    },[])
    const value = {
        backendUrl,
        loading,
        setLoading,
        events,
        setEvents,
        isLoggedin,
        setIsLoggedin,
        user,
        getUserData,
        logout
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}