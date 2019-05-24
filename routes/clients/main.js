/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi'
import { Category, NewsDetail } from '../../sequelize';
import { Op } from 'sequelize'

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - News
 *     name: mainPage
 *     summary: mainPage
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: mainPage
 */

//middleware to hanlde errors 
const awaitErorrHandlerFactory = middleware => {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};


module.exports = app => {
    app.get('/', awaitErorrHandlerFactory(async (req, res, next) => {
        const listCategory = await Category.findAll({
            raw: true
        });
        const listCategorySocial = listCategory.filter(category => category.title === 'social');
        const listCategorySport = listCategory.filter(category => category.title === 'sport');
        const listCategoryEntertainment = listCategory.filter(category => category.title === 'entertainment');

        const listCategorySocialId = listCategorySocial.map(category => category.id);
        const listCategorySportId = listCategorySport.map(category => category.id);
        const listCategoryEntertainmentId = listCategoryEntertainment.map(category => category.id);

        const listSocialNews = await NewsDetail.findAll({
            raw: true,
            where: {
                category_id: {
                    [Op.in]: listCategorySocialId
                }
            },
            limit: 6,
            order: [
                ['id', 'DESC'],
            ]
        });
        const listSportNews = await NewsDetail.findAll({
            raw: true,
            where: {
                category_id: {
                    [Op.in]: listCategorySportId
                }
            },
            limit: 6,
            order: [
                ['id', 'DESC'],
            ]
        });
        const listEntertainmentNews = await NewsDetail.findAll({
            raw: true,
            where: {
                category_id: {
                    [Op.in]: listCategoryEntertainmentId
                }
            },
            limit: 6,
            order: [
                ['id', 'DESC'],
            ]
        });

        const listHeroNews = [
            ..._.slice(listSocialNews, 0, 3),
            ..._.slice(listSportNews, 0, 3),
            ..._.slice(listEntertainmentNews, 0, 3)
        ]

        const color = {
            'social': 'blue',
            'sport': 'red',
            'entertainment': 'green'
        };

        res.render("index", {
            listHeroNews: listHeroNews.map(news => {
                const category = _.find(listCategory, _category => _category.id === news.category_id);
                return {
                    ...news,
                    category_key: category.title,
                    category_title: category.description,
                    color: color[category.title] || 'blue'
                }
            }),
            listSocialNews: listSocialNews.map(news => {
                const category = _.find(listCategory, _category => _category.id === news.category_id);
                return {
                    ...news,
                    category_key: category.title,
                    category_title: category.description,
                    color: color[category.title] || 'blue'
                }
            }),
            listSportNews: listSportNews.map(news => {
                const category = _.find(listCategory, _category => _category.id === news.category_id);
                return {
                    ...news,
                    category_key: category.title,
                    category_title: category.description,
                    color: color[category.title] || 'blue'
                }
            }),
            listEntertainmentNews: listEntertainmentNews.map(news => {
                const category = _.find(listCategory, _category => _category.id === news.category_id);
                return {
                    ...news,
                    category_key: category.title,
                    category_title: category.description,
                    color: color[category.title] || 'blue'
                }
            })

        })
    }));
};
