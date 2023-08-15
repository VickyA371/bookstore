import axios from 'axios';
import constants from '../constants';

axios.defaults.baseURL = constants.URLs.DEFAULT_BASE_URL;

export default axios;
