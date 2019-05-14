/* eslint-disable no-console */
// import passport from 'passport';
import { Category } from '../../sequelize';

/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categories
 *     name: Find user
 *     summary: Finds a user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: A single user object
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: JWT token and username from client don't match
 */
module.exports = (app) => {

    app.get('/categories', (req, res) => {
        console.log('1')
        res.status(200).json('recovery email sent');
    });

};
