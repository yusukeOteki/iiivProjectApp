/*jshint esversion: 6 */
import React from 'react';
import isEqual from 'lodash.isEqual';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Label, LabelList, ReferenceLine, ReferenceArea, ResponsiveContainer } from 'recharts';
import { colors, compounds } from './index';

// Chart Tag
export default class SimpleScatterChart extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props);
  }

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

  render() {
    const { compound_raws, binaries_data, refAreaLeft, refAreaRight, drag, left, right, bottom, top, xlabel, ylabel, zoom, _onchangeleft, _onchangeright, _getCursorPosition, _onchangelineheight, _onchangelineheightonMarker, ReferenceLine_y, ReferenceLine_x } = this.props;
    return (
      <ResponsiveContainer height={900 * 2 / 3} width="100%">
        <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}
          onClick={e => _onchangelineheight(e) || _getCursorPosition(e)}
          onMouseDown={e => _onchangeleft(e)}
          onMouseMove={e => { e && (drag ? refAreaLeft && _onchangeright(e) : '') }}
          onMouseUp={zoom}
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
              <Scatter name='compounds_scatter' key={`compound-${i}`} data={compound_raws[compound]} fill={colors[Object.keys(compounds).indexOf(compound_raws[compound][0].compound)]} shape={compound_raws[compound][0].direct ? "circle" : "triangle"} onMouseUp={e => _onchangelineheightonMarker(e) || _getCursorPosition(e)} />
          })}
          {binaries_data.map((binary, i) => {
            return (
              <Scatter name='binaries_scatter' key={`binary-${i}`} data={[binary]} shape={binary.direct ? "circle" : "triangle"} onMouseUp={e => _onchangelineheightonMarker(e) || _getCursorPosition(e)} >
                <LabelList dataKey='latex' position='top' />
              </Scatter>
            )
          })}
          {
            !(refAreaLeft && refAreaRight && drag) ? null :
              (<ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />)
          }
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={this.renderTooltip} />
          <ReferenceLine y={ReferenceLine_y} stroke={ReferenceLine_y !== '' ? "black" : ""} />
          <ReferenceLine x={ReferenceLine_x} stroke={ReferenceLine_x !== '' ? "black" : ""} />
        </ScatterChart>
      </ResponsiveContainer>
    )
  }
}