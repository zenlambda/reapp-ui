var React = require('react');
var Component = require('ui/component');
var Animated = require('ui/mixins/Animated');
var Union = require('lodash-node/modern/arrays/union');

module.exports = Component({
  name: 'Icon',

  mixins: [
    Animated
  ],

  getDefaultProps() {
    return {
      size: 32,
      color: 'currentColor',
      style: {},
      svgProps: {},
      titleBarAnimations: [{ source: 'viewList', animation: 'moveToRight' }]
    };
  },

  componentWillMount() {
    this.setupAnimations(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setupAnimations(nextProps);
  },

  setupAnimations(props) {
    if (props.isInTitleBar)
      props.animations = Union(props.animations || [], this.props.titleBarAnimations);
  },

  render() {
    var {
      size,
      name,
      color,
      stroke,
      shapeRendering,
      svgProps,
      ...props
    } = this.props;

    this.addStyles({
      color,
      width: size,
      height: size,
      overflow: 'hidden'
    });

    this.addStyles('svg', {
      width: size,
      height: size,
      shapeRendering: shapeRendering ? shapeRendering : 'initial',
      fill: 'currentColor'
    });

    var svgExtraProps = {
      viewBox: '0 0 64 64',
      fill: color
    };

    if (stroke) {
      Object.assign(svgExtraProps, {
        stroke: color,
        strokeWidth: stroke * 4, // were scaling down from 64 / 2
        strokeLinecap: 'round'
      });
    }

    return (
      <span {...this.componentProps()} {...props} style={this.getAnimation()}>
        <svg {...svgExtraProps} {...svgProps} {...this.componentProps('svg')}>
          <g dangerouslySetInnerHTML={{__html:
            '<use xlink:href="/assets/icons/svg/'+ name +'.svg#Layer_1"></use>'
          }} />
        </svg>
      </span>
    );
  }

});