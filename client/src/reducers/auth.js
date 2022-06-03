import { AUTH, LOGOUT, UPDATE_USER } from '../actions/constants'

const profileData = JSON.parse(localStorage.getItem('profile'))

const initialState = {
  authData: profileData,
  token: profileData?.token,
  profile: profileData?.userProfile,
  user: profileData?.result,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      // TODO: is this needed if moved to auth?
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      // console.log(action?.data)
      return {
        ...state,
        authData: action?.data,
        token: action?.data?.token,
        user: action?.data?.result,
        profile: action?.data?.userProfile,
      }

    case LOGOUT:
      localStorage.removeItem('profile')
      return { ...state, authData: null }

    case UPDATE_USER:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      // console.log(action?.data)
      return { ...state, authData: action?.data }

    default:
      return state
  }
}

export default authReducer
