import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Grommet } from 'grommet';
import { grommetTheme } from './GrommetStyle';

export default class Main extends Component {
    render() {
        return (
            <Grommet theme={grommetTheme}>
                <Grid
                  areas={[
                      { name: 'main', start: [0, 0], end: [0, 0] },
                      { name: 'detail', start: [1, 0], end: [1, 0] },
                      { name: 'foot', start: [0, 1], end: [1, 1] },
                  ]}
                  columns={['medium', 'flex']}
                  rows={['large', 'xsmall']}
                  gap='small'
                  >
                    <Box gridArea='main' background='myColor'>
                        <div>{JSON.stringify(this.props.data)}</div>
                    </Box>
                  </Grid>
            </Grommet>
        )
    }
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
    }
}