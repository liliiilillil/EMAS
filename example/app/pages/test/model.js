
export default {
  namespace: 'test',
  state: {
    count: 1,
  },
  effects: {
    * addCount({ payload: { newCount } }, { put }) {
      yield put({ type: 'putData', payload: { count: newCount } })
    },
  },
  reducers: {
    putData(state, action) {
      return { ...state, ...action.payload }
    },
  },
}
