import React from 'react';
import { pure } from 'recompose';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import StocksTable from './StocksTable.js';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function CategoriesList(props) {
  const { categories, stocksList } = props;
  const classes = useStyles();

  return (
    <div>
      {
        categories.slice(0, 5).map((row, index) => {
          return (
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>{row.CategoryName}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                  {
                      stocksList.length > index && 
                      <StocksTable stocks={stocksList[index]} />
                  }
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })
      }
    </div>
  );

}

export default pure(CategoriesList);