/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import { Category, NewsDetail } from '../../sequelize';

/**
 * @swagger
 * /listNewsInCategory:
 *   get:
 *     tags:
 *       - News
 *     name: listNewsInCategory
 *     summary: listNewsInCategory
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: category_title
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: list News
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
    app.get('/listNewsInCategory', awaitErorrHandlerFactory(async (req, res, next) => {
        const params = req.query;
        const { category_title } = params;
        const list_news = await NewsDetail.findAll({ limit: 2 });
        res.status(200).send([ ...list_news ]);
    }));
};
