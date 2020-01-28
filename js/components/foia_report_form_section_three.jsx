import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FoiaTooltip from './foia_tooltip';


/**
 * README!: The assumption of this file is that it is a 'good enough'
 * holding place for the section two markup at the moment.  This should all be updated
 * as we break the markup into better components.
 */
class FoiaReportFormSectionThree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // @todo: should this be managed by one of the data stores? Existing store
      // and actions or new ones needed?
      selected: {},
    };

    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleSelectNone = this.handleSelectNone.bind(this);
  }

  setFiscalYearValue(fiscalYear, value) {
    const newValues = { ...this.state.selected };
    newValues[fiscalYear] = value;
    this.setState({ selected: newValues });
  }

  setAllFiscalYearValues(value = true) {
    const selected = [...this.props.fiscalYears]
      .reduce(
        (values, fiscalYear) => Object.assign(values, { [fiscalYear]: value }),
        {},
      );
    this.setState({ selected });
  }

  handleSelectAll(event) {
    this.setAllFiscalYearValues(true);
    event.preventDefault();
  }

  handleSelectNone(event) {
    this.setAllFiscalYearValues(false);
    event.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    // @todo: set state here?
  }

  render() {
    const { fiscalYears } = this.props;
    return (
      <div>
        <div className="form-group">
          <fieldset>
            <legend className="foia-header-blue-line--h2">
              3. Select Fiscal Years
              <FoiaTooltip text={'<p>Select a Fiscal Year to view the data for that year. You may select multiple years, or you may view all years of available data.</p>'} />
            </legend>
            <fieldset className="usa-fieldset-inputs">
              <legend className="usa-sr-only">Select Fiscal Years</legend>
              <ul className="usa-unstyled-list usa-grid checkbox-list">
                { fiscalYears.map(fiscalYear => (
                  <li className="usa-width-one-sixth" key={fiscalYear}>
                    <input
                      id={fiscalYear}
                      type="checkbox"
                      name={fiscalYear}
                      value={fiscalYear}
                      checked={this.state.selected[fiscalYear]}
                      onChange={this.handleChange}
                    />
                    <label htmlFor={fiscalYear}>{fiscalYear}</label>
                  </li>
                ))}
              </ul>
              <div className="form-group">
                <ul className="inline-list">
                  <li><a href="#" onClick={this.handleSelectAll}>Select All</a></li>
                  <li><a href="#" onClick={this.handleSelectNone}>Select None</a></li>
                </ul>
              </div>
            </fieldset>
          </fieldset>
        </div>
      </div>
    );
  }
}

FoiaReportFormSectionThree.propTypes = {
  fiscalYears: PropTypes.object,
};

FoiaReportFormSectionThree.defaultProps = {
  fiscalYears: {},
};

export default FoiaReportFormSectionThree;
