/* eslint-disable indent */
/**
 * @swagger
 * definitions:
 *   Category:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: integer
 *       generator:
 *         type: string
 *       image_link:
 *         type: string
 */

module.exports = (sequelize, type) => sequelize.define('category', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: type.STRING,
  description: type.STRING,
  generator: {
    type: type.STRING,
  },
  generator_link: {
    type: type.STRING,
  },
  image_link: {
    type: type.STRING,
  },
});
