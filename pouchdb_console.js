import PouchDB from 'pouchdb';
import util from 'util';

const db = new PouchDB('http://localhost:4984/db/');
const getAllDocs = () => (
  db.allDocs({
    include_docs: true,
    attachments: true,
  }).then((result) => {
    console.log('\x1Bc');
    console.log(util.inspect(result.rows, false, null));
  }).catch((err) => {
    console.log(err);
  })
);

getAllDocs();

db.changes({
  since: 'now',
  live: true,
  include_docs: true,
}).on('change', () => {
  // handle change
  getAllDocs();
});
