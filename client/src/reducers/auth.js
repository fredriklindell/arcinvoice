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
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return {
        ...state,
        authData: action?.data,
        token: action?.data?.token,
        user: action?.data?.result,
        profile: action?.data?.userProfile,
      }

    case LOGOUT:
      localStorage.removeItem('profile')
      return {
        ...state,
        authData: null,
        token: null,
        user: null,
        profile: null,
      }

    case UPDATE_USER:
      const currentStoredProfile = JSON.parse(localStorage.getItem('profile'))
      localStorage.setItem(
        'profile',
        JSON.stringify({ ...currentStoredProfile, result: action?.payload })
      )
      return {
        ...state,
        user: action?.payload,
      }

    default:
      return state
  }
}

export default authReducer
