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
    app.get('/contact', (req, res, next) => {
        res.render("contact")
    });
};
