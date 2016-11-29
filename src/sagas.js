import authSaga    from './features/auth/sagas'
import profileSaga from './features/profile/sagas'

export default function (sagaMiddleware) {
  sagaMiddleware.run(authSaga)
  sagaMiddleware.run(profileSaga)
}
