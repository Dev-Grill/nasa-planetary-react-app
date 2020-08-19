import {nasa_api_instance, backend_api_instance} from "../../utility/axios"
import * as TYPE from "../types"
import store from "../store"

import moment from 'moment'

const { REACT_APP_NASA_API_KEY } = process.env;

const dummy = {
    dummy: true,
    title: "Record not Found",
    media_type: "image",
    url: "https://www.govava.com/assets/front/social_links/no-record-found.png"
}

const getRemotePicture = async (date) => {

    store.dispatch({type: TYPE.LOADING, payload: true})

    try {
        const nasa_api_response = await nasa_api_instance.get(`/planetary/apod?api_key=${REACT_APP_NASA_API_KEY}&date=${date}`)
        save(nasa_api_response.data)

        store.dispatch({type: TYPE.LOADING, payload: false})
    } catch (error) {
        dummy['date'] = date
        store.dispatch({type: TYPE.SET_CURRENT_PICTURE, payload: dummy})

        store.dispatch({type: TYPE.LOADING, payload: false})
    }
}

function save (record) {
    record['favorite'] = false

    const pictures = JSON.parse(localStorage.getItem('pictures'));
    pictures.push(record)

    localStorage.setItem('pictures', JSON.stringify(pictures))    

    store.dispatch({type: TYPE.SET_CURRENT_PICTURE, payload: record})
}

const findOrCreate = async (date) => {
    
    const pictures = JSON.parse(localStorage.getItem('pictures'));

    const selected_record = pictures.find(picture => picture.date == date);

    if(selected_record == undefined){
        getRemotePicture(date)
    }
    else {
        store.dispatch({type: TYPE.SET_CURRENT_PICTURE, payload: selected_record})
    }
}

export const getPicture = (date) => async dispatch => {
    
    const pictures = JSON.parse(localStorage.getItem('pictures'));
    
    const selected_record = pictures.find(picture => picture.date == date);

    if(selected_record == undefined){
        getRemotePicture(date)
    }
    else {
        store.dispatch({type: TYPE.SET_CURRENT_PICTURE, payload: selected_record})
    }
}

export const loadDatabase = () => async dispatch => {

    dispatch({type: TYPE.LOADING, payload: true})

    const current_date = moment().format("YYYY-MM-DD")

    const pictures = JSON.parse(localStorage.getItem('pictures'));
    
    if(pictures == null || pictures.length == 0){
        localStorage.setItem('pictures', "[]")
        await getRemotePicture(current_date)
    }
    else {

        pictures.map((record, index) => {
            if(record.favorite === true){
                dispatch({type: TYPE.UPDATE_LIKES, payload: record})
            }
        })

        const todays_record =  pictures.find(record => record.date === current_date)
        
        if(todays_record){
            dispatch({type: TYPE.SET_CURRENT_PICTURE, payload: todays_record})
            dispatch({type: TYPE.LOADING, payload: false})
        }
        else {
            await getRemotePicture(current_date)
            dispatch({type: TYPE.LOADING, payload: false})
        }
    }
}

export const getPictures = (request_body) => async dispatch => {

    const records = []

    const pictures = JSON.parse(localStorage.getItem('pictures'));

    if(pictures == null || pictures.length == 0){
        localStorage.setItem('pictures', "[]")
    }

    pictures.map(picture => {
        if(picture.favorite == true){
            records.push(picture)
        }
    })

    dispatch({type: TYPE.UPDATE_PICTURES, payload: records})

}

export const likePicture = (request_body) => async dispatch => {

    const pictures = JSON.parse(localStorage.getItem('pictures'));
    
    const record = request_body
    record['favorite'] = true

    const select_recored =  pictures.find((picture, index) => {
        if(picture.date === record.date){
            pictures[index] = record
        }
    })

    localStorage.setItem('pictures', JSON.stringify(pictures))

    dispatch({type: TYPE.UPDATE_LIKES, payload: record})
}

export const disPicture = (request_body) => async dispatch => {

    const pictures = JSON.parse(localStorage.getItem('pictures'));
    
    const record = request_body
    record['favorite'] = false

    const select_recored =  pictures.find((picture, index) => {
        if(picture.date === record.date){
            pictures[index] = record
        }
    })

    localStorage.setItem('pictures', JSON.stringify(pictures))

    dispatch({type: TYPE.UPDATE_LIKES, payload: record})
}

export const getNextDate = (date) => async dispatch => {
    const new_date = moment(date).add(1, 'day').format("YYYY-MM-DD")
    findOrCreate(new_date)
}

export const getPrevDate = (date) => async dispatch => {
    const new_date = moment(date).subtract(1, 'day').format("YYYY-MM-DD")
    findOrCreate(new_date)
}

