import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import { DataTable } from 'mantine-datatable';
import { deleteAdminUrl, getAdminsCountUrl, getAllAdminsUrl, getEmployeesCountUrl, getSalaryCountUrl } from '../utils/apiRoutes';
const Index = () => {

    const [loading] = useState(false);
    const isDark = useSelector((state) => state.themeConfig.theme) === 'dark' ? true : false;
    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [adminTotal, setAdminTotal] = useState(0);
    const [employeeTotal, setemployeeTotal] = useState(0);
    const [salaryTotal, setSalaryTotal] = useState(0);
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    // Get logged-in admin ID from JWT token
    const token = localStorage.getItem('token');
    let loggedInAdminId = null;

    if (token) {
        const decoded = jwtDecode(token);
        loggedInAdminId = decoded.id; // or decoded.email if you want to use email instead
    }

    useEffect(() => {
        adminCount();
        employeeCount();
        salaryCount();
        AdminRecords();
    }, []);

    const AdminRecords = () => {
        axios.get(getAllAdminsUrl)
            .then(result => {
                if (result.data.Status) {
                    const filteredAdmins = result.data.Result.filter(
                        admin => admin.id != loggedInAdminId
                    );
                    setAdmins(filteredAdmins);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error(err));
    };

    const adminCount = () => {
        axios.get(getAdminsCountUrl)
            .then(result => {
                if (result.data.Status) {
                    setAdminTotal(result.data.Result[0].admin);
                }
            })
            .catch(err => console.error(err));
    };

    const employeeCount = () => {
        axios.get(getEmployeesCountUrl)
            .then(result => {
                if (result.data.Status) {
                    setemployeeTotal(result.data.Result[0].employee);
                }
            })
            .catch(err => console.error(err));
    };

    const salaryCount = () => {
        axios.get(getSalaryCountUrl)
            .then(result => {
                if (result.data.Status) {
                    setSalaryTotal(result.data.Result[0].salaryOFEmp);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error(err));
    };

    const handleDelete = (id) => {
        axios.delete(deleteAdminUrl(id))
            .then(result => {
                if (result.data.Status) {
                    AdminRecords(); // Refresh the admin list after deletion
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.error("Error deleting admin:", err));
    };

    const handleEdit = (id) => {
        navigate(`/admin/edit_admin/${id}`);
    };


    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
            </ul>

            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="panel h-full">
                        <div className="flex items-center mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">
                                Latest News
                            </h5>
                            <div className="ltr:ml-auto rtl:mr-auto relative">
                                <div className="w-11 h-11 text-warning bg-[#ffeccb] dark:bg-warning dark:text-[#ffeccb] grid place-content-center rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 256 256"
                                        className="w-full h-full"
                                        fill="#fbc932"
                                    >
                                        <g transform="scale(5.12,5.12)">
                                            <path d="M1.71875,2.78125c-0.46484,0.10547-0.79297,0.52344-0.78125,1v35.6875c0,4.24609 2.20703,6.64063 4.375,7.71875c2.16797,1.07813 4.3125,1.03125 4.3125,1.03125h30.75v-0.09375c0.48047,0.05469 1,0.09375 1,0.09375c0,0 1.92188,0.01172 3.84375,-1.09375c1.875,-1.07812 3.72266,-3.35937 3.8125,-7.3125c0.01172,-0.01953 0.02344,-0.04297 0.03125,-0.0625c0,-0.02344 0,-0.03906 0,-0.0625c0.00391,-0.05078 0.00391,-0.10547 0,-0.15625v-25.09375c0,-0.01172 0,-0.01953 0,-0.03125c0,0 0.01563,-1.17187-0.59375,-2.375c-0.60937,-1.20312-2.02734,-2.5-4.25,-2.5v-0.03125h-9.46875v2h5.5625c-0.12109,0.17188-0.22266,0.32813-0.3125,0.5c-0.60937,1.19141-0.625,2.375-0.625,2.375v24.25c-0.00391,0.35938 0.18359,0.69531 0.49609,0.87891c0.3125,0.17969 0.69531,0.17969 1.00781,0c0.3125,-0.18359 0.5,-0.51953 0.49609,-0.87891v-24.25c0,-0.02734 0.03906,-0.75 0.40625,-1.46875c0.375,-0.73047 0.90234,-1.375 2.4375,-1.375c1.53125,0 2.05859,0.66016 2.4375,1.40625c0.37109,0.73438 0.4375,1.47266 0.4375,1.5h-0.03125v25.09375c0,3.55859-1.42187,5.05859-2.84375,5.875c-1.42187,0.81641-2.84375,0.8125-2.84375,0.8125c0,0-1.69141,-0.02344-3.375,-0.875c-1.68359,-0.85156-3.3125,-2.34766-3.3125,-5.875v-35.6875c0,-0.55078-0.44922,-1-1,-1h-31.75c-0.07422,-0.00781-0.14453,-0.00781-0.21875,0z"></path>
                                        </g>
                                    </svg>
                                </div>

                            </div>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-black rounded-lg">
                                {loading ? (
                                    <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                    </div>
                                ) : (
                                    <div>
                                        <h5 className="font-semibold text-2xl dark:text-white-light">{25}</h5>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full">
                        <div className="flex items-center mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">
                                Images
                            </h5>
                            <div className="ltr:ml-auto rtl:mr-auto relative">
                                <div className="w-11 h-11 text-secondary bg-secondary-light dark:bg-secondary dark:text-secondary-light grid place-content-center rounded-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="9" cy="6" r="4" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M15 9C16.6569 9 18 7.65685 18 6C18 4.34315 16.6569 3 15 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                        <ellipse cx="9" cy="17" rx="7" ry="4" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M18 14C19.7542 14.3847 21 15.3589 21 16.5C21 17.5293 19.9863 18.4229 18.5 18.8704" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    </svg>

                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-black rounded-lg">
                                {loading ? (
                                    <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <h5 className="font-semibold text-2xl dark:text-white-light">{20}</h5>
                                        <NavLink to={'/admin/employees'} className={'underline text-primary'}></NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full">
                        <div className="flex items-center mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">
                                Events
                                {/* <span className="block text-white-dark text-sm font-normal">Go to columns for details.</span> */}
                            </h5>
                            <div className="ltr:ml-auto rtl:mr-auto relative">
                                <div className="w-11 h-11 bg-success-light dark:bg-success text-success dark:text-success-light grid place-content-center rounded-full">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path
                                            d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-black rounded-lg">
                                {loading ? (
                                    <div className="min-h-[325px] grid place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="animate-spin border-2 border-black dark:border-white !border-l-transparent  rounded-full w-5 h-5 inline-flex"></span>
                                    </div>
                                ) : (
                                    <div>
                                        <h5 className="font-semibold text-2xl dark:text-white-light">{5}</h5>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="panel h-full w-full">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Admins List</h5>
                    </div>

                    <div className="datatables">
                        <DataTable
                            highlightOnHover
                            className="whitespace-nowrap table-responsive table-striped"
                            records={admins}
                            columns={[
                                { accessor: 'id', title: 'ID' },
                                { accessor: 'email', title: 'Email' },
                                {
                                    accessor: 'action',
                                    title: 'Actions',
                                    render: ({ id }) => (
                                        <div className="flex gap-4">
                                            <NavLink to={`/admin/editAdmin/${id}`} type="button" className="btn btn-sm btn-outline-primary">
                                                Edit
                                            </NavLink>
                                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(id)}>
                                                Delete
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}

                            totalRecords={admins.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Index;
