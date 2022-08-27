const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require('graphql');

const Project = require('../models/Project');
const Client = require('../models/Client');

/* тип прожекта */
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.finById(parent.clientId);
      },
    },
  }),
});
/* тип клиента */
const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    projects: {
      type: new GraphQLList(ProjectType),
      resolve() {
        return Project.find(); /* забираю все проекты с монгоДБ и отправляю на фронт */
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(
          args.id,
        ); /* нахожу проект в монгоДб по айдишнику,который пришел с фронта */
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve() {
        return Client.find(); /* забираю всех клиентов с монгоДБ и отправляю на фронт */
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
