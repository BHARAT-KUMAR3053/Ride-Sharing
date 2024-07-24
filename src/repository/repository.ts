import { IDriverDetails, IRideDetails } from '@ride-share/controllers/main/interfaces';

const driverDetails: IDriverDetails = {} as IDriverDetails;
const riderDetails: IDriverDetails = {} as IDriverDetails;
const rideDetails: IRideDetails = {};
// eslint-disable-next-line prefer-const
let feasableDrivers: [string, number][] = [];

export { driverDetails, riderDetails, rideDetails, feasableDrivers };
