import axios from 'axios'

const token = '0bd28439-f220-4cf1-ab5c-6e19d171bd30'
const apiKey = 'c7dc365e-da8d-4e3d-aee7-04f90693a783'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  headers: {
    'Authorization': `Bearer ${token}`,
    'API-KEY': apiKey,
  }
})