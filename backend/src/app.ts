import express, { NextFunction, Request, Response } from 'express';
import { dot } from 'node:test/reporters';
const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Backend!');
});
app.all("*",(req:Request,res:Response,next:NextFunction)=>{
   const err = new Error(`Can't find ${req.originalUrl} on this server`) as any;
   res.status(404).json({
      message:"Page not found"
   })
   next(err);
})
export default app;