const { gql } = require('apollo-server-express');

const typeDefs = gql`

	enum Provider {
		google
		facebook
	}

	type LotoTicket {
		id: ID
		createAt: Int
		lotoId: ID
		userId: ID
		numbers: [ Int ]
        complementary: [ Int ]
	}

	type Loto {
		id: ID
		createAt: Int
		title: String
		cost: Int
		imageUrl: String
		lotoNumbers: Int
		lotoComplementary: Int
		maxNumbers: Int
		maxComplementary: Int
		winner: ID
		tickets: [ ID ]
	}

	type Ticket {
		id: ID
		level: Int
		minCoins: Int
		maxCoins: Int
		scratchableBeforeUnlock: Int
		imageUrl: String
		imageFrontUrl: String
		imageBackUrl: String
		progressColor: String
	}

	type User {
		id: ID
		firstname: String
		lastname: String
		photoUrl: String
		email: String
		provider: Provider
		providerId: Provider
		coins: Int
		trees: Int
		adsViews: Int
		experience: Int
		lotos: [ LotoTicket ]!
	}

	type ScratchNumbers {
		numbers: [ Int ]!
		coins: Int!

	}

	input ParticipateLotoInput {
		lotoId: ID!
		userId: ID!
		numbers: [ Int ]!
        complementary: [ Int ]!
	}

	input SetTicketInput {
		level: Int
		minCoins: Int
		maxCoins: Int
		scratchableBeforeUnlock: Int
		imageUrl: String
	}

	input SetLotoInput {
		title: String
		cost: Int
		imageUrl: String
		lotoNumbers: Int
		lotoComplementary: Int
		maxNumbers: Int
		maxComplementary: Int
	}

	type Query {
		getTickets: [ Ticket! ]!
		getLotos: [ Loto! ]!
		getHistory: [ Loto ]
	}
	
	type Mutation {
		loginOrRegister(token: String!, provider: String!): User!
		setTicket(input: SetTicketInput): Ticket!
		setLoto(input: SetLotoInput): Loto!
		getScratchNumbers(userId: String!, ticketId: ID): ScratchNumbers!
		participateLoto(input: ParticipateLotoInput!): Loto!
	}
`;

module.exports = typeDefs;
