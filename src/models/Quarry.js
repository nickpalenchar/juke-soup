import { ORM } from './orm';

const QuarrySchema = {
  leader: String,
  queue: [],
  phrase: String,
  created: Object // Date TODO date validation?
}

const Quarry = ORM.model('Quarry', QuarrySchema);
Quarry.preCreate((quarry) => {
  quarry.queue = []
  quarry.created = new Date();
});

export default Quarry;
