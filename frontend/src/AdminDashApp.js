import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SurveyForm from "./SurveyApp";
import AdminDashboard from "./AdminDashboard"; 

function App() {
  const isAdmin = true; // Replace this with actual authentication check

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={SurveyForm} />
        <Route
          path="/admin"
          render={() => (isAdmin ? <AdminDashboard /> : <Redirect to="/" />)}
        />
      </Switch>
    </Router>
  );
}

export default App;
