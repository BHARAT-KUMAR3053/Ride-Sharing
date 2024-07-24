/* eslint-disable no-case-declarations */
import readline from 'readline';

import { Health } from '@ride-share/controllers/health/health';
import { checkForArguments } from '@ride-share/utils/utility-functions';
import { getBill, handleAddDriver, handleAddRider, handleMatch, startRide, stopRide } from '@ride-share/controllers/main/ride-share-controllers';

export class Server {


  public start(): void {
    //health check
    const health = new Health();
    health.health();
    this.createInputOutputInterface();
  }

  private createInputOutputInterface(){
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '> ',
    });

    rl.prompt();

    rl.on('line', (line) => {
      const input = line.trim().split(' ');

      const command = input[0].toUpperCase();
      const args = input.slice(1);

      switch (command) {
        case 'ADD_DRIVER':
          checkForArguments(args, 3);
          const [driverId, driver_xCoordinate, driver_yCoordinate] = args;
          handleAddDriver(driverId, driver_xCoordinate, driver_yCoordinate);
          break;
        case 'ADD_RIDER':
          checkForArguments(args, 3);
          const [riderId, rider_xCoordinate, rider_yCoordinate] = args;
          handleAddRider(riderId, rider_xCoordinate, rider_yCoordinate);
          break;
        case 'MATCH':
          checkForArguments(args, 1);
          const [match_riderId] = args;
          handleMatch(match_riderId);
          break;
        case 'START_RIDE':
          checkForArguments(args, 3);
          const [start_rideId, start_n, start_riderId] = args;
          startRide(start_rideId, start_n, start_riderId);
          break;
        case 'STOP_RIDE':
          checkForArguments(args, 4);
          const [
            stop_rideId,
            stop_xCoordinate,
            stop_yCoordinate,
            time_taken_in_minutes,
          ] = args;
          stopRide(
            stop_rideId,
            stop_xCoordinate,
            stop_yCoordinate,
            time_taken_in_minutes
          );
          break;
        case 'BILL':
          checkForArguments(args, 1);
          const [bill_rideId] = args;
          getBill(bill_rideId);
          break;
        default:
          console.log(`Unknown command: ${command}`);
          break;
      }

      rl.prompt();
    }).on('close', () => {
      console.log('Exiting the application');
      process.exit(0);
    });
  }

}
