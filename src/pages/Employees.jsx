import { Link, NavLink, useNavigate } from 'react-router-dom';
import { DataTable } from 'mantine-datatable';
import { useState, useEffect } from 'react';
import sortBy from 'lodash/sortBy';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../store/themeConfigSlice';
import axios from 'axios';
import { deleteEmployeeUrl, getAllEmployeesUrl } from '../utils/apiRoutes';

const EmployeeList = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Employees List'));
    }, [dispatch]);

    const isDark = useSelector((state) => state.themeConfig.theme) === 'dark';
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState([]);
    const [records, setRecords] = useState([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // Fetch data from API
    useEffect(() => {
        axios
            .get(getAllEmployeesUrl)
            .then((result) => {
                if (result.data.Status) {
                    const sortedData = sortBy(result.data.Result, 'id');
                    setItems(sortedData);
                    setInitialRecords(sortedData);
                    setRecords(sortedData.slice(0, pageSize));
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    }, []);

// Filter records based on search input by name only
useEffect(() => {
    const filteredRecords = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );
    setInitialRecords(filteredRecords);
    setPage(1);
}, [search, items]);


    // Update records when page, pageSize, or initialRecords change
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(initialRecords.slice(from, to));
    }, [page, pageSize, initialRecords]);

    // Sort records
    useEffect(() => {
        const sortedData = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData);
        setPage(1);
    }, [sortStatus]);

    const handleDelete = (id) => {
        axios.delete(deleteEmployeeUrl(id))
            .then(result => {
                if (result.data.Status) {
                    setItems(items.filter(item => item.id !== id)); // Update items after deletion
                } else {
                    alert(result.data.Error);
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="panel px-0 border-white-light dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 px-5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="flex items-center gap-2">
                        <Link to="/admin/addEmployee" className="btn btn-primary gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Add Employee
                        </Link>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="datatables pagination-padding">
                    <DataTable
                        className={`${isDark ? 'dark' : ''} whitespace-nowrap table-hover`}
                        records={records}
                        columns={[
                            {
                                accessor: 'id',
                                sortable: true,
                                render: ({ id }) => <div className="text-primary font-semibold">{`#${id}`}</div>,
                            },
                            {
                                accessor: 'name',
                                sortable: true,
                                render: ({ name }) => <div>{name}</div>,
                            },
                            {
                                accessor: 'email',
                                render: ({ email }) => <div>{email}</div>,
                            },
                            {
                                accessor: 'category',
                                render: ({ category }) => <div>{category}</div>,
                            },
                            {
                                accessor: 'salary',
                                sortable: true,
                                render: ({ salary }) => <div>{`$${salary}`}</div>,
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="flex gap-4 items-center w-max mx-auto">
                                        <NavLink to={`/admin/editEmployee/${id}`} className="btn btn-sm btn-outline-primary">
                                            Edit
                                        </NavLink>
                                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(id)}>
                                            Delete
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
