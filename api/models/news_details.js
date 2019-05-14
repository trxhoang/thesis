/* eslint-disable indent */
/**
 * @swagger
 * definitions:
 *   news_details:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       uuid:
 *         type: string
 *       category_id:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       body:
 *         type: string
 *       image_link:
 *         type: string
 *       source_link:
 *         type: string
 *       pub_date:
 *         type: string
 *         format: date-time
 *       required:
 *         - email
 *         - username
 *         - password
 */

module.exports = (sequelize, type) => sequelize.define('news_details', {
    id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: type.STRING,
        allowNull: false,
    },
    category_id: type.INTEGER,
    title: {
        type: type.STRING,
        allowNull: false,
    },
    description: {
        type: type.STRING,
        allowNull: false,
    },
    body: {
        type: type.STRING,
        allowNull: false,
    },
    image_link: {
        type: type.STRING,
    },
    source_link: {
        type: type.STRING,
    },
    pub_date: {
        type: type.STRING
    }
});
