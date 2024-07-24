export interface ICoordinates {
  xCoordinate: string;
  yCoordinate: string;
}

export interface IDriverDetails {
  [key: string]: ICoordinates;
}

interface RideDetail {
  driverID: string;
  riderID: string;
  distance: number;
  start_xCoordinate: number;
  start_yCoordinate: number;
  stop_xCoordinate: number;
  stop_yCoordinate: number;
  timeTaken: number;
  status: boolean;
}

export interface IRideDetails {
  [key: string]: RideDetail;
}
