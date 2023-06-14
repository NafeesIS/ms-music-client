import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const AllDashboard = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Dashboard></Dashboard>
        </QueryClientProvider>
    );
};

export default AllDashboard;