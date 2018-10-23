import React from 'react';
import isEqual from 'lodash.isEqual';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import { Range } from 'rc-slider';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {},
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 8,
    borderBottom: 'solid 1px #aaa',
  },
  input: {
    width: '40px',
  },
  filter: {
    width: '60px',
  },
});

class CompoundItem extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state));
  }

  render() {
    const { classes, i, compounds, compound, compounds_fractions, compounds_checked, _onchange, _onchangefraction, onChageFilter } = this.props;

    return (
      <li className={classes.listSection}>
        <ul className={classes.ul}>
          <ListSubheader>
            <label htmlFor={`check-${compound}`} className={`check-${compound}`}><ListItemText primary={<Typography type="body2" style={{ color: 'blue' }}>{compound}</Typography>} /></label>
            <ListItemSecondaryAction>
              <Switch id={`check-${compound}`} color="primary" value={compound} onChange={_onchange} checked={compounds_checked !== -1} />
            </ListItemSecondaryAction>
          </ListSubheader>
          {(() => {
            if (compounds_fractions.x !== null) {
              return (
                <ListItem key={`list-${i}-x`}>
                  <input type="number" className={classes.input+' '+compound} onChange={_onchangefraction} name="xMin" step={compounds_fractions.x} min="0" max="100" value={compounds_fractions.xMin} />
                  <span>&nbsp;≦&nbsp;{compounds[compound].x}&nbsp;≦&nbsp;</span>
                  <input type="number" className={classes.input+' '+compound} onChange={_onchangefraction} name="xMax" step={compounds_fractions.x} min="0" max="100" value={compounds_fractions.xMax} />
                  &nbsp;step
                  <select name='x' className={classes.input+' '+compound} onChange={_onchangefraction}>
                    <option value="10">10</option>
                    <option value="1">1</option>
                  </select>
                </ListItem>
              )
            }
          })()}
          {(() => {
            if (compounds_fractions.x !== null) {
              return (
                <Range key={`list-${i}-rx`}
                  min={0}
                  max={100}
                  value={[compounds_fractions.xMin, compounds_fractions.xMax]}
                  step={compounds_fractions.x}
                  disabled={compounds_checked + 1 ? (false) : (true)}
                  onChange={e => _onchangefraction(e, compound, 'x')}
                />
              )
            }
          })()}
          {(() => {
            if (compounds_fractions.y !== null) {
              return (
                <ListItem key={`list-${i}-y`}>
                  <input type="number" className={classes.input+' '+compound} onChange={_onchangefraction} name="yMin" step={compounds_fractions.y} min="0" max="100" value={compounds_fractions.yMin} />
                  <span>&nbsp;≦&nbsp;{compounds[compound].y}&nbsp;≦&nbsp;</span>
                  <input type="number" className={classes.input+' '+compound} onChange={_onchangefraction} name="yMax" step={compounds_fractions.y} min="0" max="100" value={compounds_fractions.yMax} />
                  &nbsp;step
                  <select name='y' className={classes.input+' '+compound} onChange={_onchangefraction}>
                    <option value="10">10</option>
                    <option value="1">1</option>
                  </select>
                </ListItem>
              )
            }
          })()}
          {(() => {
            if (compounds_fractions.y !== null) {
              return (
                <Range key={`list-${i}-ry`}
                  min={0} max={100}
                  value={[compounds_fractions.yMin, compounds_fractions.yMax]}
                  step={compounds_fractions.y}
                  disabled={compounds_checked + 1 ? (false) : (true)}
                  onChange={e => _onchangefraction(e, compound, 'y')}
                />
              )
            }
          })()}
          {(() => {
            if (compounds_fractions.x !== null) {
              return [
                <ListItem key={`a-${i}`}>
                  <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, compound, 'a_min')} name="aMin" step={0.001} min={compounds_fractions.a_min.init} max={compounds_fractions.a_max.init} value={compounds_fractions.a_min.value} />
                  <span>&nbsp;≦&nbsp;{`a`}&nbsp;≦&nbsp;</span>
                  <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, compound, 'a_max')} name="aMax" step={0.001} min={compounds_fractions.a_min.init} max={compounds_fractions.a_max.init} value={compounds_fractions.a_max.value} />
                  <ListItemSecondaryAction>
                    <Checkbox checked={compounds_fractions.a_min.on} onChange={(e) => onChageFilter(e, compound, 'a_on')} value="a" color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>,
                <ListItem key={`m-${i}`}>
                  <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, compound, 'm_min')} name="mMin" step={0.001} value={compounds_fractions.m_min.value} />
                  <span>&nbsp;≦&nbsp;{`Δa`}&nbsp;≦&nbsp;</span>
                  <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, compound, 'm_max')} name="mMax" step={0.001} value={compounds_fractions.m_max.value} />
                  <ListItemSecondaryAction>
                    <Checkbox checked={compounds_fractions.m_min.on} onChange={(e) => onChageFilter(e, compound, 'm_on')} value="m" color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>,
                <ListItem key={`Eg-${i}`}>
                  <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, compound, 'Eg_min')} name="EgMin" step={0.001} min={compounds_fractions.Eg_min.init} max={compounds_fractions.Eg_max.init} value={compounds_fractions.Eg_min.value} />
                  <span>&nbsp;≦&nbsp;{`Eg`}&nbsp;≦&nbsp;</span>
                  <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, compound, 'Eg_max')} name="EgMax" step={0.001} min={compounds_fractions.Eg_min.init} max={compounds_fractions.Eg_max.init} value={compounds_fractions.Eg_max.value} />
                  <ListItemSecondaryAction>
                    <Checkbox checked={compounds_fractions.Eg_min.on} onChange={(e) => onChageFilter(e, compound, 'Eg_on')} value="Eg" color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>,
                <ListItem key={`CB-${i}`}>
                  <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, compound, 'CB_min')} name="CBMin" step={0.001} min={compounds_fractions.CB_min.init} max={compounds_fractions.CB_max.init} value={compounds_fractions.CB_min.value} />
                  <span>&nbsp;≦&nbsp;{`CB`}&nbsp;≦&nbsp;</span>
                  <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, compound, 'CB_max')} name="CBMax" step={0.001} min={compounds_fractions.CB_min.init} max={compounds_fractions.CB_max.init} value={compounds_fractions.CB_max.value} />
                  <ListItemSecondaryAction>
                    <Checkbox checked={compounds_fractions.CB_min.on} onChange={(e) => onChageFilter(e, compound, 'CB_on')} value="CB" color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>,
                <ListItem key={`VB-${i}`}>
                  <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, compound, 'VB_min')} name="VBMin" step={0.001} min={compounds_fractions.VB_min.init} max={compounds_fractions.VB_max.init} value={compounds_fractions.VB_min.value} />
                  <span>&nbsp;≦&nbsp;{`VB`}&nbsp;≦&nbsp;</span>
                  <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, compound, 'VB_max')} name="VBMax" step={0.001} min={compounds_fractions.VB_min.init} max={compounds_fractions.VB_max.init} value={compounds_fractions.VB_max.value} />
                  <ListItemSecondaryAction>
                    <Checkbox checked={compounds_fractions.VB_min.on} onChange={(e) => onChageFilter(e, compound, 'VB_on')} value="VB" color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>,
                <ListItem key={`direct-${i}`}>
                  <ListItemText primary={`direct only`} />
                  <ListItemSecondaryAction>
                    <Checkbox checked={compounds_fractions.direct_only.on} onChange={(e) => onChageFilter(e, compound, 'direct')} value="d" color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>,
                <ListItem key={`indirect-${i}`}>
                  <ListItemText primary={`indirect only`} />
                  <ListItemSecondaryAction>
                    <Checkbox checked={compounds_fractions.indirect_only.on} onChange={(e) => onChageFilter(e, compound, 'indirect')} value="id" color="primary" />
                  </ListItemSecondaryAction>
                </ListItem>
              ]
            }
          })()}

        </ul>
      </li>
    );
  }
}

CompoundItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompoundItem);
