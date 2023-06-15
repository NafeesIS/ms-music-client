import React from 'react';
import PopularClasses from './PopularClasses';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const AllPopularClasses = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <PopularClasses></PopularClasses>
        </QueryClientProvider>
    );
};

export default AllPopularClasses;