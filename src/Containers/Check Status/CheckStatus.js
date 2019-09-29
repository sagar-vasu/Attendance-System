import React from 'react'
import { DenseAppBar, Paper, InputPage, DropdownPage, DropdownExampleMultipleSelection } from '../../Components'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import firebaseApp from '../../Config/Firebase/Firebase'
import { MDBBtn } from 'mdbreact'
import './CheckAttendance.css'




class CheckStatusUi extends React.Component {
    constructor() {
        super()
        this.state = {
            name1: '',
            classesNames: [],
            classesSections: [],
            message: '',
            alldata: [],
            present: 0,
            late: 0,
            className: '',
            section: '',
            Month: '',
            roll: true,
            sec: true,
            disBtn: true,
            mont: true

        }
    }

    async componentDidMount() {
        let { classesNames, classesSections } = this.state
        await firebaseApp.firestore().collection('classes').get().then(res => {
            res.forEach(doc => {
                let id = doc.id
                let data = doc.data()
                data.id = id
                classesNames.push(data.className)
                classesSections.push(data.classSection)
                this.setState({
                    classesNames,
                    classesSections,
                })

            })
        })
    }

    checkStatus = async () => {
        let { className, section, Month, RollNum, alldata, late, present } = this.state
        present=0
        late=0
        this.setState({
            present:0,
            late:0
        })

        if (RollNum === undefined) {
            this.setState({
                message: 'Enter Roll Number ',
                name1: 'show',
                number: ''
            })

        }
        else {
            await firebaseApp.firestore().collection(`${this.state.className}-${this.state.section}`).doc(`${RollNum}`).get().then(res => {
                if (res.data() === undefined) {
                    this.setState({
                        message: 'Student Data Not Found ',
                        name1: 'show',
                        number: ''
                    })
                    setTimeout(() => { this.setState({ name1: 'snackbar' }) }, 3000);

                }
                else {
                    let data = res.data().attendance
                    for (var key in data) {
                        data[key].date = key
                        if (data[key].month === Month) {
                            alldata = []
                            present=0
                            late=0
                            alldata.push(data[key])
                            switch(data[key].attendance){
                                case 'present' :  this.setState({ present: present + 1 })
                                break;
                                case 'late' :  this.setState({ late: late + 1 })
                                break
                                case '' : alert('sorry')
                                break
                                default : this.setState({late:0,present:present+0})
                            }
                           
                        }
                        else{
                                     
                            this.setState({
                                message: 'Record Not Available',
                                name1: 'show',
                                number: '',
                                present:0,
                                late:0,
                                alldata:[]
                            })
                            setTimeout(() => { this.setState({ name1: 'snackbar' }) }, 3000);
                        }


                        

                    }
                    this.setState({ data: alldata })
                }

            })
        }
        this.setState({
            RollNum: '',
            className: '',
            section: '',
            Month: '',
            disBtn: true,
            sec: true,
            roll: true,
            mont: true
        })

    }


    render() {
        return (
            <div>
                <Grid justify='center' container spacing={4}>
                    <Grid item xs={11} md={8} lg={6}>

                        <Paper>
                            <div style={{ marginBottom: '15px' }}>
                                <DropdownPage value={this.state.className} onChange={(e) => this.setState({ className: e.target.value, sec: false })} list={this.state.classesNames} label='Select Class Name' />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <DropdownPage value={this.state.section} disabled={this.state.sec} onChange={(e) => this.setState({ section: e.target.value, roll: false })} list={this.state.classesSections} label='Select Class Section' />
                            </div>
                            <InputPage className='input' value={this.state.RollNum} disabled={this.state.roll} type='number' label="Roll Number" onChange={(e) => this.setState({ RollNum: e.target.value, mont: false })} />
                            <div style={{ marginBottom: '25px' }}>
                                <DropdownPage value={this.state.Month} disabled={this.state.mont} onChange={(e) => this.setState({ Month: e.target.value, disBtn: false })} list={['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octamber', 'November', 'December']} label='Select Month' />
                                {/* <DropdownExampleMultipleSelection value={this.state.Month} onChange={(e) => console.log(e.target)} list={['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemeber', 'Octamber', 'November', 'December']} label='Select Month' /> */}
                            </div>
                            <div className='mdbtn'>
                                <MDBBtn color="dark" disabled={this.state.disBtn} className="mb-3" type="button" onClick={this.checkStatus} >
                                    Check Status
                                </MDBBtn>
                            </div>
                        </Paper>
                    </Grid>

                </Grid>
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper>
                            <Typography align='center' variant='h5'>Present</Typography>
                            <Typography align='center' variant='h5'> {this.state.present} </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <Paper>
                            <Typography align='center' variant='h5'>Late </Typography>
                            <Typography align='center' variant='h5'> {this.state.late} </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Paper>
                            <table className="table table-bordered table-responsive-md table-striped text-center">

                                <thead className="black white-text">
                                    <tr>
                                        <th>Date</th>
                                        <th className="text-center">Day</th>
                                        <th className="text-center">Time</th>
                                        <th className="text-center">Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.data ? this.state.data.map((val, ind) => {
                                            return <tr>
                                                <th scope="row" >{val.date}</th>
                                                <td>{val.day}</td>
                                                <td>{val.time}</td>
                                                <td>{val.attendance}</td>
                                            </tr>
                                        }) : ''
                                    }

                                </tbody>
                            </table>

                        </Paper>
                    </Grid>
                </Grid>
                <div id="snackbar" className={this.state.name1}>{this.state.message}</div>

            </div>
        )
    }
}


class CheckStatus extends React.Component {

    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    render() {
        return (
            <div>
                <DenseAppBar name="Check Status" component={<CheckStatusUi />} />
            </div>
        )
    }
}

export default CheckStatus