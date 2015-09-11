import React from "react";
import _ from "underscore";
import { IntlMixin } from "react-intl";
import { FormattedMessage, FormattedHTMLMessage, FormattedNumber } from "react-intl";
import Intl from "intl";
import Config from "./Config";

var MessageComponent = React.createClass({
  mixins: [IntlMixin],

  getProps() {
    return _.extend(_.omit(this.props, 'messages', 'path', 'component'),
                    {message: this.getIntlMessage(this.props.path)});
  },

  render() {
    return React.createElement(this.props.component, this.getProps());
  }
});

class RestIntl {
  constructor(messages) {
    this.messages = messages;
  }

  msg(path, props = {}) {
    return <MessageComponent messages={this.messages}
                             path={path}
                             component={FormattedMessage}
                             {...props} />
  }

  htmlMsg(path, props = {}) {
    return <MessageComponent messages={this.messages}
                             path={path}
                             component={FormattedHTMLMessage}
                             {...props} />
  }

  number(value, props = {}) {
    return <FormattedNumber {...props} value={value} />
  }

  currency(value, currency, props = {}) {
    props.style = "currency"
    props.currency = currency;
    props = _.extend({
      locales: Config.get('currencyLocale') || Config.get('locale') ||
                 navigator.language || navigator.userLanguage,
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }, props);

    return Intl.NumberFormat(props.locales, props).format(value);
  }
}

module.exports = RestIntl;
