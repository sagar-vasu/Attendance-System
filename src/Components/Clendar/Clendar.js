import React from 'react'
import './Clendar.css'
import { clendar } from '../../Config/Functions/Functions'
import Grid from "@material-ui/core/Grid";


export default class Clendar extends React.Component {

    constructor() {
        super()
        this.state = {
            currentDate: '',
            month: '',
            year: ''
        }
    }

    componentDidMount() {
        let data = clendar()
        this.setState({
            currentDate: data.date,
            month: data.month,
            year: data.year,
            allDays: data.allDays
        })
    }

    render() {
        let { year, currentDate, month, allDays } = this.state
        return (
            // <div>
            <Grid container justify="center" spacing={2}>
                <Grid item xs={12} sm={12} md={8} lg={12}>
                    <div id="clendar" >
                        <div className="month">
                            <ul>
                                <li className="prev">&#10094;</li>
                                <li className="next">&#10095;</li>
                                <li id="month">
                                    {month}
                                </li>
                                <span className='year' id="year">{year}</span>

                            </ul>
                        </div>

                        <ul className="weekdays">
                            <li>Sun</li>
                            <li>Mon</li>
                            <li>Tue</li>
                            <li>Wed</li>
                            <li>Thu</li>
                            <li>Friday</li>
                            <li>Sat</li>
                        </ul>
                        <ul className="days">
                            {allDays && allDays.map((val, ind) => {
                                return currentDate === val ? <li key={ind} style={{ backgroundColor: '#212121', color: 'white' }} >{val}</li> : <li key={ind}>{val}</li>
                            })}
                        </ul>
                    </div>


                </Grid>
            </Grid>

        )
    }

}