const { gql } = require('apollo-server-express');

const typeDefs = gql`

	enum Provider {
		google
		facebook
	}

	type LotoTicket {
		id: ID
		coins: Int
		lotoId: ID
		userId: ID
		classic: [ Int ]
        complementary: [ Int ]
	}

	type Loto {
		id: ID
		createAt: Int
		title: String
		cost: Int
		timer: Int
		imageUrl: String
		lotoNumbers: Int
		lotoComplementary: Int
		maxNumbers: Int
		maxComplementary: Int
		winner: ID
		tickets: [ LotoTicket ]
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
		token: String
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
		numbers: [ Int ]
		coins: Int!

	}

	input ParticipateLotoInput {
		lotoId: ID
		userId: ID
		classic: [ Int ]
        complementary: [ Int ]
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
		timer: Int
		imageUrl: String
		lotoNumbers: Int
		lotoComplementary: Int
		maxNumbers: Int
		maxComplementary: Int
	}

	type Query {
		getTickets: [ Ticket! ]!
		getLotos: [ Loto! ]!
		getUserTickets(userId: String!): [ LotoTicket ]
		getHistory: [ Loto ]
	}
	
	type Mutation {
		loginOrRegister(token: String!, provider: String!): User!
		setTicket(input: SetTicketInput): Ticket!
		setLoto(input: SetLotoInput): Loto!
		getScratchNumbers(ticketId: ID!): ScratchNumbers!
		participateLoto(input: ParticipateLotoInput!): LotoTicket!
	}
`;

module.exports = typeDefs;
