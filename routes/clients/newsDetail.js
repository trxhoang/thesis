/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import moment from 'moment'
import { Category, NewsDetail } from '../../sequelize';

/**
 * @swagger
 * /listSocial:
 *   get:
 *     tags:
 *       - News
 *     name: listSocial
 *     summary: listSocial
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters: 
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: listSocial
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
    app.get('/news', awaitErorrHandlerFactory(async (req, res, next) => {
        const params = req.query;
        const { id } = params
        const news_detail = await NewsDetail.findOne({
            raw: true,
            where: { id: id },
        });
        const category = await Category.findOne({
            raw: true,
            where: { id: news_detail.category_id },
        })
        res.render("single-post", {
            title: category.title,
            category_title: category.description,
            news_detail: news_detail,
            createdAt: moment(news_detail.createdAt).format('YYYY-MM-DD')
        })
    }));
};
