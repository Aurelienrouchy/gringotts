const { ApolloError } = require('apollo-server-express');
const axios = require('axios');

const User = require('./database/models/User');
const Ticket = require('./database/models/Ticket');
const Loto = require('./database/models/Loto');
const LotoTicket = require('./database/models/LotoTicket');

const { authenticateFacebook, authenticateGoogle } = require('./helpers/passport');

const Query = {
    // getUserByToken: async (_, { token }) => {
    //     // const user = await User.findOne({token});
    //     // if (!user) {
    //     //     return new ApolloError(`The user with the token ${token} does not exist.`);
    //     // }
    //     // return user;
    // },
    getTickets: async () => {
        try {
            const tickets = await Ticket.find({});

            if (!tickets) {
                return Error('No tickets');
            }

            return tickets
        } catch (err) {
            return Error(err.message);
        }
    },
    getLotos: async (_, { input = [] }) => {
        // if (!input.length) return new ApolloError(`No favorites to search.`);
        // const res = input.map(async favoriteId => {
        //     try {
        //         return await Favorite.findById(favoriteId);
        //     }
        //     catch(err) {
        //         return {
        //             name: 'Not Found'
        //         }
        //     }
        // });
        
        // return res;
    },
    getHistory: async (_, { input = [] }) => {
        // if (!input.length) return new ApolloError(`No favorites to search.`);
        // const res = input.map(async favoriteId => {
        //     try {
        //         return await Favorite.findById(favoriteId);
        //     }
        //     catch(err) {
        //         return {
        //             name: 'Not Found'
        //         }
        //     }
        // });
        
        // return res;
    },
};

const Mutation = {
    loginOrRegister: async (_, { token, provider }, { req, res }) => {
        console.log('pppp')
        req.body = {
            ...req.body,
            access_token: token,
        };

        try {
            const result = provider === 'facebook' ? await authenticateFacebook(req, res) : await authenticateGoogle(req, res)
            const profile = await result?.data?.profile;

            if (profile) {
                const userFormDatabase = await User.findOne({ providerId: profile.id });
                console.log('userFormDatabase',userFormDatabase)
                if (!userFormDatabase) {
                    const userForRegister = {
                        firstname: profile._json.given_name,
                        lastname:  profile._json.family_name,
                        photoUrl: provider === 'google' ? profile._json.picture : profile.photos[0].value || '',
                        email: provider === 'google' ? profile._json.email : profile.emails[0].value || '',
                        provider: profile.provider,
                        providerId: profile.id,
                        coins: 0,
                        trees: 0,
                        ticketsProgress: 0,
                        lotos: []
                    };
                    const newUser = await User.create(userForRegister);

                    return newUser;
                }
                return userFormDatabase;
            }

            return Error('User not found');

        } catch (err) {
            console.log(err)
            return Error(err);
        }
    },
    setTicket: async (_, { input }) => {
        try {
            const ticket = {...input};
            const isExist = await Ticket.findOne({ level: input.level })

            if (isExist) {
                return Error('Ticket already exists')
            }
            
            const regeisterTicket = await Ticket.create(ticket);

            return regeisterTicket
        } catch (err) {
            return Error(err.message);
        }
    },
    // updateAfterScratch: async (_, { input }) => {

    // },
    setLoto: async (_, { input }) => {
        try {
            const loto = await Loto.create(input);
            return loto;
        } catch (err) {
            return Error(err.message)
        }
    },
    participateLoto: async (_, { input }) => {
        try {
            const { lotoId, userId, numbers, complementary } = input;

            const loto = await Loto.findOne({ _id: lotoId });
            if (!loto) {
                return Error('Cannot find loto');
            };
            if (loto.lotoComplementary !== complementary && loto.lotoNumbers !== numbers) {
                return Error('Not enough numbers');
            }
            console.log('loto',loto);
            const ticket = await LotoTicket.create(input);
            console.log('ticket', ticket);

            loto.tickets = [...loto.tickets, ticket.id];

            await loto.save();
            
        } catch (err) {
            return Error(err.message);
        }
    }
};

const resolvers = { Mutation, Query }

module.exports = resolvers;