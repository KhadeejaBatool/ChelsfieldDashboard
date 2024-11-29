import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import { IoEyeOffSharp } from 'react-icons/io5';
import { setUser } from '../../store/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        axios.get(getCountriesUrl)
            .then((response) => {
                if (response.data.Status) {
                    setCountries(response.data.countries);
                }
            })
            .catch((error) => console.error("Error fetching countries:", error));
        fetchCities()
    }, []);

    const fetchCities = (countryId) => {
        axios.get(getCitiesUrl(countryId))
            .then((response) => {
                if (response.data.Status) {
                    setCities(response.data.cities);
                }
            })
            .catch((error) => console.error("Error fetching cities:", error));
    };

    useEffect(() => {
        dispatch(setPageTitle('Login'));
    }, [dispatch]);

    const navigate = useNavigate();
    const isDark = useSelector((state) => state.themeConfig.theme) === 'dark';
    const [showPassword, setShowPassword] = useState(false);

    const [values, setValues] = useState({
        email: '',
        password: '',
        countryId: selectedCountry,
        cityId: selectedCity,
        role: 'admin',
    });
    const [error, setError] = useState(null);
    axios.defaults.withCredentials = true;



    const handleSubmit = (event) => {
        event.preventDefault();

        // Select the endpoint based on the role
        const endpoint = '';

        axios.post(endpoint, {
            email: values.email,
            password: values.password,
        })
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid", true);
                    localStorage.setItem("token", result.data.token);
                    localStorage.setItem("role", values.role);
                    dispatch(setUser({
                        email: values.email,
                        role: values.role,
                        id: result.data.id || null,
                    }));
                    if (values.role === 'admin') {
                        navigate('/');
                    } else {
                        navigate(`/employee/home/${result.data.id}`);
                    }
                } else {
                    setError(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full">
                <h2 className="font-bold text-2xl mb-3">Sign In</h2>
                <p className="mb-7">Enter your email and password to login</p>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            className="form-input"
                            placeholder="Enter Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <div className="flex flex-row items-center">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}

                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                                className="form-input flex-1"
                                placeholder="Enter Password"
                            />
                            <span
                                className="cursor-pointer ml-2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye size={15} /> : <IoEyeOffSharp size={15} />}
                            </span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={values.role}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        SIGN IN
                    </button>
                </form>
                {error && <p className="text-red-500 mt-3">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
