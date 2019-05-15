const _ = require('lodash');
const axios = require("axios");
const cheerio = require('cheerio');

const getDetailVnExpress = async (url) => {
    const res = await axios({
        method: 'get',
        url: 'url',
        responseType: 'html'
    });
    const $ = cheerio.load(res.data, { decodeEntities: false });
    const title = $('.title_news_detail.mb10').text();
    const description = $('.description').text();
    const body = $('.content_detail.fck_detail.width_common.block_ads_connect').html();
    return { title, description, body }
}