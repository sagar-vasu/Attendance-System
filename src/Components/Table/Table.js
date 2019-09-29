import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import firebaseApp from '../../Config/Firebase/Firebase';
import Grid from '@material-ui/core/Grid';



class Table extends React.Component {
  constructor() {
    super()
    this.state = {
      allClasses: [],
      name: 'snackbar'
    }
  }
  componentDidMount() {
    this.setState({ allClasses: this.props.data })
  }




  deleteClass = (val, i) => {
    let { allClasses } = this.state
    firebaseApp.firestore().collection(`${val.className}-${val.classSection}`).get().then(res => {
      res.forEach(doc => {
        doc.data()
        firebaseApp.firestore().collection(`${val.className}-${val.classSection}`).doc(doc.id).delete()

      })
    })
    firebaseApp.firestore().collection('classes').doc(val.id).delete().then(
      allClasses.splice(i, 1)
    )
    this.setState({

    })
    setTimeout(() => { this.setState({ name: 'snackbar' }) }, 3000);
    this.setState({
      allClasses,
      name: 'show',
      message: "Class Deleted Succesfully"
    })
  }


  render() {
    return (
      <div>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} sm={12} lg={12} >

            <table className="table table-bordered table-responsive-md table-striped text-center">

              <thead>
                <tr>
                  <th>#</th>
                  <th className="text-center">{this.props.heading[0]}</th>
                  <th className="text-center">{this.props.heading[1]}</th>
                  <th className="text-center">{this.props.heading[2]}</th>
                  <th className="text-center">{this.props.heading[4]}</th>
                </tr>
              </thead>

              <tbody>
                {this.state.allClasses.map((val, ind) => {
                  return <tr key={ind}>
                    <th scope="row" >{ind}</th>
                    <td>{val.className}</td>
                    <td>{val.classSection}</td>
                    <td>{val.classTime}</td>
                    <td><DeleteIcon onClick={() => this.deleteClass(val, ind)} /></td>
                  </tr>
                })
                }


              </tbody>

            </table>
            <div id="snackbar" className={this.state.name}>{this.state.message}</div>

          </Grid>
        </Grid>




      </div>

    )
  }
}


export default Table