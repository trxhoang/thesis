


import main from './main'
import listSocial from './listSocial'
import listSport from './listSport'
import listEntertainment from './listEntertainment'
import newsDetail from './newsDetail'
import contact from './contact'

export default (app) => {
    main(app)
    listSocial(app)
    listSport(app)
    listEntertainment(app)
    newsDetail(app)
    contact(app)
}