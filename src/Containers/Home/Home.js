import React from 'react'
import {DenseAppBar,Paper,Clendar} from '../../Components'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';



class Dashboard extends React.Component{
    constructor(){
        super()
        this.state={
            name:''
        }
    }

    render(){
        return(
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper>
                            <Typography align='center' variant='h5'> Total Students</Typography>
                            <Typography align='center' variant='h5'> 90 </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper>
                            <Typography align='center' variant='h5'> Total Classes</Typography>
                            <Typography align='center' variant='h5'> 10 </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper>
                            <Typography align='center' variant='h5'> Total Sections</Typography>
                            <Typography align='center' variant='h5'> 4 </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper>
                            <Typography align='center' variant='h5'> Total Coursers</Typography>
                            <Typography align='center' variant='h5'> 10 </Typography>
                        </Paper>
                    </Grid>


                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Clendar />
                    </Grid>


                </Grid>
            </div>
        )
    }
}


class Home extends React.Component{

    constructor(){
        super()
        this.state={
            name:''
        }
    }

    render(){
        return(
            <div>
                <DenseAppBar name="Dashboard" component={<Dashboard />} />
            </div>
        )
    }
}

export default Home