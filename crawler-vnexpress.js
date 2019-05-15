const _ = require('lodash');
const axios = require("axios");
var parser = require('xml2json');
const cheerio = require('cheerio');


const getXaHoiVnExpress = async () => {
    return axios({
        method: 'get',
        url: 'https://vnexpress.net/rss/thoi-su.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}
const getGiaiTriVnExpress = async () => {
    return axios({
        method: 'get',
        url: 'https://vnexpress.net/rss/giai-tri.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}
const getTheThaoVnExpress = async () => {
    return axios({
        method: 'get',
        url: 'https://vnexpress.net/rss/the-thao.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}
const getDetailVnExpress = async (url) => {
    const res = await axios({
        method: 'get',
        url: url,
        responseType: 'html'
    });
    const $ = cheerio.load(res.data, { decodeEntities: false });
    const title = $('.title_news_detail.mb10').text();
    const description = $('.description').text();
    const body = $('.content_detail.fck_detail.width_common.block_ads_connect').html();
    const image_link = $('.content_detail.fck_detail').find('img').first().attr('data-original')
    return { title, description, body, image_link }
}


console.log('crawler vnexpress')
getXaHoiVnExpress().then(async res => {
    const list_items = res.rss.channel.item;
    const item = _.head(list_items)
    const imageObject = cheerio.load(item.description);
    const _image_link = imageObject('img').attr('src');
    const object_insert = {
        uuid: item.guid,
        title: item.title,
        description: item.description.replace(/<[^>]*>/g, ''),
        image_link: _image_link,
        pub_date: item.pubDate,
        source_link: item.link
    };
    const { body, image_link } = await getDetailVnExpress(object_insert.source_link);
    const resInsert = await axios({
        method: 'post',
        url: 'http://localhost:3003/insertNews',
        responseType: 'json',
        data: {
            "uuid": object_insert.uuid,
            "title": object_insert.title,
            "description": object_insert.description,
            "image_link": !!image_link ? image_link : object_insert.image_link,
            "pub_date": object_insert.pub_date,
            "source_link": object_insert.source_link,
            "body": body,
            category_id: 1

        }
    });
});

getGiaiTriVnExpress().then(async res => {
    const list_items = res.rss.channel.item;
    const item = _.head(list_items)
    const imageObject = cheerio.load(item.description);
    const _image_link = imageObject('img').attr('src');
    const object_insert = {
        uuid: item.guid,
        title: item.title,
        description: item.description.replace(/<[^>]*>/g, ''),
        image_link: _image_link,
        pub_date: item.pubDate,
        source_link: item.link
    };
    const { body, image_link } = await getDetailVnExpress(object_insert.source_link);
    const resInsert = await axios({
        method: 'post',
        url: 'http://localhost:3003/insertNews',
        responseType: 'json',
        data: {
            "uuid": object_insert.uuid,
            "title": object_insert.title,
            "description": object_insert.description,
            "image_link": !!image_link ? image_link : object_insert.image_link,
            "pub_date": object_insert.pub_date,
            "source_link": object_insert.source_link,
            "body": body,
            category_id: 2

        }
    });
});

getTheThaoVnExpress().then(async res => {
    const list_items = res.rss.channel.item;
    const item = _.head(list_items)
    const imageObject = cheerio.load(item.description);
    const _image_link = imageObject('img').attr('src');
    const object_insert = {
        uuid: item.guid,
        title: item.title,
        description: item.description.replace(/<[^>]*>/g, ''),
        image_link: _image_link,
        pub_date: item.pubDate,
        source_link: item.link
    };
    const { body, image_link } = await getDetailVnExpress(object_insert.source_link);
    const resInsert = await axios({
        method: 'post',
        url: 'http://localhost:3003/insertNews',
        responseType: 'json',
        data: {
            "uuid": object_insert.uuid,
            "title": object_insert.title,
            "description": object_insert.description,
            "image_link": !!image_link ? image_link : object_insert.image_link,
            "pub_date": object_insert.pub_date,
            "source_link": object_insert.source_link,
            "body": body,
            category_id: 3

        }
    });
})

