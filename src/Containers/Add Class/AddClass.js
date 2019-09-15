import React from 'react'
import { DenseAppBar, Paper, InputPage } from '../../Components'
import Grid from '@material-ui/core/Grid';
import { MDBBtn } from 'mdbreact'
import './AddClass.css'
import { ExcelRenderer } from 'react-excel-renderer'
import firebaseApp from '../../Config/Firebase/Firebase';
import XLSX from 'xlsx';



class EditUI extends React.Component {
    constructor() {
        super()
        this.state = {
            disabled: true,
            className: '',
            classTime: '',
            classSection: '',
            batch: true,
            time: true
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
        let fileObj = event.target.files[0];
        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(res.cols)
                console.log(res.rows)
                // let data = res.rows
                // // data.splice(0, 1)

                // var students = []
                // for (var i = 0; i < data.length; i++) {
                //     var x = Object.assign({}, data[i])
                //     students.push(x)
                // }

                // this.setState({
                //     students
                // });
            }
        });


    }





createClass = async () => {
    let { className, classSection, classTime, students } = this.state
    let classObj = {
        className,
        classSection,
        classTime,
        students
    }
    await firebaseApp.firestore().collection("classes").add(classObj)

    this.setState(
        {
            disabled: true,
            className: '',
            classTime: '',
            classSection: '',
            batch: true,
            time: true
        }
    )

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
                        <InputPage disabled={this.state.time} value={this.state.classTime} onChange={this.classTime} name='Class Time' type='text' label='Class Time' hint="12:00 to 02:00" />
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