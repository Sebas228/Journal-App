import { types } from "../../types/types";

const initialState = {
  loading: false,
  error: null
}

export const uiReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case types.uiSetError:
      return { ...state, error: payload }

    case types.uiRemoveError:
      return { ...state, error: null }

    case types.uiStartLoading:
      return { error: null, loading: true }

    case types.uiFinishLoading:
      return { ...state, loading: false }

    default:
      return state
  }

}