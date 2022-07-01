import React from 'react';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

export const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'authorization': localStorage.getItem('token')
            'authorization': (await Storage.get({ key: 'token' })).value
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    });
    return response.json();
};

export const getData = async (url = '') => {

    const response = await fetch(url, {
        //headers: { 'authorization': localStorage.getItem('token') },
        headers: { 'authorization': (await Storage.get({ key: 'token' })).value },
    });
    return response.json();
};