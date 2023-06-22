const express = require('express')
require('dotenv').config()
const json = express.json();
const cors = require('cors')

const PORT = process.env.PORT || 2000
const app = express();

app.use(json)
app.use(cors())

require('./src/config/db')
const userRoutes = require('./src/routes/user.route')
const candidateRoutes = require('./src/routes/candidate.routes');
const votesRoutes = require('./src/routes/votes.routes');
const swagger = require('./swagger')

swagger(app);

app.get('/',(req,res) => {
    res.send('Welcome to backend tutorial')
})

app.use('/api/users',userRoutes)
app.use('/api/candidates', candidateRoutes)
app.use('/api/votes/',votesRoutes);

app.listen(PORT, function() {
    console.log(`app running on http://localhost:${PORT}`);
})