import {isEmpty} from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {BeatLoader} from 'react-spinners';
import { Link } from 'react-router-dom';
import Pagination from 'common/components/pagination';

import config from '../../../config';
import Todo from './partials/Todo.jsx';

class AdThingsToDo extends Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.limit =  this.props.maxRecords || 12;
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData(page = null){
    let {gId, maxRecords, recordCategory} = this.props;
    if(page){
      this.page = page.selected;
    }
    let promise = this.props.getTodos({
      "GID": gId,
      "adCategoryID": recordCategory,
      "maxRecords": this.limit,
      "startRow": (((this.page) * this.limit) + 1)
    });
  }

  render() {
    const {todos, isFetching, count, fullPage, countAdClick, gId} = this.props;
    let pageCount = Math.ceil(count/this.limit);
    let showAllUrl = '/advertisements/activities';
    if(gId){
      showAllUrl += '?gid=' + gId;
    }
    return (
      <div className={fullPage ? 'container' : ''}>  
        <section className="todo-list"
                 style={(isEmpty(todos) && !isFetching) ? {display: `none`} : {}}>
          <div className="container-fluid">
            <div className="">
              <div className="com-title">
                <h2><span>Things To Do</span></h2>
                <p>Explore some of the best things to do from around the world from our partners and friends.</p>
              </div>

              {isFetching ?
                  <div className="spinner-wrapper">
                    <BeatLoader
                      color={'#0074E1'}
                      loading={isFetching}
                    />
                    <span>Loading...</span>
                  </div>
                  :
                  <div className="dir-hli">
                    <ul>
                      {todos.map((todo, index) => {
                        let className = "col-md-2" + (index === 0 ? " col-md-offset-1 " : " ") + "col-sm-6 " + (index == 0 ? 'col-xs-12' : 'col-xs-6') + " col-medium-padding";
                        if(fullPage){
                          className = "col-md-3 col-sm-6 col-medium-padding";
                        }
                        return (
                          <li className={className}
                              key={index}>
                            <Todo 
                              todo={todo} 
                              adImagesBaseUrl={config.adImagesBaseUrl}
                              countAdClick={countAdClick} />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                }
                {(!isEmpty(todos) && !isFetching && count > 5 && !fullPage) && (
                  <div className="right col-md-offset-right-1">
                    <Link to={showAllUrl}><span className="show-all">Show All . . .</span></Link>
                  </div>
                )}
                {(() => {
                  if(fullPage){
                    return (
                      <div>
                        <Pagination
                          handlePageClick={this.getData}
                          pageRangeDisplayed={2}
                          marginPagesDisplayed={1}
                          pageCount={pageCount}
                          forcePage={this.page} />
                      </div>
                    );
                  }
                })()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

AdThingsToDo.propTypes = {
  todos: PropTypes.array,
  isFetching: PropTypes.bool,
  count: PropTypes.number.isRequired,
  gId: PropTypes.number.isRequired,
  recordCategory: PropTypes.number.isRequired,
  maxRecords: PropTypes.number.isRequired,
  initiateGetHomeTodo: PropTypes.func.isRequired,
};

AdThingsToDo.defaultProps = {
  fullPage: false
};

export default AdThingsToDo;
