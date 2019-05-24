


import insertNews from './insertNews'
// import listNewsRecent from './listNewsRecent'
import listNewsInCategory from './listNewsInCategory'
import checkNewExisted from './checkNewExisted'


export default (app) => {
    checkNewExisted(app)
    insertNews(app)
    listNewsInCategory(app)
}