import { connect } from 'dva-no-router'
import Index from './index'

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


export default connect(mapStateToProps, mapDispatchToProps)(Index)