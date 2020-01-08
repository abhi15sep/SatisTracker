import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// General imports
import RegisterForm from './RegisterForm';
import Header from './Header';

// Dashboard imports
import Dashboard from './dashboard/Dashboard';
import EditSchedule from './dashboard/editschedule/EditSchedule';

import * as api from '../api';

// Main app starting point
class App extends Component {
	state = {
		user_id: '',
		isLoggedIn: false,
		user_data: {},
		today: new Date()
	};

	componentDidMount() {
		api.authUser().then((resp) => {
			if (resp.id) {
				this.setState({
					user_id: resp.id,
					isLoggedIn: true
				});

				// Days of the week array to check if the user works on the current day
				let days_of_week = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];

				// Fetch user data after their ID is retreived
				api
					.fetchUser(resp.id)
					.then((resp) => {
						this.setState({
							user_data: {
								user_id: this.state.user_id,
								username: resp.user.username,
								work_start_hour: resp.user.work_start_hour,
								work_end_hour: resp.user.work_end_hour,
								last_schedule_edit: resp.user.last_schedule_edit,
								last_report_date: resp.user.last_report_date,
								work_days: resp.user.work_days,
								reporting_streak: resp.user.reporting_streak,
								days_tracked: resp.user.days_tracked
							},
							user_works_today: resp.user.work_days[days_of_week[this.state.today.getDay()]]
						});
					})
					.catch(console.error);
			} else {
				this.setState({
					isLoggedIn: false
				});
			}
		});
	}

	// Use diffrent Routes for react based on if the user is authenticated
	render() {
		return (
			<Router>
				{this.state.user_data.user_id && (
					<Header isLoggedIn={this.state.isLoggedIn} username={this.state.user_data.username} />
				)}
				{this.state.user_data.user_id ? (
					<Switch>
						<Route
							path="/users/dashboard"
							exact
							render={(props) => (
								<Dashboard
									{...props}
									user_data={this.state.user_data}
									user_works_today={this.state.user_works_today}
								/>
							)}
						/>
						<Route
							path="/users/editschedule"
							exact
							render={(props) => <EditSchedule {...props} user_data={this.state.user_data} />}
						/>
					</Switch>
				) : (
					<Switch>
						<Route path="/users/register" exact component={RegisterForm} />
					</Switch>
				)}
			</Router>
		);
	}
}

export default App;
