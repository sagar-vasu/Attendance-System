import React from 'react'
import { DenseAppBar, Paper, Clendar } from '../../Components'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import firebaseApp from '../../Config/Firebase/Firebase'



class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            totalStudents: 0,
            totalClass: 0,
            totalSection: 0
        }
    }

    async componentDidMount() {
        let { totalStudents, totalClass, totalSection } = this.state
        let totalS = 0
        await firebaseApp.firestore().collection("classes").get().then(res => {
            res.forEach(doc => {
                let data = doc.data()
                totalStudents = data.students

                if (data.className) {
                    totalClass = totalClass + 1
                }
                if (data.classSection) {
                    totalSection = totalSection + 1
                }
                totalS += totalStudents
                this.setState({
                    totalStudents: totalS,
                    totalClass,
                    totalSection
                })
            })
        })
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper>
                            <Typography align='center' variant='h5'> Total Students</Typography>
                            <Typography align='center' variant='h5'> {this.state.totalStudents} </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper>
                            <Typography align='center' variant='h5'> Total Classes</Typography>
                            <Typography align='center' variant='h5'> {this.state.totalClass} </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper>
                            <Typography align='center' variant='h5'> Total Sections</Typography>
                            <Typography align='center' variant='h5'>  {this.state.totalSection} </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper>
                            <Typography align='center' variant='h5'> Total Coursers</Typography>
                            <Typography align='center' variant='h5'> 08 </Typography>
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


class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    render() {
        return (
            <div>
                <DenseAppBar name="Dashboard" component={<Dashboard />} />
            </div>
        )
    }
}

export default Home