import app from './app';
import { setTimeZone } from './middlewares/dbTimezone';

async function main(){

  await app.listen(8000);
  console.log('Server on port 8000');
  setTimeZone("+0000")
}

main();