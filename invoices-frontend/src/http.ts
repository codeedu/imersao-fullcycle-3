import axios from "axios";

const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_INVOICE_API_URL
})

export default http;