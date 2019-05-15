/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi'
import { Category, NewsDetail } from '../../sequelize';
import { Op } from 'sequelize'

/**
 * @swagger
 * /listEntertainment:
 *   get:
 *     tags:
 *       - News
 *     name: listEntertainment
 *     summary: listEntertainment
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameter: 
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: listEntertainment
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
    app.get('/entertainment', awaitErorrHandlerFactory(async (req, res, next) => {
        const params = req.query;
        const page = !!params.page ? parseInt(params.page) || 1 : 1;

        const list_category = await Category.findAll({
            raw: true,
            where: { title: 'entertainment' },

        });
        const list_category_id = list_category.map(category => category.id);
        const listNews = await NewsDetail.findAll({
            raw: true,
            where: {
                category_id: {
                    [Op.in]: list_category_id,
                },
            },
            order: [
                ['id', 'DESC'],
            ],
            offset: (page - 1) * 10,
            limit: 10
        });
        const color = ['blue', 'red', 'green'];
        const listFullNews = listNews.map(news => {
            const category = _.find(list_category, _category => _category.id === news.category_id);
            return {
                ...news,
                generator: category.generator,
                category_title: category.description,
                category: category.id,
                color: color[parseInt(category.id / 3)],
                createdAt: moment(news.createdAt).fromNow(),
            }
        });
        res.render("list", {
            title: 'entertainment',
            category_title: list_category[0].description,
            listFullNews: listFullNews,
            page: page,
            prePage: (page - 1) > 1 ? page - 1 : 1,
            nextPage: page + 1
        })
    }));
};
