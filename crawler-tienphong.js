const _ = require('lodash');
const axios = require("axios");
var parser = require('xml2json');
const cheerio = require('cheerio');
const qs = require('qs')

const getXaHoi = async () => {
    return axios({
        method: 'get',
        url: 'https://www.tienphong.vn/rss/xa-hoi-2.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}

const getGiaiTri = async () => {
    return axios({
        method: 'get',
        url: 'https://www.tienphong.vn/rss/giai-tri-sao-35.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}
const getTheThao = async () => {
    return axios({
        method: 'get',
        url: 'https://www.tienphong.vn/rss/the-thao-11.rss',
        responseType: 'text',
    }).then(data => parser.toJson(data.data, { object: true, }))
}

const getDetail = async (url) => {
    const res = await axios({
        method: 'get',
        url: url,
        responseType: 'html'
    });
    if (res.status !== 200) return {}
    const $ = cheerio.load(res.data, { decodeEntities: false });
    const title = $('#headline').text();
    const description = $('#article-content-left > article > p').text();
    const body = $("#article-body").html()
    const image_link = $('#article-content-left').find('img').first().attr('src')
    return { title, description, body, image_link }
}

console.log('crawler tienphong');

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
    const list_items_need_consider = _.filter(list_items, item => !_.includes(list_uuid_existed.data, item.guid));
    console.log("TCL: crawlerRunning -> list_items", list_items.length)
    console.log("TCL: crawlerRunning -> list_items_need_consider", list_items_need_consider.length);
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
    await xahoi(4)
    await giaitri(5)
    await thethao(6)
}
