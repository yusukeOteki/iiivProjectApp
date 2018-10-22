import React from 'react';
import isEqual from 'lodash.isEqual';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 700,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 8,
    borderBottom: 'solid 1px #aaa',
  },
  filter: {
    width: '60px',
  },
});

class Filter extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state));
  }

  render() {
    const { classes, filter, onChageFilter } = this.props;

    return (
      <List className={classes.root} subheader={<li />}>
        <ListSubheader>
          <label htmlFor={`filterList`} className={`filterList`}><ListItemText primary={'Entire filter'} /></label>
        </ListSubheader>
        <ul className={classes.ul}>
          <ListSubheader>
            <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, 'entire', 'a_min')} name="aMin" step={0.001} min={filter.a_min.init} max={filter.a_max.init} value={filter.a_min.value} />
            <span>&nbsp;≦&nbsp;{`a`}&nbsp;≦&nbsp;</span>
            <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, 'entire', 'a_max')} name="aMax" step={0.001} min={filter.a_min.init} max={filter.a_max.init} value={filter.a_max.value} />
            <ListItemSecondaryAction>
              <Switch id={`a`} color="primary" value={"a"} onChange={(e) => onChageFilter(e, 'entire', 'a_on')} checked={filter.a_min.on} />
            </ListItemSecondaryAction>
          </ListSubheader>
        </ul>
        <ul className={classes.ul}>
          <ListSubheader>
            <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, 'entire', 'm_min')} name="mMin" step={0.001} value={filter.m_min.value} />
            <span>&nbsp;≦&nbsp;{`Δa`}&nbsp;≦&nbsp;</span>
            <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, 'entire', 'm_max')} name="mMax" step={0.001} value={filter.m_max.value} />
            <ListItemSecondaryAction>
              <Switch id={`m`} color="primary" value={"m"} onChange={(e) => onChageFilter(e, 'entire', 'm_on')} checked={filter.m_min.on} />
            </ListItemSecondaryAction>
          </ListSubheader>
        </ul>
        <ul className={classes.ul}>
          <ListSubheader>
            <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, 'entire', 'Eg_min')} name="EgMin" step={0.001} min={filter.Eg_min.init} max={filter.Eg_max.init} value={filter.Eg_min.value} />
            <span>&nbsp;≦&nbsp;{`Eg`}&nbsp;≦&nbsp;</span>
            <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, 'entire', 'Eg_max')} name="EgMax" step={0.001} min={filter.Eg_min.init} max={filter.Eg_max.init} value={filter.Eg_max.value} />
            <ListItemSecondaryAction>
              <Switch id={`Eg`} color="primary" value={"Eg"} onChange={(e) => onChageFilter(e, 'entire', 'Eg_on')} checked={filter.Eg_min.on} />
            </ListItemSecondaryAction>
          </ListSubheader>
        </ul>
        <ul className={classes.ul}>
          <ListSubheader>
            <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, 'entire', 'CB_min')} name="CBMin" step={0.001} min={filter.CB_min.init} max={filter.CB_max.init} value={filter.CB_min.value} />
            <span>&nbsp;≦&nbsp;{`CB`}&nbsp;≦&nbsp;</span>
            <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, 'entire', 'CB_max')} name="CBMax" step={0.001} min={filter.CB_min.init} max={filter.CB_max.init} value={filter.CB_max.value} />
            <ListItemSecondaryAction>
              <Switch id={`CB`} color="primary" value={"CB"} onChange={(e) => onChageFilter(e, 'entire', 'CB_on')} checked={filter.CB_min.on} />
            </ListItemSecondaryAction>
          </ListSubheader>
        </ul>
        <ul className={classes.ul}>
          <ListSubheader>
            <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, 'entire', 'VB_min')} name="VBMin" step={0.001} min={filter.VB_min.init} max={filter.VB_max.init} value={filter.VB_min.value} />
            <span>&nbsp;≦&nbsp;{`VB`}&nbsp;≦&nbsp;</span>
            <input type="number" className={classes.filter} onChange={(e) => onChageFilter(e, 'entire', 'VB_max')} name="VBMax" step={0.001} min={filter.VB_min.init} max={filter.VB_max.init} value={filter.VB_max.value} />
            <ListItemSecondaryAction>
              <Switch id={`VB`} color="primary" value={"VB"} onChange={(e) => onChageFilter(e, 'entire', 'VB_on')} checked={filter.VB_min.on} />
            </ListItemSecondaryAction>
          </ListSubheader>
        </ul>
        <ul className={classes.ul}>
          <ListSubheader>
            <ListItemText primary={`direct only`} />
            <ListItemSecondaryAction>
              <Switch id={`direct`} color="primary" value={"direct"} onChange={(e) => onChageFilter(e, 'entire', 'direct')} checked={filter.direct_only.on} />
            </ListItemSecondaryAction>
          </ListSubheader>
        </ul>
        <ul className={classes.ul}>
          <ListSubheader>
            <ListItemText primary={`indirect only`} />
            <ListItemSecondaryAction>
              <Switch id={`indirect`} color="primary" value={"indirect"} onChange={(e) => onChageFilter(e, 'entire', 'indirect')} checked={filter.indirect_only.on} />
            </ListItemSecondaryAction>
          </ListSubheader>
        </ul>
      </List>
    );
  }
}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);
