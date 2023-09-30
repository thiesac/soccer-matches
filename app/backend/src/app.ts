import * as express from 'express';
import * as cors from 'cors';
import TeamRouter from './routes/team.router';
import LoginRouter from './routes/login.router';
import MatchRouter from './routes/match.router';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(
      cors({
        origin: '*',
      }),
    );

    this.config();

    this.app.use('/teams', TeamRouter);
    this.app.use('/login', LoginRouter);
    this.app.use('/matches', MatchRouter);

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
