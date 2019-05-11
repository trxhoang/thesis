


import loginUser from './loginUser'
import registerUser from './registerUser'
import forgotPassword from './forgotPassword'
import resetPassword from './resetPassword'
import updatePassword from './updatePassword'
import updatePasswordViaEmail from './updatePasswordViaEmail'
import findUsers from './findUsers'
import deleteUser from './deleteUser'
import updateUser from './updateUser'

export default (app) => {
    loginUser(app)
    registerUser(app)
    forgotPassword(app)
    resetPassword(app)
    updatePassword(app)
    updatePasswordViaEmail(app)
    findUsers(app)
    deleteUser(app)
    updateUser(app)
}