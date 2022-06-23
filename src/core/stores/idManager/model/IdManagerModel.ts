import { ProvidersTypes } from '../../../types';

export default class IdManagerModel {
  constructor(
    public readonly id: string,
    public type: ProvidersTypes,
    public name?: string,
    public prevId?: string
  ) {}
}
