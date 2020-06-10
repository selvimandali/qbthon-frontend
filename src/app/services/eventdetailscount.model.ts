import { TypeCount} from '../services/typecount.model';
import { EventDetails } from '../services/eventdetails.model';
export class EventDetailsCount  {
    eventDetailsMap: Map<String,EventDetails[]>;
    count: TypeCount
}