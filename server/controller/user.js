var Joi = require('joi'),
    Boom = require('boom'),
    // Common = require('./common'),
    Config = require('../config/config'),
    Jwt = require('json-web-token'),
    User = require('../model/user').User;

var privateKey = Config.key.privateKey;

exports.create = {
    validate: {
        payload: {
            fname: Joi.string().required(),
            lname: Joi.string().required(),
            email: Joi.string().email().required(),           
            password: Joi.string().required()
        }
    },
    handler: function(request, reply) {
        
        User.saveUser(request.payload, function(err, user) {
            if (!err) {
                var tokenData = {
                    userName: user.email,                    
                    id: user._id
                };
                // Common.sentMailVerificationLink(user,Jwt.sign(tokenData, privateKey));
                reply("sucessfully registered");
            } else {
                if (11000 === err.code || 11001 === err.code) {
                    reply(Boom.forbidden("please provide another user email"));
                } else reply(Boom.forbidden(err)); // HTTP 403
            }
        });
    }
};


exports.verifyEmail = {
    handler: function(request, reply) {
        Jwt.verify(request.headers.authorization.split(" ")[1], privateKey, function(err, decoded) {
            if(decoded === undefined) return reply(Boom.forbidden("invalid verification link"));
            if(decoded.scope[0] != "Customer") return reply(Boom.forbidden("invalid verification link"));
            User.findUserByIdAndUserName(decoded.id, decoded.userName, function(err, user){
                if (err) {
                    console.error(err);
                    return reply(Boom.badImplementation(err));
                }
                if (user === null) return reply(Boom.forbidden("invalid verification link"));
                if (user.isVerified === true) return reply(Boom.forbidden("account is already verified"));
                user.isVerified = true;
                User.updateUser(user, function(err, user){
                    if (err) {
                        console.error(err);
                        return reply(Boom.badImplementation(err));
                    }
                    return reply("account sucessfully verified");

                })
            })
            
        });
    }
};