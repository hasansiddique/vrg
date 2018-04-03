import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

class Pagination extends PureComponent {
  render() {
    const {styles} = this.props;

    return (
      <div style={styles} className="center clearfix">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={<a href="javascript:void(0)">...</a>}
          breakClassName={"break-me"}
          pageCount={this.props.pageCount}
          marginPagesDisplayed={this.props.marginPagesDisplayed}
          pageRangeDisplayed={this.props.pageRangeDisplayed}
          onPageChange={this.props.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          forcePage={this.props.forcePage}
          activeClassName={"active"}/>
      </div>
    );
  }
}

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  marginPagesDisplayed: PropTypes.number,
  pageRangeDisplayed: PropTypes.number,
  styles: PropTypes.object,
};

Pagination.defaultProps = {
  marginPagesDisplayed: 2,
  pageRangeDisplayed: 5
};

export default Pagination;
