const _ = require('lodash');
const axios = require("axios");
var parser = require('xml2json');
const cheerio = require('cheerio');
// const qs = require('qs')

const getXaHoi = async () => {
    return axios({
        method: 'get',
        url: 'https://tuoitre.vn/rss/thoi-su.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}

const getGiaiTri = async () => {
    return axios({
        method: 'get',
        url: 'https://tuoitre.vn/rss/giai-tri.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}
const getTheThao = async () => {
    return axios({
        method: 'get',
        url: 'https://tuoitre.vn/rss/the-thao.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}



const getDetailDantri = async (url) => {
    const res = await axios({
        method: 'get',
        url: url,
        responseType: 'html'
    });
    const $ = cheerio.load(res.data, { decodeEntities: false });
    const title = $('#main-detail > div.w980 > h1').text();
    const description = $('#mainContentDetail > div > div > h2').text();
    const body = $("#main-detail-body").html()
    const image_link = $('.main-content-body').find('img').first().attr('src')
    return { title, description, body, image_link }
}


console.log('crawler dantri')
getXaHoi().then(async res => {
    const list_items = res.rss.channel.item;
    const item = _.head(list_items)
    const imageObject = cheerio.load(item.description);
    const _image_link = imageObject('img').attr('src');
    const object_insert = {
        uuid: item.link,
        title: item.title,
        description: item.description.replace(/<[^>]*>/g, ''),
        image_link: _image_link,
        pub_date: item.pubDate,
        source_link: item.link
    };
    const { body, image_link } = await getDetailDantri(object_insert.source_link);
    if (!!body) {

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
                category_id: 7
            }
        });
    }
});


getGiaiTri().then(async res => {
    const list_items = res.rss.channel.item;
    const item = _.head(list_items)
    const imageObject = cheerio.load(item.description);
    const _image_link = imageObject('img').attr('src');
    const object_insert = {
        uuid: item.link,
        title: item.title,
        description: item.description.replace(/<[^>]*>/g, ''),
        image_link: _image_link,
        pub_date: item.pubDate,
        source_link: item.link
    };
    const { body, image_link } = await getDetailDantri(object_insert.source_link);
    if (!!body) {
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
                category_id: 8
            }
        });
    }
});


getTheThao().then(async res => {
    const list_items = res.rss.channel.item;
    const item = _.head(list_items)
    const imageObject = cheerio.load(item.description);
    const _image_link = imageObject('img').attr('src');
    const object_insert = {
        uuid: item.link,
        title: item.title,
        description: item.description.replace(/<[^>]*>/g, ''),
        image_link: _image_link,
        pub_date: item.pubDate,
        source_link: item.link
    };
    const { body, image_link } = await getDetailDantri(object_insert.source_link);
    if (!!body) {
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
                category_id: 9
            }
        });
    }
});
