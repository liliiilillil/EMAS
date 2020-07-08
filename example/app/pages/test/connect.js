import { connect } from 'dva-no-router'
import Test from './index'

function mapStateToProps(state) {
  return {
    count: state.test.count,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCount: newCount => dispatch({ type: 'test/addCount', payload: { newCount } }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Test)