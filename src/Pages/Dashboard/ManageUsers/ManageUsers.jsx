import { useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
// import ManageAllUsersPage from '../ManageAllUsers/ManageAllUsers';
import ManageAllUsers from '../ManageAllUsers/ManageAllUsers';
const queryClient = new QueryClient();
const ManageUsers = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <ManageAllUsers />
        </QueryClientProvider>
    );
};

export default ManageUsers;
