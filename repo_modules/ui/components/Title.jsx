var React = require('react');
var Component = require('ui/component');

module.exports = Component({
  name: 'Title',

  render() {
    var { children, ...props } = this.props;

    return (
      <h3 {...this.componentProps()} {...props}>
        {children}
      </h3>
    );
  }
});