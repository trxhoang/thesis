const _ = require('lodash');
const axios = require("axios");
var parser = require('xml2json');
const cheerio = require('cheerio');


const getXaHoi = async () => {
    return axios({
        method: 'get',
        url: 'https://vnexpress.net/rss/thoi-su.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}
const getGiaiTri = async () => {
    return axios({
        method: 'get',
        url: 'https://vnexpress.net/rss/giai-tri.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}
const getTheThao = async () => {
    return axios({
        method: 'get',
        url: 'https://vnexpress.net/rss/the-thao.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}
const getDetail = async (url) => {
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


async function insertNews({ object_insert, image_link, body, category_id }) {
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
            "category_id": category_id
        }
    });
}

async function crawlerRunning(res, category_id) {
    const list_items = res.rss.channel.item;
    const list_uuid = list_items.map(item => item.guid);
    const list_uuid_existed = await axios({
        method: 'post',
        url: 'http://localhost:3003/checkNewExisted',
        responseType: 'json',
        data: { list_uuid: list_uuid }
    });
    const list_items_need_consider = list_items.filter(item => !_.includes(list_uuid_existed.data, item.guid));
    console.log("TCL: crawlerRunning -> list_items_need_consider", list_items_need_consider.length)
    const p_list_consider = list_items_need_consider.map(async item => {
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
        const { body, image_link } = await getDetail(object_insert.source_link);
        if (!!body && !!image_link) {
            const resInsert = await insertNews({
                object_insert: object_insert,
                image_link: image_link,
                body: body,
                category_id: category_id
            });
        }
    });
    await Promise.all(p_list_consider)
}

const xahoi = async function (category_id) {
    try {
        getXaHoi().then(async res => {
            await crawlerRunning(res, category_id)
        })
    } catch (error) {
        console.log("TCL: error", error)
    }
}

const giaitri = async function (category_id) {
    try {
        getGiaiTri().then(async res => {
            await crawlerRunning(res, category_id)
        });
    } catch (error) {
        console.log("TCL: error", error)
    }
}

const thethao = async function (category_id) {
    try {
        getTheThao().then(async res => {
            await crawlerRunning(res, category_id)
        })
    } catch (error) {
        console.log("TCL: error", error)
    }
}

module.exports = async function () {
    await xahoi(1)
    await giaitri(2)
    await thethao(3)
}