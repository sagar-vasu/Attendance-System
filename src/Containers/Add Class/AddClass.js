import React from 'react'
import { DenseAppBar, Paper, InputPage } from '../../Components'
import Grid from '@material-ui/core/Grid';
import { MDBBtn } from 'mdbreact'
import './AddClass.css'
import firebaseApp from '../../Config/Firebase/Firebase';
import readXlsxFile from 'read-excel-file'


const schema = {
    'Roll': {
        prop: 'rollNumber',
        type: String,
    },
    'Name': {
        prop: 'studentName',
        type: String,
    },
    'Father': {
        prop: 'fatherName',
        type: String,
    },
}

class EditUI extends React.Component {
    constructor() {
        super()
        this.state = {
            disabled: true,
            className: '',
            classTime: '',
            classSection: '',
            batch: true,
            time: true,
            name1: 'snackbar',
            message: ''
        }
    }

    className = (e) => {
        this.setState({
            className: e.target.value,
            batch: false
        })
    }
    classSection = (e) => {
        this.setState({
            classSection: e.target.value,
            time: false
        })
    }

    classTime = (e) => {
        this.setState({
            classTime: e.target.value,
            disabled: false
        })
    }


    fileHandler = (event) => {
        readXlsxFile(event.target.files[0], { schema }).then(({ rows, errors }) => {
            let allStudents = []
            for (var i = 0; i < rows.length; i++) {
                allStudents.push(rows[i])
            }

            this.setState({
                students: allStudents
            })
        })

    }





    createClass = async () => {
        let { className, classSection, classTime, students } = this.state
        for (var i = 0; i < students.length; i++) {
            let rollNumber = students[i].rollNumber
            rollNumber.toString()
            students[i].className = className
            students[i].classTime = classTime
            students[i].classSection = classSection

            let data1 = {
                attendance: {},
                data: {
                    className: students[i].className,
                    classTime: students[i].classTime,
                    classSection: students[i].classSection,
                    studentName: students[i].studentName,
                    fatherName: students[i].fatherName,
                    rollNumber: students[i].rollNumber
                }
            }
            await firebaseApp.firestore().collection(`${className}-${classSection}`).doc(`${rollNumber}`).set(data1)
            console.log(data1, '==>list')
        }

        let classobj = {
            className,
            classTime,
            classSection,
            students: students.length-1
        }

        await firebaseApp.firestore().collection("classes").add(classobj)

        this.setState(
            {
                disabled: true,
                className: '',
                classTime: '',
                classSection: '',
                batch: true,
                time: true,
                name1: 'show',
                message: 'Class Added Succesfully 📝📝📝',
            }


        )
        setTimeout(() => { this.setState({ name1: 'snackbar' }) }, 3000);

    }



    render() {

        return (
            <div>
                <Grid justify='flex-end' container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={3}>
                        <div className="button-wrapper">
                            <span className="label">
                                Upload Excel File
                            </span>
                            <input type="file" onChange={this.fileHandler} name="upload" id="upload" className="upload-box" placeholder="Upload File" />
                        </div>
                    </Grid>

                </Grid>
                <Paper name='custom'>
                    <Grid justify='center' container spacing={4}>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <InputPage onChange={this.className} value={this.state.className} name='Class Name' type='text' label='Class Name' hint="enter class name" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <InputPage disabled={this.state.batch} value={this.state.classSection} onChange={this.classSection} name='Class Section' type='text' label='Class Batch' hint="enter class batch" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <InputPage disabled={this.state.time} value={this.state.classTime} onChange={this.classTime} name='Class Time' type='text' label='Class Time' hint="09:00 PM to 05:00 AM" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <div className='mdbtn'>
                                <MDBBtn color="dark" disabled={this.state.disabled} className="mb-3" type="button" onClick={this.createClass} >
                                    Create Class
                                </MDBBtn>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

                <div id="snackbar" className={this.state.name1}>{this.state.message}</div>


            </div>
        )
    }
}


class AddClass extends React.Component {

    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    render() {
        return (
            <div>
                <DenseAppBar name="Add Class" component={<EditUI />} />
            </div>
        )
    }
}

export default AddClass