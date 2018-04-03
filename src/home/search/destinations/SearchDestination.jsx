import {lowerCase, isEmpty} from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Async} from 'react-select';

class SearchDestination extends Component {
  constructor() {
    super();

    this.state = {
      typedValue: '',
    };

    this.getOptions = this.getOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(selectedOption) {
    let {handleChange, getGIDonChange} = this.props;
    this.props.updateLocationsList(selectedOption);
    handleChange && handleChange(selectedOption.label);
    getGIDonChange && this.props.initiateGetDestination(selectedOption.label);
  }

  handleBlur(e) {
    if(this.searchBox && this.searchBox.state.options && this.searchBox.state.options.length){
      let selectedOption = this.searchBox.state.options[0];
      let {handleChange, getGIDonChange} = this.props;
      this.props.updateLocationsList(selectedOption);
      handleChange && handleChange(selectedOption.label);
      getGIDonChange && this.props.initiateGetDestination(selectedOption.label);
    }
  }

  getOptions(input, callback) {
    let options = "";
    const {locationsList} = this.props;

    if (input.length > 0) {
      let searchString = input.toLowerCase().trim();
      options = locationsList.filter(function (d) {
        let label = lowerCase(d.label);
        return label.match(lowerCase(searchString));
      });
    } else {
      options = "";
    }
    return (
      callback(null, {
        options: options.slice(0, 5)
      })
    );
  }

  render() {
    const {searchedLocation, noResultsText, placeholder} = this.props;

    return (
      <Async
        ref={(ref) => this.searchBox = ref}
        className="city-selector"
        autoload={false}
        clearable={false}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={isEmpty(searchedLocation) ? null : searchedLocation}
        loadOptions={this.getOptions}
        placeholder={placeholder || 'Destination or Listing ID'}
        loadingPlaceholder={'Searching...'}
        searchPromptText={null}
        onBlurResetsInput={false}
        noResultsText={noResultsText}
      />
    );
  }
}

SearchDestination.propTypes = {
  history: PropTypes.object,
  handleChange: PropTypes.func,
  getGIDonChange: PropTypes.bool,
  placeholder: PropTypes.string,
  searchedLocation: PropTypes.object,
  locationsList: PropTypes.array.isRequired,
  noResultsText: PropTypes.string.isRequired,
  updateLocationsList: PropTypes.func.isRequired,
  initiateGetDestination: PropTypes.func.isRequired,
};

export default SearchDestination;
