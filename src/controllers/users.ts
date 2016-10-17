import { Next } from 'restify'
import { InternalServerError, BadRequestError } from 'restify-errors'
import { Post, Get, Controller } from 'inversify-restify-utils';
import { injectable, inject } from 'inversify'
import { IDatabase } from 'pg-promise'
import { autobind } from 'core-decorators'

import { IController, ILogger, ILoggerFactory, IUserService, IReq, IRes } from '../interfaces'
import { API_BASE } from '../config/app-constants'
import __ from '../config/app-constants'
import Validate from '../validate'

@injectable()
@Controller(`${API_BASE}/users`)
class UsersController implements IController {
  @inject(__.UserService) userService: IUserService;
  @inject(__.Database) db: IDatabase;
  private logger: ILogger;

  constructor(@inject(__.LoggerFactory) LoggerFactory: ILoggerFactory) {
    this.logger = LoggerFactory.getLogger(this)
  }

  @Validate
  public async test(req: IReq, res: IRes, next: Next) {
    console.log('this', this)
  }

  @Get('/create')
  private async create(req: IReq, res: IRes, next: Next) {
    try {
      await this.db.users.create();
      res.send(200);
      return next()
    } catch (e) {
      next(new InternalServerError(e))
    }
  }

  @Get('/init')
  private async init(req: IReq, res: IRes, next: Next) {
    try {
      await this.db.users.init();
      res.send(200);
      return next()
    } catch (e) {
      next(new InternalServerError(e))
    }
  }

  @Get('/empty')
  private async empty(req: IReq, res: IRes, next: Next) {
    try {
      await this.db.users.empty();
      res.send(200);
      return next()
    } catch (e) {
      next(new InternalServerError(e))
    }
  }

  @Validate
  @Post('/authenticate')
  private async authenticate(req: IReq, res: IRes, next: Next) {
    const user = await this.userService.findByEmail(req.body.email)
    if (!user) {
      return next(new BadRequestError('User not found'))
    }
      
    const valid = await this.userService.authenticate.bind(this)(req.body.password, user.password);
    res.send(valid);
    return next()
  }
}

export default UsersController
