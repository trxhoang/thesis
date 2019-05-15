


import insertNews from './insertNews'
// import listNewsRecent from './listNewsRecent'
import listNewsInCategory from './listNewsInCategory'


export default (app) => {
    insertNews(app)
    listNewsInCategory(app)
}