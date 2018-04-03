import {connect} from 'react-redux';

import AdThingsToDo from './AdThingsToDo.jsx';
import {initiateGetHomeTodo, getTodos} from './todo.action';
import {
  countAdClick
} from 'common/ads.action';

const mapStateToProps = state => ({
  todos: state.home.todo.todoList,
  count: state.home.todo.count,
  isFetching: state.home.todo.isFetching,
});

const mapDispatchToProps = dispatch => ({
  initiateGetHomeTodo: (payload) => dispatch(initiateGetHomeTodo(payload)),
  getTodos: (payload) => dispatch(getTodos(payload)),
  countAdClick: (adId) => countAdClick(adId)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdThingsToDo);
