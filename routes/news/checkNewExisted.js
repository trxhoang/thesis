/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import _ from 'lodash'
import passport from 'passport';
import { NewsDetail } from '../../sequelize';
import Sequelize, { Op } from 'sequelize';
import utils from '../../utils'

/**
 * @swagger
 * /checkNewExisted:
 *   post:
 *     tags:
 *       - News
 *     name: checkNewExisted
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
 *             list_uuid:
 *               type: array
 *               items:
 *                 type: string
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
  app.post('/checkNewExisted', awaitErorrHandlerFactory(async (req, res) => {
    const params = req.body;
    const list_uuid = params.list_uuid;

    const list_news = await NewsDetail.findAll({
      raw: true,
      where: {
        uuid: {
          [Op.in]: list_uuid,
        },
      },
      attributes: ['uuid']
    });
    res.status(200).send(list_news.map(news=>news.uuid));
    return null
  }));
};
