import axios from 'axios'

const token = "98714a01-768c-423f-ab4e-10de101774cc"
const apiKey = '76e44ca2-0240-4e38-b628-979621142900'


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey,
    },
})

