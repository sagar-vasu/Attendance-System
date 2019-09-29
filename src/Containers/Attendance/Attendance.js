import React from 'react'
import { DenseAppBar, Paper, DropdownPage, InputPage } from '../../Components'
import Grid from '@material-ui/core/Grid';
import { MDBFormInline, MDBBtn } from 'mdbreact'
import firebaseApp from '../../Config/Firebase/Firebase';
import "./Attendance.css"


class AttendanceUi extends React.Component {
    constructor() {
        super()
        this.state = {
            disabled: true,
            classesNames: [],
            classesSections: [],
            classesTime: [],
            class: '',
            section: '',
            time: '',
            sec: true,
            tim: true,
            start: true,
            name: '',
            name1: 'snackbar',
            message: '',
            change: false,
            searchDisabled: true
        }
    }

    async componentDidMount() {
        let { classesNames, classesSections, classesTime } = this.state
        await firebaseApp.firestore().collection('classes').get().then(res => {
            res.forEach(doc => {
                let id = doc.id
                let data = doc.data()
                data.id = id
                classesNames.push(data.className)
                classesSections.push(data.classSection)
                classesTime.push(data.classTime)
                this.setState({
                    classesNames,
                    classesSections,
                    classesTime
                })

            })
        })
    }

    getClass = () => {
        var date = new Date();
        var currentTime = date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
        firebaseApp.firestore().collection(`${this.state.class}-${this.state.section}`).where("data.className", "==", this.state.class).where('data.classSection', "==", this.state.section).where("data.classTime", "==", this.state.time).get().then(res => {
            res.forEach(doc => {
                let data = doc.data()
                let time = data.data.classTime
                let startTime = time.slice(0, 8)
                let endTime = time.slice(12, 20)
                console.log(startTime, '<==>', endTime, '---', currentTime)
                if (currentTime <= startTime || currentTime >= endTime) {

                    this.setState({
                        name1: 'show',
                        message: 'Sorry Time is Over ⌛⌛⌛ ',
                        number: ''

                    })
                    setTimeout(() => { this.setState({ name1: 'snackbar' }) }, 3000);
                }
                else {
                    this.setState({
                        disabled: false,
                        sec: true,
                        tim: true,
                        start: true,
                        clas: true,
                        change: true,
                    })

                }


            })
        })


    }


    endAttendance = () => {
        this.setState({
            disabled: true,
            sec: true,
            tim: true,
            start: true,
            clas: false,
            change: false,
            class: '',
            section: '',
            time: ''
        })

    }


    search = async () => {
        let { number } = this.state
        var date = new Date();

        let months = [`January`, `Febuary`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `November`, `December`];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var saveDay = days[date.getDay()];
        var saveMonth = months[date.getMonth()]

        var currentTime = date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
        let today = date.toISOString().substring(0, 10);
        await firebaseApp.firestore().collection(`${this.state.class}-${this.state.section}`).doc(`${number}`).get().then(res => {
            if (res.data() === undefined) {
                this.setState({
                    name1: 'show',
                    message: 'Student Data Not Found ❌ ❌ ❌ ',
                    number: ''

                })
                setTimeout(() => { this.setState({ name1: 'snackbar' }) }, 3000);
            }
            else {
                var flag = false
                let student = res.data()
                Object.entries(student.attendance).map((itemArray) => {
                    if (itemArray[0] === today) {
                        flag = true
                    }
                })

                if (flag === true) {
                    this.setState({
                        name: student.data.studentName,
                        fname: student.data.fatherName,
                        rollNum: student.data.rollNumber,
                        message: 'Student Already marked ✔️',
                        name1: 'show',
                        number: ''
                    })
                    setTimeout(() => { this.setState({ name1: 'snackbar' }) }, 3000);

                }
                else {
                    console.log(student, 'dsid')
                    firebaseApp.firestore().collection(`${this.state.class}-${this.state.section}`).doc(`${number}`)
                        .set({ attendance: { [today]: { attendance: "present", time: currentTime, day: saveDay, month: saveMonth } } }, { merge: true })
                    this.setState({
                        name: student.data.studentName,
                        fname: student.data.fatherName,
                        rollNum: student.data.rollNumber,
                        message: 'Student marked Succesfully ✔️✔️✔️',
                        name1: 'show',
                        number: ''
                    })
                    setTimeout(() => { this.setState({ name1: 'snackbar' }) }, 3000);
                }

            }

        })

        this.setState({
            searchDisabled: true

        })

    }


    render() {
        return (
            <div>
                <Paper>
                    <Grid justify='center' container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                            <DropdownPage value={this.state.class} disabled={this.state.clas} onChange={(e) => this.setState({ class: e.target.value, sec: false })} list={this.state.classesNames} label='Select Class Name' />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                            <DropdownPage value={this.state.section} disabled={this.state.sec} onChange={(e) => this.setState({ section: e.target.value, tim: false })} list={this.state.classesSections} label='Select Class Section' />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                            <DropdownPage value={this.state.time} disabled={this.state.tim} onChange={(e) => this.setState({ time: e.target.value, start: false })} list={this.state.classesTime} label='Select Class Time' />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                            <div className='mdbtn'>
                                {
                                    this.state.change ?
                                        <MDBBtn color="dark" className="mb-3" type="button" onClick={this.endAttendance} >
                                            End Attendance
                                    </MDBBtn>
                                        :
                                        <MDBBtn color="dark" disabled={this.state.start} className="mb-3" type="button" onClick={this.getClass} >
                                            Start Attendance
                                    </MDBBtn>
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={6}>


                            <div id="card_box">

                                <div style={{ border: "2px solid #212121", padding: "20px" }}>

                                    {/* <img src="../images/Saylani-logo.png" style="vertical-align: text-top" width="25%" alt="" /> */}
                                    <p style={{ height: "40px", width: "100%", textAlign: "center", fontWeight: "bold", fontSize: '24px', color: "white", paddingBottom: '', backgroundColor: "#212121", paddingTop: " 10px" }}>
                                        Admit Card
                                    </p>
                                    <div id="form">
                                        <input type="text" value={this.state.name} disabled={true} name="Student Name" id="name" placeholder="Student Name" /> <br />
                                        <input type="text" value={this.state.fname} disabled={true} name="Father Name" id="fname" placeholder="Father Name" /> <br />
                                        <input type="text" value={this.state.className} disabled={true} name="Class" id="class" placeholder="Class" /> <br />
                                        <input type="text" value={this.state.rollNum} disabled={true} name="Batch" id="batch" placeholder="Batch" />
                                    </div>
                                    <img src="data:image/jpeg;base64,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" style={{ verticalAlign: "text-top" }} width="190" height="170px" alt="" />

                                </div>

                            </div>

                            <div className='searchbtn'>
                                <MDBFormInline className="md-form mr-auto m-0">
                                    <input className="form-control mr-sm-2" value={this.state.number} disabled={this.state.disabled} onChange={(e) => this.setState({ number: e.target.value, searchDisabled: false })} type="number" placeholder="Search" aria-label="Search" />
                                    <MDBBtn disabled={this.state.searchDisabled} onClick={this.search} color="dark" size="md" type="button" className="mr-auto">
                                        Search
                                    </MDBBtn>
                                </MDBFormInline>

                            </div>

                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>

                        </Grid>
                    </Grid>
                </Paper>


                <div id="snackbar" className={this.state.name1}>{this.state.message}</div>


            </div>
        )
    }
}


class Attendance extends React.Component {

    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    render() {
        return (
            <div>
                <DenseAppBar name="Attendance" component={<AttendanceUi />} />
            </div>
        )
    }
}

export default Attendance