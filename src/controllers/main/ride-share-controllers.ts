import {
  driverDetails,
  riderDetails,
  rideDetails,
  feasableDrivers,
} from '@ride-share/repository/repository';
import { calculateDistance, isValidCoordinate, sort } from '@ride-share/utils/utility-functions';

function handleAddDriver(driverId: string, xCoordinate: string, yCoordinate: string) {
  if (!isValidCoordinate(Number(xCoordinate)) || !isValidCoordinate(Number(yCoordinate))) {
    console.log(
      'Invalid coordinates. Please provide valid numbers for X and Y coordinates.'
    );
    return;
  }
  if (driverDetails[driverId]) {
    console.log(`Driver ${driverId} already exists.`);
    return;
  }
  driverDetails[driverId] = { xCoordinate, yCoordinate };
  console.log(
    `Driver ${driverId} added at coordinates (${xCoordinate}, ${yCoordinate}).`
  );
}

function handleAddRider(riderId: string, xCoordinate: string, yCoordinate: string) {
  if (!isValidCoordinate(Number(xCoordinate)) || !isValidCoordinate(Number(yCoordinate))) {
    console.log(
      'Invalid coordinates. Please provide valid numbers for X and Y coordinates.'
    );
    return;
  }
  if (riderDetails[riderId]) {
    console.log(`Rider ${riderId} already exists.`);
    return;
  }
  riderDetails[riderId] = { xCoordinate, yCoordinate };
  console.log(
    `Rider ${riderId} added at coordinates (${xCoordinate}, ${yCoordinate}).`
  );
}

function handleMatch(riderId: string) {
  if (!riderDetails[riderId]) {
    console.log(`Rider with ID ${riderId} not found`);
    return;
  }
  const { xCoordinate: rider_xCoordinate, yCoordinate: rider_yCoordinate } =
    riderDetails[riderId];
  const possibleDrivers: [string, number][] = [];
  for (const [key, value] of Object.entries(driverDetails)) {
    const distance = calculateDistance(
      rider_xCoordinate,
      rider_yCoordinate,
      value.xCoordinate,
      value.yCoordinate
    );
    if (distance <= 5) {
      possibleDrivers.push([key, distance]);
    }
  }

  sort(possibleDrivers);
  feasableDrivers.length = 0;

  for (const i of possibleDrivers) {
    feasableDrivers.push(i);
  }

  if (possibleDrivers.length > 0) {
    let drivers = 'DRIVERS_MATCHED ';
    for (const [key, ] of possibleDrivers) {
      drivers += `${key} `;
    }
    console.log(drivers.trim());
  } else {
    console.log('NO_DRIVERS_AVAILABLE');
  }
}

function startRide(ride_Id: string, n: string, rider_Id: string) {
  handleMatch(rider_Id);
  if (
    rideDetails[ride_Id] &&
    !(Number(n) >= 1 && Number(n) <= 5) &&
    feasableDrivers.length > Number(n) &&
    rideDetails[ride_Id]
  ) {
    console.log('INVALID_RIDE');
    return;
  }
  const driver_Id: string = feasableDrivers[Number(n) - 1][0];
  rideDetails[ride_Id] = {
    driverID: driver_Id,
    riderID: rider_Id,
    distance: feasableDrivers[Number(n) - 1][1],
    start_xCoordinate: Number(riderDetails[rider_Id].xCoordinate),
    start_yCoordinate: Number(riderDetails[rider_Id].yCoordinate),
    stop_xCoordinate: 0,
    stop_yCoordinate: 0,
    timeTaken: 0,
    status: true,
  };
  console.log(`RIDE_STARTED ${ride_Id}`);
}

function stopRide(ride_Id: string, xCoordinate: string, yCoordinate: string, time: string) {
  if (!riderDetails[ride_Id] && !rideDetails[ride_Id]?.status) {
    console.log('INVALID_RIDE');
    return;
  }
  rideDetails[ride_Id] = {
    ...rideDetails[ride_Id],
    status: false,
    stop_xCoordinate: Number(xCoordinate),
    stop_yCoordinate: Number(yCoordinate),
    timeTaken: Number(time),
  };
  console.log(`RIDE_STOPPED ${ride_Id}`);
}

function getBill(ride_Id: string) {
  if (!rideDetails[ride_Id]) {
    console.log('INVALID_RIDE');
    return;
  }
  if (rideDetails[ride_Id]?.status) {
    console.log('RIDE_NOT_COMPLETED');
  }
  const baseFare = 50;
  const farePerKm = 6.5;
  const farePerMin = 2;
  const distance: number = calculateDistance(
    rideDetails[ride_Id].start_xCoordinate,
    rideDetails[ride_Id].start_yCoordinate,
    rideDetails[ride_Id].stop_xCoordinate,
    rideDetails[ride_Id].stop_yCoordinate
  );
  const billAmount =
    (baseFare +
      distance * farePerKm +
      Number(rideDetails[ride_Id].timeTaken) * farePerMin) *
    1.2;
  console.log(
    `BILL ${ride_Id} ${rideDetails[ride_Id].driverID} ${Number(
      billAmount
    ).toFixed(2)}`
  );
}

export {
  handleAddDriver,
  handleAddRider,
  handleMatch,
  startRide,
  stopRide,
  getBill,
};
