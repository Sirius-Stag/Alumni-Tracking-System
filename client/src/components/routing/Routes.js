import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';

import CollegeRegister from '../authcollege/CollegeRegister';
import CollegeLogin from '../authcollege/CollegeLogin';

import Alert from '../layout/Alert';
import Recommended from '../dashboard/Recommended'
import Dashboard from '../dashboard/Dashboard';
import CollegeDashboard from '../dashboard/CollegeDashboard';
import CollegeCreateProfile from '../profile-forms/CollegeCreateProfile';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import AddProject from '../profile-forms/AddProject';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import CollegeRoute from '../routing/CollegeRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/alumni/register' component={Register} />
        <Route exact path='/alumni/login' component={Login} />
        <Route exact path='/alumni/profiles' component={Profiles} />
        <Route exact path='/alumni/profile/:id' component={Profile} />

        <Route exact path='/college/register' component={CollegeRegister} />
        <Route exact path='/college/login' component={CollegeLogin} />

        
        <PrivateRoute exact path='/alumni/recommended' component={Recommended} />
        <PrivateRoute exact path='/alumni/dashboard' component={Dashboard} />
        <CollegeRoute exact path='/college/dashboard' component={CollegeDashboard} />
        <CollegeRoute exact path='/college/create-profile' component={CollegeCreateProfile} />
        <PrivateRoute exact path='/alumni/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/alumni/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/alumni/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/alumni/add-education' component={AddEducation} />
        <PrivateRoute exact path='/alumni/add-project' component={AddProject} />
        <PrivateRoute exact path='/alumni/posts' component={Posts} />
        <PrivateRoute exact path='/alumni/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
