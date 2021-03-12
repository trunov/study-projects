import {createConnection, getConnection} from 'typeorm';

export const connection = {
  async create(){
    await createConnection();
  },

  async close(){
    await getConnection().close(); 
  },

//   async clear(){
//     const connection = getConnection();
//     console.log(connection.options.entities)
//     const entities = connection.entityMetadatas;
//     console.log("entities: " + entities);

//     entities.forEach(async (entity) => {
//       const repository = connection.getRepository(entity.name);
//       console.log(repository)
//       await repository.query(`DELETE FROM ${entity.tableName}`);
//     });
//   },
};