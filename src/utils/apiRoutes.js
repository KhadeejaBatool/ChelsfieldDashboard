export const serverUrl = 'http://localhost:3000';
export const apiUrl = 'http://localhost:3000/api/v1/';

export const addSliderImageUrl = `${apiUrl}/upload-slider-image`;
export const getSliderImageUrl = `${apiUrl}/get-slider-images`;


// =======================  NOT USED ======================= //
const adminRoutesUrl = `${serverUrl}/admin`;
const employeeRoutesUrl = `${serverUrl}/employee`;
const enquiryRoutesUrl = `${serverUrl}/enquiry`;
const api = `${serverUrl}/api`;

// enquiry api urls
export const getAllEnquiriesUrl = `${enquiryRoutesUrl}/all_enquiries`;
export const getAllEnquiryTypesUrl = `${enquiryRoutesUrl}/all_enquiry_types`;
export const addEnquiryTypeUrl = `${enquiryRoutesUrl}/add_enquiry_type`;
export const deleteEnquiryUrl = (id) => `${enquiryRoutesUrl}/delete_enquiry/${id}`;
export const updateEnquiryStatusUrl = (id) => `${enquiryRoutesUrl}/update_enquiry_status/${id}`;
export const updateEnquiryVisibilityUrl = (id) => `${enquiryRoutesUrl}/update_enquiry_visibility/${id}`;
export const deleteEnquiryTypeUrl = (id)=>`${enquiryRoutesUrl}/delete_enquiry_type/${id}`;
// admin api urls
export const adminLoginUrl = `${adminRoutesUrl}/adminlogin`;
export const editAdminUrl = (id) => `${adminRoutesUrl}/edit_admin/${id}`;
export const editEmployeeUrl = (id) => `${adminRoutesUrl}/edit_employee/${id}`;
export const deleteEmployeeUrl = (id) => `${adminRoutesUrl}/delete_employee/${id}`;
export const getAdminDetailsUrl = (id) => `${adminRoutesUrl}/detail/${id}`;
export const addCategoryUrl = `${adminRoutesUrl}/add_category`;
export const deleteCategoryUrl = (id) => `${adminRoutesUrl}/delete_category/${id}`;
export const addEmployeeUrl = `${adminRoutesUrl}/add_employee`;
export const getAllCategoriesUrl = `${adminRoutesUrl}/category`;
export const getAllAdminsUrl = `${adminRoutesUrl}/admin_records`;
export const deleteAdminUrl = (id)=>`${adminRoutesUrl}/delete_admin/${id}`;
export const getAdminsCountUrl = `${adminRoutesUrl}/admin_count`;
export const getEmployeesCountUrl = `${adminRoutesUrl}/employee_count`;
export const getSalaryCountUrl = `${adminRoutesUrl}/salary_count`;
export const getAllEmployeesUrl = `${adminRoutesUrl}/employee`;
export const logoutAdminUrl = `${adminRoutesUrl}/logout`;

// employee api urls
export const employeeLoginUrl = `${employeeRoutesUrl}/employee_login`;
export const employeeSignupUrl = `${employeeRoutesUrl}/employee_signup`;
export const getEmployeeDetailsUrl = (id) => `${employeeRoutesUrl}/detail/${id}`;
export const logoutEmployeeUrl = `${employeeRoutesUrl}/logout`; 
export const getCountriesUrl = `${api}/countries`; 
export const getCitiesUrl =(countryId)=> `${api}/cities/${countryId}`; 
export const generateEnquiriesUrl = `${serverUrl}/enquiry/submit_enquiry`; 
