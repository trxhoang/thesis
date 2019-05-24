/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import _ from 'lodash'
import passport from 'passport';
import { NewsDetail } from '../../sequelize';
import Sequelize from 'sequelize';
import utils from '../../utils'

/**
 * @swagger
 * /insertNews:
 *   post:
 *     tags:
 *       - News
 *     name: insertNews
 *     summary: insert List News
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             uuid:
 *               type: string
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             body:
 *               type: string
 *             image_link:
 *               type: string
 *             pub_date:
 *               type: string
 *             source_link: 
 *               type: string
 *     responses:
 *       '200':
 *         description: News created
 *       '403':
 *         description: News already taken
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
    app.post('/insertNews', awaitErorrHandlerFactory(async (req, res) => {
        const params = req.body;
        const body = params.body;

        const news_existed = await NewsDetail.findOne({
            where: { uuid: params.uuid }
        });
        if (news_existed !== null) {
            res.status(200).send(news_existed);
            return null;
        };
        const against = params.title;
        const getListNewsSearch = await NewsDetail.findAll({
            raw: true,
            where: Sequelize.literal('MATCH (title, description) AGAINST (:name IN NATURAL LANGUAGE MODE)'),
            replacements: {
                name: against
            },
            limit: 5,
            order: [
                ['id', 'DESC'],
            ],
        });

        const bodyText = utils.removeTagHtml(body);
        const arrayPercent = _.map(getListNewsSearch, news => {
            const bodyTextNews = utils.removeTagHtml(news.body);
            return utils.similarity(bodyText, bodyTextNews);
        });
        const haveSimilarNews = _.some(arrayPercent, percent => percent > 0.8);
        console.log("TCL: haveSimilarNews", _.max(arrayPercent))
        if (!haveSimilarNews) {
            const news_insert = await NewsDetail.create({
                uuid: params.uuid,
                title: params.title,
                description: params.description,
                body: params.body,
                image_link: params.image_link,
                source_link: params.source_link,
                category_id: params.category_id
            });
            res.status(200).send(news_insert);
            return null
        };
        res.status(200).send({ results: `Similar News are similar ${Math.round(_.max(arrayPercent) * 10000) / 100}` });
        return null
    }));
};
