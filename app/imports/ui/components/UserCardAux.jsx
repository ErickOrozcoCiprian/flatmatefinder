import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import { UserData } from '../../api/data/Data';
import DataText from './DataText';
import { sleepIntToString } from '../../utils/Utils';

const UserCardAux = ({ user, userData }) => (

  <Card style={{ width: '18rem', background: '#586266' }} className="landing-card">
    <Card.Img style={{ borderRadius: '50%', width: '70%', padding: '15px' }} src={user.pfp} alt="profile picture" className="mx-auto" />
    <Card.Body>
      <Card.Title className="text-center">{user.name}</Card.Title>
      <Card.Subtitle />
      <ListGroup variant="flush" style={{ height: '100px', overflowY: 'scroll', maxHeight: '100px', overflowX: 'hidden' }}>
        <ListGroup.Item>Sex: {user.sex === 0 ? 'Male' : user.sex === 1 ? 'Female' : 'Other'}</ListGroup.Item>
        <ListGroup.Item>Alcohol: {user.alcohol ? ' True' : ' False'}</ListGroup.Item>
        <ListGroup.Item>Sleep Time: {sleepIntToString(user.sleep)}</ListGroup.Item>
        {userData.map((data) => {
          if (data.data_type !== 'contact') {
            return <DataText key={data._id} data={data} />;
          }
          return '';
        })}
        {userData.map((data) => {
          if (data.data_type === 'contact') {
            return <DataText key={data._id} data={data} />;
          }
          return '';
        })}
        {/* All this did was make it so that all of their information loads first, and then the contact information. */}
      </ListGroup>
      <Card.Text />
      <a href="/profile" className="btn btn-secondary" role="button" id="button">Edit Profile</a>

    </Card.Body>
  </Card>
);

UserCardAux.propTypes = {
  user: PropTypes.shape({
    pfp: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.string,
    alcohol: PropTypes.bool,
    alcohol_preferences: PropTypes.bool,
    sleep: PropTypes.number,
    sleep_preferences: PropTypes.number,
    sex: PropTypes.number,
    sex_preference: PropTypes.number,
  }).isRequired,
  userData: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    if (!UserData.test(propValue[key])) {
      return new Error(
        `Invalid prop \`${propFullName}\` supplied to` +
                ` \`${componentName}\`. Validation failed.`,
      );
    }
    return true;
  }).isRequired,
};

export default UserCardAux;
