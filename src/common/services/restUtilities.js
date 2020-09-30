import axios from 'axios';
import * as CONSTANTS from '../constants/constants';

export const getData = async (url) => {
    return await axios.get(CONSTANTS.BACKEND_URL_LOCAL + url)
        .then(response => response.data)
        .catch(err => err);
}
