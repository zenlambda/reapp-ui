var Component = require('ui/component');
var TweenState = require('react-tween-state');
var Icon = require('ui/components/Icon');
var Animated = require('ui/mixins/Animated');

module.exports = Component({
  name: 'RotatingComponent',

  mixins: [
    Animated,
    TweenState.Mixin
  ],

  getDefaultProps() {
    return {
      animations: [{ animation: 'rotate' }]
    };
  },

  getInitialState() {
    return {
      step: 0,
      index: 1
    };
  },

  componentWillMount() {
    this.startRotate(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.startRotate(nextProps);
  },

  startRotate(props) {
    if (props.rotate && !this.state.isRotating) {
      this.setState({ step: 0, isRotating: true });
      this.rotate();
    }
  },

  rotate() {
    this.tweenState('step', {
      easing: TweenState.easingTypes.linear,
      endValue: 1,
      duration: 1000,
      onEnd: () => {
        this.setState({ step: 0 });

        if (this.props.rotate)
          this.rotate();
        else
          this.setState({ isRotating: false });
      }
    });
  },

  render() {
    return (
      <div style={this.getAnimation()}>
        {this.props.children}
      </div>
    );
  }

});