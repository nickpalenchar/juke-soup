import { ORM } from './orm';

const QuarrySchema = {
  leader: String,
  name: String,
  queue: [],
  phrase: String,
  created: Object, // Date TODO date validation?
  currentTrack: Object,
  startedAt: Object, // Date
  isPlaying: Boolean
}

const Quarry = ORM.model('Quarry', QuarrySchema);
Quarry.preCreate((quarry) => {
  quarry.queue = []
  quarry.created = new Date();
});

export default Quarry;
