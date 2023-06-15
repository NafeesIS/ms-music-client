// import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../../Hooks/UseAdmin/UseAdmin';
import useStudent from '../../../Hooks/useStudent/useStudent';
import useInstructor from '../../../Hooks/useInstructor/useInstructor';

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isStudent] = useStudent();
    const [isInstructor] = useInstructor();
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <h2 className='text-3xl md:text-5xl font-bold font-serif mt-3'>Welcome To The Dashboard!</h2>
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content font-semibold font-serif">

                        {
                            isAdmin && <>
                                <li><Link to={'/dashboard/manageclasses'}>Manage Classes</Link></li>
                                <li><Link to={'/dashboard/manageusers'}>Manage Users</Link></li>

                            </>
                        }
                        {
                            isStudent && <>
                                <li><Link to={'/dashboard/selectedclasses'}>My Selected Classes</Link></li>
                                <li><Link to={'/dashboard/enrolledclasses'}>My Enrolled Classes</Link></li>
                            </>
                        }
                        {
                            isInstructor && <>
                                <li><Link to={'/dashboard/addclass'}>Add A Class</Link></li>
                                <li><Link to={'/dashboard/myclasses'}>My Classes</Link></li>
                            </>
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;