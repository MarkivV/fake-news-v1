import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    "accept-language": "RU, UA, EN",
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '605d0d5cf9msh34f14d647a10160p116559jsn068316d5a633'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createReq = (url) => ({
    url, headers: cryptoNewsHeaders
})

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query:({newsCategory, count}) => createReq(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })

})

export const {useGetCryptoNewsQuery} = cryptoNewsApi