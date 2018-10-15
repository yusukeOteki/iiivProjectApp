/*jshint esversion: 6 */
import React from 'react';
import isEqual from 'lodash.isEqual';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Label, LabelList, ReferenceLine, ReferenceArea, ResponsiveContainer } from 'recharts';
import { colors, compounds } from './index';

// Chart Tag
export default class SimpleScatterChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ReferenceLine_display: 0,
      ReferenceLine_y: 0,
      ReferenceLine_x: 0,
      clicks: []
    };
    this._onchangelineheight = this._onchangelineheight.bind(this);
    this._onchangelineheightonMarker = this._onchangelineheightonMarker.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state));
  }

  // Indicating a line func.
  _onchangelineheight(e) {
    (this.props.drag == 0 && e) && this.setState({ ReferenceLine_y: e.yValue, ReferenceLine_x: e.xValue, clicks: [] })

    let clicks = this.state.clicks.concat();
    clicks.push(new Date().getTime());
    this.setState(() => ({ clicks }));
    let timeout;
    let time = 600;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      let clicks = this.state.clicks;
      (clicks.length > 1 && clicks[clicks.length - 1] - clicks[clicks.length - 2] < time && e && e.yValue && e.xValue) &&
        this.setState({ ReferenceLine_y: '', ReferenceLine_x: '', drag: 0, clicks: [] })
    }, time);

  }

  // Indicating a tooltip func.
  renderTooltip(props) {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      const x = payload[0];
      return (
        <div style={{ backgroundColor: '#fff', border: '1px solid #999', margin: 0, padding: 10 }}>
          <p>{x.payload.latex}</p>
          <p>{x.name}: {x.payload.a} A</p>
          {x.payload.a === x.payload.p ? '' : <p>Lattice mismatch: {parseInt(x.payload.p * 100000, 10) / 100000} %</p>}
          <p>Eg: {x.payload.Eg} eV</p>
          <p>CB: {x.payload.CB} eV</p>
          <p>VB: {x.payload.VB} eV</p>
        </div>
      );
    }
  }

  _onchangelineheightonMarker(e) {
    this.setState({ ReferenceLine_y: e.node.y, ReferenceLine_x: e.node.x, clicks: [] })
  }

  render() {
    const { compound_raws, binaries_data, refAreaLeft, refAreaRight, drag, cursorPosition, left, right, bottom, top, xlabel, ylabel, zoom, _onchangeleft, _onchangeright, _getCursorPosition, filter } = this.props;
    return (
      <ResponsiveContainer height={900 * 2 / 3} width="100%">
        <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
          onClick={e => this._onchangelineheight(e) || _getCursorPosition(e)}
          onMouseDown={e => _onchangeleft(e)}
          onMouseMove={e => { e && (drag ? refAreaLeft && _onchangeright(e) : '') }}
          onMouseUp={e => zoom(this)}
        >
          <CartesianGrid />
          <XAxis dataKey={'p'} type="number" domain={[left, right]} name='lattice constant'>
            <Label value={`${xlabel}`} position="bottom" />
          </XAxis>
          <YAxis dataKey={ylabel} type="number" domain={[bottom, top]} name='energy'>
            <Label value={`${ylabel} [eV]`} position='left' textAnchor='middle' angle={-90} />
          </YAxis>
          <ZAxis range={[50]} />
          {Object.keys(compound_raws).map((compound, i) => {
            return !(compound_raws[compound].length > 0) ? '' :
              <Scatter name='compounds_scatter' key={`compound-${i}`} data={compound_raws[compound]} fill={colors[Object.keys(compounds).indexOf(compound_raws[compound][0].compound)]} shape={compound_raws[compound][0].direct ? "circle" : "triangle"} onMouseUp={e => this._onchangelineheightonMarker(e)} />
          })}
          {binaries_data.map((binary, i) => {
            return (
              <Scatter name='binaries_scatter' key={`binary-${i}`} data={[binary]} shape={binary.direct ? "circle" : "triangle"} onMouseUp={e => this._onchangelineheightonMarker(e)} >
                <LabelList dataKey='latex' position='top' />
              </Scatter>
            )
          })}
          {
            !(refAreaLeft && refAreaRight && drag) ? null :
              (<ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />)
          }
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={this.renderTooltip} />
          <ReferenceLine y={this.state.ReferenceLine_y} stroke={this.state.ReferenceLine_y ? "black" : ""} />
          <ReferenceLine x={this.state.ReferenceLine_x} stroke={this.state.ReferenceLine_x ? "black" : ""} />
        </ScatterChart>
      </ResponsiveContainer>
    )
  }
}