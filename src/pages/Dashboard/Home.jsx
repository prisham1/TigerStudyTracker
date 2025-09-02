import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { IoMdTime, IoMdSpeedometer, IoMdPin } from 'react-icons/io';

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu"; 
import {IoMdCard} from "react-icons/io"
import InfoCard from '../../components/Cards/InfoCard'; 
import RecentSessions from '../../components/Dashboard/RecentSessions';
import AcademicOverview  from '../../components/Dashboard/AcademicOverview';
import StudyNotes from '../../components/Dashboard/StudyNotes';

const Home = () => {
    useUserAuth(); // Ensure user is authenticated

    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return; // Prevent multiple fetches
        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.DASHBOARD.GET_DATA}`
            ); 

            if (response.data) {
                setDashboardData(response.data); 
            }
        } catch (error) { 
            console.error("Error fetching dashboard data:", error);
        } finally { 
            setLoading(false);
        }
    }; 

    useEffect(() => {
        fetchDashboardData();
    }, []); 

    return (
        <DashboardLayout activeMenu="Dashboard"> 
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard 
                        icon={<IoMdTime />} 
                        label="Total Study Time (hrs)" 
                        value={dashboardData?.totalDuration || 0} 
                        color="bg-stone-200" 
                    />
                    <InfoCard 
                        icon={<IoMdSpeedometer />} 
                        label="Average Productivity" 
                        value={dashboardData?.averageProductivity || 0} 
                        color="bg-rose-200"
                    />
                    <InfoCard 
                        icon={<IoMdPin />} 
                        label="Top Location" 
                        value={dashboardData?.mostProductiveLocation || "N/A"} 
                        color="bg-indigo-200" 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <RecentSessions
                    sessions={dashboardData?.last7DaysLogs}
                    onSeeMore={() => navigate("/studySessions")}
                />
               
                <AcademicOverview
                    totalStudiedHours={dashboardData?.totalHoursLast7Days}
                    totalSessions={dashboardData?.last7DaysLogs?.length || 0}
                    averageProductivity={dashboardData?.averageProductivity}
                    mostProductiveLocation={dashboardData?.mostProductiveLocation}
                    />
                {dashboardData && <StudyNotes logs={dashboardData.last7DaysLogs} />}
                
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;
