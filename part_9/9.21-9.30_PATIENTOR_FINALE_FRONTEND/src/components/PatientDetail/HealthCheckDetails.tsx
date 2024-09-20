import React from 'react';
import { HealthCheckEntry } from '../../types';
import HealthRatingBar from '../HealthRatingBar';

function HealthCheckDetails(entry: HealthCheckEntry) : React.JSX.Element {
  return (
    <>
    <HealthRatingBar showText={true} rating={entry.healthCheckRating} />
    </>
  );
}

export default HealthCheckDetails;