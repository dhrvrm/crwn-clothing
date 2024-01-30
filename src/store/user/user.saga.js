import { takeLatest, all, call, put } from "redux-saga/effects";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInGooglePopup,
} from "../../utils/firebase/firebase.utils";
import { USER_ACTION_TYPES } from "./user.types";
import { signInFailed, signInSuccess } from "./user.action";

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}
export function* onSignUpSuccess() {
  yield takeLatest(
    USER_ACTION_TYPES.SIGN_UP_SUCCESS,
    signInWithEmailAndPassword
  );
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
      );
      yield put(USER_ACTION_TYPES.SIGN_IN_SUCCESS, signInAfterSignUp)
    } catch (error) {}
  }
  export function* signInAfterSignUp( { payload: { user, additionalInformation }} ) {}
  
  export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInGooglePopup);
    yield call(getSnapshotFromAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    signInWithEmailAndPassword
  );
}

export function* signInWithEmailAndPassword({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* getSnapshotFromAuth(userAuth, additionalInformation) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInformation
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {}
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* onCheckCurrentUser() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onCheckCurrentUser),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
  ]);
}
