import axios from 'axios'
import { BACKEND_API, NASA_API } from './config'


const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export const backend_api_instance = axios.create({
	baseURL: BACKEND_API,
	headers
});

export const nasa_api_instance = axios.create({
    baseURL: BACKEND_API,
    headers
});
