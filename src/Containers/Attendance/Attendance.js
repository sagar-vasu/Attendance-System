import React from 'react'
import { DenseAppBar, Paper, DropdownPage } from '../../Components'
import Grid from '@material-ui/core/Grid';
import { MDBFormInline, MDBBtn   } from 'mdbreact'
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
            sec:true,
            tim:true,
            start:true
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

        firebaseApp.firestore().collection("classes").where('className', "==", this.state.class)
            .where('classSection', "==", this.state.section).
            where("classTime", "==", this.state.time).get().then(res => {
                res.forEach(doc => {
                    let data = doc.data()
                    this.setState({
                        allStudents : data.students,
                        disabled:false,
                        sec:true,
                        tim:true,
                        start:true

                    })
                })
        })

    }
    


    search = ()=>{
       let { allStudents, number} = this.state
    
       console.log(allStudents)
       console.log(Object.keys(allStudents));

    //    for(var key in allStudents){
    //        var x  = 0
    //        console.log(allStudents)
    //     //    switch(allStudents[key]){
    //     //        case  number :

    //     //    }
    //    }
    }


    render() {
        return (
            <div>
                <Paper>
                    <Grid justify='center' container spacing={4}>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                            <DropdownPage onChange={(e) => this.setState({ class: e.target.value,sec:false })} list={this.state.classesNames} label='Select Class Name' />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                            <DropdownPage disabled={this.state.sec} onChange={(e) => this.setState({ section: e.target.value,tim:false })} list={this.state.classesSections} label='Select Class Section' />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                            <DropdownPage disabled={this.state.tim} onChange={(e) => this.setState({ time: e.target.value,start:false })} list={this.state.classesTime} label='Select Class Time' />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3}>
                            <div className='mdbtn'>
                                <MDBBtn color="dark" disabled={this.state.start} className="mb-3" type="button" onClick={this.getClass} >
                                    Start Attendance
                                </MDBBtn>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper>
                    <Grid container>
                        <Grid item xs={12} sm={12} lg={6}>
                            <div className="id-card-holder">
                                <div className="id-card">
                                    Name: <span>{this.state.name}</span>
                                    <div className="qr-code">
                                        <img src="https://www.shopify.com/growth-tools-assets/qr-code/shopify-faae7065b7b351d28495b345ed76096c03de28bac346deb1e85db632862fd0e4.png" alt='qr code' />
                                    </div>
                                    Father Name: <span>{this.state.fname}</span> <br />
                                    Roll Number: <span>{this.state.rollNum}</span>
                                    <hr />
                                    <p><strong>"PENGG"</strong>HOUSE,4th Floor, TC 11/729(4), Division Office Road </p>
                                    <p>Near PMG Junction, Thiruvananthapuram Kerala, India <strong>695033</strong></p>
                                    <p>Ph: 9446062493 | E-ail: info@onetikk.info</p>

                                </div>

                            </div>
                            <div className='searchbtn'>
                            <MDBFormInline className="md-form mr-auto m-0">
                                <input className="form-control mr-sm-2"  disabled={this.state.disabled} onChange={(e)=>this.setState({number:e.target.value})} type="number" placeholder="Search" aria-label="Search" />
                                <MDBBtn disabled={this.state.disabled}  onClick={this.search} color="dark" size="md" type="button" className="mr-auto">
                                    Search
                                </MDBBtn>
                            </MDBFormInline>

                            </div>

                        </Grid>



                        <Grid item xs={12} sm={12} lg={6}>

                        </Grid>
                    </Grid>
                </Paper>



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