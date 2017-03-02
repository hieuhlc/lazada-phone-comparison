import React, { Component, PropTypes } from 'react';
import { Input, Icon, Label } from 'semantic-ui-react';
import { testUrl, parsePhoneData } from './utils';
import { crawl } from './apiClient';
import cheerio from 'cheerio';

export default class InputUrl extends Component {
  static propTypes = {
    setData: PropTypes.func.isRequired
  };

  _bouncing = null;

  state = {
    isValid: true,
    isFetching: false,
    isFetchError: false,
    isFetched: false,
    currentUrl: ''
  };

  startCrawl = () => {
    this._input.blur();
    this.setState({
      isFetching: true,
      isFetched: false,
      isFetchError: false
    });
    crawl(this.state.currentUrl).then(html => {
      const phoneData = parsePhoneData(cheerio.load(html));
      const phoneName = phoneData[0].value;
      this.props.setData(phoneData);
      this.setState({
        isFetching: false,
        isFetchError: false,
        isFetched: true,
        demoValue: phoneName
      });
    }).catch(err => {
      console.error(err);
      this.setState({
        isFetching: false,
        isFetchError: true
      });
    });
  }

  onChange = (e) => {
    const url = e.target.value.trim();
    if (!this.validInput(url)) {
      return;
    }
    this.setState({ currentUrl: url });
    // Add some delay
    clearTimeout(this._bouncing);
    this._bouncing = setTimeout(this.startCrawl, 400);
  }

  validInput = (url) => {
    const result = testUrl(url);
    const { isValid } = this.state
    if (result !== isValid) {
      this.setState({ isValid: result });
    }
    return result;
  }

  render() {
    const { isValid, isFetching, isFetchError, isFetched } = this.state;
    const contentReady = !isFetching && isFetched;
    const inputProps = {
      icon: true,
      fluid: true,
      error: (!isValid || isFetchError) && !isFetching,
      loading: isFetching,
      disabled: isFetching,
      placeholder: 'Input phone url',
      onChange: this.onChange
    }
    let iconElement;
    if (contentReady) {
      iconElement = <Icon name='check' color='green' />;
    } else if (isFetchError) {
      iconElement = <Icon name='refresh' color='green' link onClick={this.startCrawl} />
    } else {
      iconElement = <Icon name='mobile' color='blue' />;
    }
    return (
      <div>
        <Input {...inputProps}>
          <input ref={(input) => {this._input = input}} />
          {iconElement}
        </Input>
        {isFetchError && <Label basic color='red' pointing>Fetch content failed</Label>}
      </div>
    );
  }
}
