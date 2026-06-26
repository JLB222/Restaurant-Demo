import 'dotenv/config';
import express from 'express'
const App = express()
import cors from 'cors'

App.use(cors())
App.use(express.json());  //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
const PORT = process.env.SERVER_PORT || 4242

App.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// App.get("/menu", (req,res) => {
//     console.log("This should request the menu data from the database & send it to the user.")
// })
