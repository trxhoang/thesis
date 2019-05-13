const _ = require('lodash');
const Crawler = require("crawler");
// const cheerio = require('cheerio');

const crawler = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
            return null
        }
        const $ = res.$;
        // console.log($("title").text());
        done();
    }

});


crawler.queue({
    uri: 'https://vnexpress.net/rss/thoi-su.rss',
    // The global callback won't be called
    callback: function (error, res, done) {
        if (error) {
            console.log(error)
            return null
        }
        // const $ = res.$;
        handle(res.$)
        done();
    }
})
// *[@id="listcheckepl"]/div[1]/div/h2/a
//*[@id="listcheckepl"]/div[2]/div/h2/a




function handle(cheerio) {
    const $ = cheerio;
    // console.log($)
    return null
    const news_name = news_title;
    const news_content = $.html('.article_content')
    const news_description = $('.article_content').children().first().text();
    const image_link = `https:${$('.article_content').find('img').first().attr('src')}`
    const source_link = 'https://bitis.com.vn/blogs/news/biti-s-tu-hao-la-thuong-hieu-giay-dep-duy-nhat-duoc-vinh-danh-thuong-hieu-quoc-gia-2018'
    const internal_link = source_link.replace('https://bitis.com.vn/blogs/news/', '/tin/')
    const coupon_uuid = ""

    // console.log(news_content)

}




// crawler.queue({
//     uri: 'https://bitis.com.vn/blogs/news/',
//     // The global callback won't be called
//     callback: function (error, res, done) {
//         if (error) {
//             console.log(error)
//             return null
//         }
//         // const $ = res.$;
//         handleNewsHot(res.$)
//         done();
//     }
// })


function handleNewsHot(cheerio) {
    const $ = cheerio;
    const list_news = $('.post_content h2').children().map(function (index, element) {
        return $(element).attr('href')
    }).get()
    console.log(list_news)
}





const fetch = require('node-fetch')
var parser = require('xml2json');

const getA = async () => {
    // const response = await fetch('https://vnexpress.net/rss/thoi-su.rss')
    // const response = await fetch('https://vnexpress.net/rss/giai-tri.rss')
    const response = await fetch('https://vnexpress.net/rss/the-thao.rss')
        .then(r => r.text()).then(data => parser.toJson(data, { object: true, }))
    return response
}

// getA().then(res => {
//     const list_items = res.rss.channel.item;
//     const first = _.head(list_items)
//     console.log(first)

//     const id = first.link
//     // compare id to db_id

//     // if false, add to db
//     // if true, do nothing 
// })




const getB = async () => {
    const response = await fetch('https://vnexpress.net/rss/the-thao.rss')
        .then(r => r.text()).then(data => parser.toJson(data, { object: true, }))
    return response
}

// getB().then(res => {
//     const list_items = res.rss.channel.item;
//     const first = _.head(list_items)
//     console.log(first)

//     // const id = first.link
//     // compare id to db_id

//     // if false, add to db
//     // if true, do nothing 
// })





const getC = async () => {  
    const response = await fetch('https://www.tienphong.vn/rss/xa-hoi-2.rss')
        .then(r => r.text()).then(data => parser.toJson(data, { object: true, }))
    return response
}

getC().then(res => {
    const list_items = res.rss.channel.item;
    const first = _.head(list_items)
    console.log(first)

    // const id = first.link
    // compare id to db_id

    // if false, add to db
    // if true, do nothing 
})






