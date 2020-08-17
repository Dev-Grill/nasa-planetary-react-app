import {nasa_api_instance, backend_api_instance} from "../../utility/axios"

export const getRemotePicture = (request_body) => async dispatch => {
    return backend_api_instance.get('/pictures')
}

export const getPictures = (request_body) => async dispatch => {
    return backend_api_instance.get('/pictures')
}