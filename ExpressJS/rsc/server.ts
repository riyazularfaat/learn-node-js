import express, { type Application, type Request, type Response } from "express";
const app:Application = express()
const port = 5000

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    //   res.send('Express server is running.......')
    res.status(200).json({
        name: "Riyazul Arfaat",
        course: "Next Level development",
        email: "riyazularfaat@gmail.com"
    })

})
app.post('/', async(req: Request, res: Response) => {
    console.log(req.body)
})

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`)
})
