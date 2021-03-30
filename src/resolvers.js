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
            }``

            return tickets
        } catch (err) {
            return Error(err.message);
        }
    },
    getUserTickets: async (_, { userId })  => {
        try {
            const user = await User.findById(userId);
            const userTickets = user.lotos;
            const lotosTickets = await LotoTicket.find({ '_id': { $in: userTickets }});
            
            return lotosTickets;
        } catch (err) {
            return Error(err.message);
        }
    },
    getLotos: async ()  => {
        try {
            const lotos = await Loto.find({});

            return lotos;
        } catch (err) {
            return Error(err.message);
        }
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
        req.body = {
            ...req.body,
            access_token: token,
        };

        try {
            const result = provider === 'facebook' ? await authenticateFacebook(req, res) : await authenticateGoogle(req, res)
            const profile = await result?.data?.profile;

            if (profile) {
                const userFormDatabase = await User.findOne({ providerId: profile.id });

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
                    const { _doc: newUser }  = await User.create(userForRegister);
                    return {
                        ...newUser._doc,
                        id: newUser._id,
                        token: newUser.generateJWT(newUser._id),
                    };
                };
                
                return {
                    ...userFormDatabase._doc,
                    id: userFormDatabase._id,
                    token: userFormDatabase.generateJWT(userFormDatabase._id),
                };
            }
            return Error('User not found');

        } catch (err) {
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
    participateLoto: async (_, { input }, ctx) => {
        if (!ctx.user) throw new AuthenticationError('you must be logged in');
        try {
            const { userId } = input;

            const loto = Loto.findById(input.lotoId);
            if (!loto) {
                return Error('No loto found')
            }
            
            const ticket = await LotoTicket.create(input);
            await User.findOneAndUpdate(
                { _id: userId }, 
                [{ $push: { lotos: ticket._id } }, { $subtract: { coins: loto.cost } }],
            );

            return {...ticket, coins: loto.cost}
            
        } catch (err) {
            return Error(err.message);
        }
    }
};

const resolvers = { Mutation, Query }

module.exports = resolvers;