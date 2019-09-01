import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Grommet } from 'grommet';
import { grommetTheme } from './GrommetStyle';
import { BookmarksList } from './BookmarkList';
import { BookmarkDetail } from './BookmarkDetail';

export default class Main extends Component {

    render(){
        return (
            <Grommet theme={grommetTheme}>
                <Grid
                   areas={[
                       { name: 'main', start: [0, 0], end: [0, 0] },
                       { name: 'detail', start: [1, 0], end: [1, 0] },
                       { name: 'foot', start: [0, 1], end: [1, 1] },
                   ]}
                   columns={['medium', 'flex']}
                   rows={['medium', 'xsmall']}
                   gap='small'
                >
            
                 <Box gridArea='main' background='color-primary-0'
                      overflow="scroll" pad="xxsmall"
                 >
                     <BookmarksList
                        bookmarks={this.props.data}
                        selectClick={this.props.selectClick}  />   
                </Box> 
                <Box
                    gridArea='detail' background='color-secondary-2-4'
                    overflow="scroll" pad="xsmall"
                    >
                        <BookmarkDetail detail={this.props.bookmarkData} />
                 </Box> 
                </Grid>
            </Grommet>
        )
    }
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object),
        bookmarkData: PropTypes.object,
        selectClick: PropTypes.func.isRequired,

    }
}
