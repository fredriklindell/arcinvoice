import { AUTH, LOGOUT, UPDATE_USER, UPDATE_COMPANY } from '../actions/constants'

const profileData = JSON.parse(localStorage.getItem('profile'))

const initialState = {
  token: profileData?.token,
  user: profileData?.user,
  company: profileData?.company,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return {
        ...state,
        token: action?.data?.token,
        user: action?.data?.user,
        company: action?.data?.company,
      }

    case LOGOUT:
      localStorage.removeItem('profile')
      return {
        ...state,
        token: null,
        user: null,
      }

    case UPDATE_USER:
      const currentStoredProfile = JSON.parse(localStorage.getItem('profile'))
      localStorage.setItem(
        'profile',
        JSON.stringify({ ...currentStoredProfile, user: action?.payload })
      )
      return {
        ...state,
        user: action?.payload,
      }

    case UPDATE_COMPANY:
      if (action?.payload.isDefault) {
        const currentStoredProfile = JSON.parse(localStorage.getItem('profile'))
        localStorage.setItem(
          'profile',
          JSON.stringify({ ...currentStoredProfile, company: action?.payload })
        )
        return {
          ...state,
          company: action?.payload,
        }
      }
      return state

    default:
      return state
  }
}

export default authReducer
