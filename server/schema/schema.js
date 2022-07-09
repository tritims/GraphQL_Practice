import { graphql, resolveObjMapThunk } from "graphql";
import { GraphQLObjectType } from "graphql";
import { GraphQLString, GraphQLInt } from "graphql";
import { GraphQLSchema } from "graphql";
import _ from "lodash";

// dummy data
var books = [
    { name: 'wings of fire', genre: 'biopic', id: '1', authorid: '1'},
    { name: 'losig my virginity', genre : 'nonficton', id: '2', authorid: '2'},
    { name: 'finding my virginity', genre: 'nonficion', id: '3', authorid: '3'}
]

const authors =  [
    {name: 'Patrick Rothfuss', age: 44, id:"1"},
    {name: 'Brandon Sanderson', age: 42, id:"2"},
    {name: 'Terry Pratchett', age: 66, id:"3"},
  ]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorid})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                return _.find(authors, {id: args.id})
            }
        }
    }
})

const schema = new GraphQLSchema({
    query: RootQuery
})
export {schema}

