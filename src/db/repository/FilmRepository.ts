// eslint-disable-next-line no-unused-vars, import/no-unresolved
import { Dictionary } from 'express-serve-static-core';
import { Repository, EntityRepository } from 'typeorm';
import { validate } from 'class-validator';
import { APIUtil } from '../../utils';
import Film from '../entity/Film';
import Actor from '../entity/Actor';

@EntityRepository(Film)
export default class FilmRepository extends Repository<Film> {
  async createFromBody(body: Dictionary<string>): Promise<Film> {
    const film: Film = this.create(body);

    if (body.actors) {
      film.actors = Object.keys(body.actors).map((key: string) => {
        const actor: Actor = new Actor();
        actor.id = parseInt(body.actors[parseInt(key, 10)], 10);
        return actor;
      });
    }

    const errors = await validate(film);
    return new Promise((resolve, reject) => {
      if (errors.length > 0) {
        reject(APIUtil.pruneValidationError(errors));
      } else {
        resolve(film);
      }
    });
  }
}
