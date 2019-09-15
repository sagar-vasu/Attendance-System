import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import firebaseApp from '../../Config/Firebase/Firebase';
import Grid from '@material-ui/core/Grid';



class Table extends React.Component {
  constructor() {
    super()
    this.state = {
      allClasses: [],
      name:'snackbar'
    }
  }
  componentDidMount() {
    this.setState({ allClasses: this.props.data })
  }


  editClass = (val, i) => {
    // this.props.path2.history.push('/edit-product', { data: val })
    alert(i)
  }


  deleteClass = (val, i) => {
    let { allClasses } = this.state
    firebaseApp.firestore().collection('classes').doc(val.id).delete().then(
      allClasses.splice(i, 1)
    )
    this.setState({
   
  })
  setTimeout(()=>{ this.setState({name:'snackbar'}) }, 3000);
    this.setState({
      allClasses,
      name:'show',
      message :"Class Deleted Succesfully"
    })
  }


  render() {
    return (
      <div>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} sm={11} lg={12} >

            <table className="table table-hover table-fixed">

              <thead>
                <tr>
                  <th>#</th>
                  <th>{this.props.heading[0]}</th>
                  <th>{this.props.heading[1]}</th>
                  <th>{this.props.heading[2]}</th>
                  <th>{this.props.heading[3]}</th>
                  <th>{this.props.heading[4]}</th>
                </tr>
              </thead>

              <tbody>
                {this.state.allClasses.map((val, ind) => {
                  return <tr key={ind}>
                    <th scope="row" >{ind}</th>
                    <td>{val.className}</td>
                    <td>{val.classSection}</td>
                    <td>{val.classTime}</td>
                    <td><EditIcon onClick={() => this.editClass(val, ind)} /></td>
                    <td><DeleteIcon onClick={() => this.deleteClass(val, ind)} /></td>
                  </tr>
                })
                }


              </tbody>

            </table>
            <div id="snackbar"  className={this.state.name}>{this.state.message}</div>

          </Grid>
        </Grid>




      </div>

    )
  }
}


export default Table