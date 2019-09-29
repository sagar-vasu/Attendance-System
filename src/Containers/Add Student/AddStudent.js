import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper, InputPage, DenseAppBar, DropdownPage } from '../../Components'
import { MDBBtn } from 'mdbreact'
import firebaseApp from '../../Config/Firebase/Firebase'

class AddStudentUi extends React.Component {
    constructor() {
        super()
        this.state = {
            classesNames: [],
            classesSections: [],
            className: '',
            section: '',
            time: '',
            name1: 'snackbar',
            message: '',
            classesTimes: [],
            fatherValidate: true,
            rollValidate: true,
            clas: true,
            sec: true,
            tim: true,
            disbBtn: true,
            studentName: '',
            fatherName: '',
            rollNumber: ''

        }

    }

    async componentDidMount() {
        let { classesNames, classesSections, classesTimes } = this.state
        await firebaseApp.firestore().collection('classes').get().then(res => {
            res.forEach(doc => {
                let id = doc.id
                let data = doc.data()
                data.id = id
                classesNames.push(data.className)
                classesSections.push(data.classSection)
                classesTimes.push(data.classTime)
                this.setState({
                    classesNames,
                    classesSections,
                })

            })
        })
    }



    AddStudent = async () => {
        let { StudentName, FatherName, RollNum, className, section, time, } = this.state
        let obj = {
            attendance: {},
            data: {
                className,
                classTime: time,
                classSection: section,
                studentName: StudentName,
                fatherName: FatherName,
                rollNumber: RollNum
            }
        }
        var flag = false
        await firebaseApp.firestore().collection("classes").get().then(res => {
            res.forEach(doc => {
                let data = doc.data()
                if (`${data.className}-${data.classSection}` === `${this.state.className}-${this.state.section}` && data.classTime === this.state.time) {
                    flag = true

                }
                else {
                    this.setState({
                        message: 'Sorry Class Not Found',
                        name1: 'show',
                        number: ''
                    })
                    setTimeout(() => { this.setState({ name1: 'snackbar' }) }, 3000)

                }

            })

        })

        if (flag === true) {

            if (RollNum === undefined) {
                this.setState({
                    message: 'Enter Roll Number ',
                    name1: 'show',
                    number: ''
                })

            }
            else {
                await firebaseApp.firestore().collection(`${this.state.className}-${this.state.section}`).doc(`${RollNum}`).set(obj).then(
                    this.setState({
                        message: 'Student Added Succesfully ✔️✔️',
                        name1: 'show',
                        number: ''
                    })
                )

                firebaseApp.firestore().collection('classes').where('className', "==", className).get().then(res => {
                    res.forEach(doc => {
                        let data = doc.data()
                        data.students = data.students + 1
                        firebaseApp.firestore().collection('classes').doc(doc.id).set(data)


                    })
                }
                )

                setTimeout(() => { this.setState({ name1: 'snackbar' }) }, 3000)

            }

        }


        this.setState({
            StudentName: '',
            FatherName: '',
            RollNum: '',
            className: '',
            section: '',
            time: '',
            clas: true,
            fatherValidate: true,
            rollValidate: true,
            sec: true,
            tim: true,
            disbBtn: true,

        })




    }


    render() {
        return (
            <div>
                <Grid justify='center' container spacing={4}>
                    <Grid item xs={11} md={8} lg={6}>

                        <Paper>
                            <InputPage type='text' label="Student Name" value={this.state.StudentName} onChange={(e) => this.setState({ StudentName: e.target.value, fatherValidate: false })} />
                            <InputPage type='text' label="Father Name" value={this.state.FatherName} disabled={this.state.fatherValidate} onChange={(e) => this.setState({ FatherName: e.target.value, rollValidate: false })} />
                            <InputPage type='number' label="Roll Number" value={this.state.RollNum} disabled={this.state.rollValidate} onChange={(e) => this.setState({ RollNum: e.target.value, clas: false })} />
                            <div style={{ marginBottom: '15px' }}>
                                <DropdownPage disabled={this.state.clas} onChange={(e) => this.setState({ className: e.target.value, sec: false })} list={this.state.classesNames} value={this.state.className} label='Select Class Name' />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <DropdownPage disabled={this.state.sec} onChange={(e) => this.setState({ section: e.target.value, tim: false })} list={this.state.classesSections} value={this.state.section} label='Select Class Section' />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <DropdownPage disabled={this.state.tim} onChange={(e) => this.setState({ time: e.target.value, disbBtn: false })} list={this.state.classesTimes} value={this.state.time} label='Select Class Time' />
                            </div>
                            <div className='mdbtn'>
                                <MDBBtn color="dark" disabled={this.state.disbBtn} className="mb-3" type="button" onClick={this.AddStudent} >
                                    Add Student
                                </MDBBtn>
                            </div>
                        </Paper>
                    </Grid>

                </Grid>

                <div id="snackbar" className={this.state.name1}>{this.state.message}</div>



            </div>
        );
    }
}


export default class AddStudent extends React.Component {
    render() {
        return (
            <div>
                <DenseAppBar name="Add Student" component={<AddStudentUi />} />
            </div>
        )
    }
}