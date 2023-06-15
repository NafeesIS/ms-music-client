import React from 'react';
import Classes from './Classes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const AllClasses = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Classes></Classes>
        </QueryClientProvider>
    );
};

export default AllClasses;