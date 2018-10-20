/*jshint esversion: 6 */
import React from 'react';
import isEqual from 'lodash.isEqual';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { GridPaper, CompoundItem, compounds } from './index';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 700,
  },
});

class CompoundLists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      compoundList: Object.keys(compounds)
    }

    this.search = this.search.bind(this);
    this.shaping = this.shaping.bind(this);
    this.sorting = this.sorting.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state));
  }

  search(e) {
    this.setState({ compoundList: e.target.value !== '' ? this.shaping(Object.keys(compounds), this.sorting(e.target.value)) : Object.keys(compounds) })
  }

  shaping(original, elementListText) {
    return original
      .map(item => [item, elementListText.filter(e => item.match(e)).length + (elementListText.join('') === this.sorting(item).join('') ? 10 : 0)])
      .sort((a, b) => a[1] < b[1] ? 1 : -1)
      .map(i => i[0]);
  }

  sorting(text) {
    const elements = ['Al', 'Ga', 'In', 'As', 'Sb', 'P'];
    let matched = [];
    let position = 0;
    for (let i = 1; i < text.length + 1; i++) {
      let result = elements.filter(e => e.toLowerCase() === text.slice(position, i).toLowerCase());
      if (result.length) {
        matched.push(result[0]);
        position = i;
      }
    }
    return matched.filter((x, i, s) => s.indexOf(x) === i).sort();
  }

  render() {
    const { classes, compounds_fractions, compounds_checked, _onchange, _onchangefraction, onChageFilter } = this.props;
    const { compoundList } = this.state;

    return (
      <GridPaper xs={12}>
        <input onChange={this.search} />
        <List className={classes.root} subheader={<li />}>
          {compoundList.map((compound, i) =>
            <CompoundItem key={`section-${compound}`} i={i} classes={classes} compounds={compounds} compound={compound} compounds_fractions={compounds_fractions[compound]} compounds_checked={compounds_checked.indexOf(compound)} _onchange={_onchange} _onchangefraction={_onchangefraction} onChageFilter={onChageFilter} />
          )}
        </List>
      </GridPaper>
    )
  }
}

CompoundLists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CompoundLists);