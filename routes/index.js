



import category from './category'
import user from './user'
import news from './news'
import clients from './clients'


export default (app) => {
    category(app)
    // user(app)
    news(app)
    clients(app)
}