import axios from 'axios';

const URL = 'https://crawler-news-ncov.herokuapp.com/news/'

export const getNews = async (page = 1) => {
    try {
        const data = await axios.get(URL + page);

        return data.data;
    } catch (error) {
        console.log(error);
    }

}