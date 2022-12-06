/**
 * Base class for all entities that are part of communication to/from services.
 */
export interface IEntity {
  id?: string | undefined;
  userid?: string | undefined;

  // constructor(values: any) {
  //   this.id = values ? values.id : undefined
  //   this.userid = values ? values.userid : undefined
  // }
}
