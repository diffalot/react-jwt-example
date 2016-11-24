import authSaga from './auth/sagas'
import profileSaga from './profile/sagas'

export default function (middleware) {
  middleware.run(authSaga)
  middleware.run(profileSaga)
}
