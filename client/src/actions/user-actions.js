import * as api from '../api/index'

import { FETCH_USERS, START_LOADING, END_LOADING, UPDATE_USER } from './constants'

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.fetchUsers()
    dispatch({ type: FETCH_USERS, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const updateUserName = (id, newUserName, openSnackbar) => async (dispatch) => {
  try {
    const { data } = await api.updateUserName(id, newUserName)

    dispatch({ type: UPDATE_USER, payload: data })
    openSnackbar('User\'s name successfully updated')
  } catch (error) {
    console.log(error)
  }
}
