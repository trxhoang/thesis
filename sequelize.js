import Sequelize from 'sequelize';
import CategoryModel from './models/category';
import NewsDetailModel from './models/news_details';

const sequelize = new Sequelize({
  database: 'testing',
  username: 'admin',
  password: '1234',
  dialect: 'mysql',
  dialectOptions: {
    useUTC: false, //for reading from database
      dateStrings: true,
        typeCast: function (field, next) { // for reading from database
          if (field.type === 'DATETIME') {
            return field.string()
          }
          return next()
        },
  }
});

export const Category = CategoryModel(sequelize, Sequelize);
export const NewsDetail = NewsDetailModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  console.log('Users db and user table have been created');
});