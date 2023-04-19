import { appConfig } from './config/variables.js'
import app from './config/express.js';
import { connectMongoDB } from './config/mongoose.js';

// open mongoose connection
await connectMongoDB()




// listen to requests
app.listen(appConfig.port, () => console.info(`server started on port ${appConfig.port} (${appConfig.env})`));

/**
 * Exports express
 * @public
 */
export default app;

