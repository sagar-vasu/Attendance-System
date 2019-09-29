import React from 'react'
import { DenseAppBar, List } from '../../Components'
import Grid from '@material-ui/core/Grid';
import './EditClass.css'
import firebaseApp from '../../Config/Firebase/Firebase';



class EditUi extends React.Component {

    render() {
        let title = ['Class Name','Class Section','Class Time','Edit Class', 'Delete Class']
        return (
            <div>
                <Grid justify='center' container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={10}>
                        <List data={this.props.data} heading={title}  />
                    </Grid>
                </Grid>
            </div>
        )
    }
}


class EditClass extends React.Component {

    constructor() {
        super()
        this.state = {
            allClasses: []
        }
    }

   async componentDidMount() {

    
        let { allClasses } = this.state
       await firebaseApp.firestore().collection('classes').get().then(res => {
            res.forEach(doc => {
                let id = doc.id
                let data = doc.data()
                data.id=id
                allClasses.push(data)
                this.setState({
                    allClasses
                })
            })
        })
    }

    render() {
        return (
            <div>
                <DenseAppBar name="Delete Class" component={<EditUi data= {this.state.allClasses} />} />
            </div>
        )
    }
}

export default EditClass