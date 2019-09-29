import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper, InputPage, DenseAppBar, DropdownPage } from '../../Components'
import { MDBBtn } from 'mdbreact'
import firebaseApp from '../../Config/Firebase/Firebase'

class DeleteStudentUi extends React.Component {
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
            sec:true,
            rollValidate:true,
            disBtn:true

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



    RemoveStudent = async () => {
        let { RollNum, className, section, time, } = this.state


        await firebaseApp.firestore().collection(`${this.state.className}-${this.state.section}`).doc(`${RollNum}`).get().then(res => {
            if (res.data() === undefined) {
                this.setState({
                    message: 'Student Not Found',
                    name1: 'show',
                    number: ''
                })
            }
            else {
                firebaseApp.firestore().collection(`${this.state.className}-${this.state.section}`).doc(`${RollNum}`).delete()
                this.setState({
                    message: 'Student Remo️ved Succesfully',
                    name1: 'show',
                    number: ''
                })

                firebaseApp.firestore().collection('classes').where('className', "==", className).get().then(res => {
                    res.forEach(doc => {
                        let data = doc.data()
                        data.students = data.students - 1
                        firebaseApp.firestore().collection('classes').doc(doc.id).set(data)


                    })
                }
                )

            }
        })


        setTimeout(() => { this.setState({ name1: 'snackbar' }) }, 3000)

        this.setState({
            sec:true,
            className:'',
            section:'',
            rollValidate:'',
            disBtn:true,
        })

    }


    render() {
        return (
            <div>
                <Grid justify='center' container spacing={4}>
                    <Grid item xs={11} md={8} lg={6}>

                        <Paper>
                            <div style={{ marginBottom: '15px' }}>
                                <DropdownPage disabled={this.state.clas} value={this.state.className} onChange={(e) => this.setState({ className: e.target.value, sec: false })} list={this.state.classesNames} label='Select Class Name' />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <DropdownPage disabled={this.state.sec} value={this.state.section} onChange={(e) => this.setState({ section: e.target.value,rollValidate:false })} list={this.state.classesSections} label='Select Class Section' />
                            </div>
                            <InputPage value={this.state.RollNum} disabled={this.state.rollValidate} type='number' label="Roll Number" onChange={(e) => this.setState({ RollNum: e.target.value,disBtn:false })} />
                            <div className='mdbtn'>
                                <MDBBtn color="dark" disabled={this.state.disBtn} className="mb-3" type="button" onClick={this.RemoveStudent} >
                                    Delete Student
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


export default class DeleteStudent extends React.Component {
    render() {
        return (
            <div>
                <DenseAppBar name=' Delete Student' component={<DeleteStudentUi />} />
            </div>
        )
    }
}