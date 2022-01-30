const twilio = require('twilio');

const accountSid = 'AC6d08201815e38ba2c92ac8ccbca49252';
const authToken = '5081aaaa29819cd220730c76b39c77fd';

const client = twilio(accountSid, authToken);

const service = 'VA30877f7d90db8bae026464aff31a9a2d';

// client.verify
//   .services(service)
//   .verifications.create({ to: 'maixuanhoa1995@gmail.com', channel: 'email' })
//   .then((verification) => console.log(verification.sid))
//   .catch((err) => {
//     console.log(err);
//   });

// client.verify
//   .services(service)
//   .verificationChecks.create({
//     to: 'maixuanhoa1995@gmail.com',
//     code: '839809',
//   })
//   .then((verification_check) => console.log(verification_check));

// client.verify
//   .services('VAae5a4d1b1d20ff98603809d70b999766')
//   .entities.create({ identity: 'identity' })
//   .then((entity) => console.log(entity.sid));

// client.verify
//   .services(service)
//   .entities('YE3bd39918268b')
//   .newFactors.create({
//     friendlyName: 'User no 1',
//     factorType: 'totp',
//   })
//   .then((new_factor) => {
//     console.log(new_factor);
//   });

client.verify
  .services(service)
  .entities('YE3bd39918268b')
  .factors('YF0261cd1a7451cb89800e04ee3bce7092')
  .update({ authPayload: '9228065' })
  .then((factor) => console.log(factor))
  .catch((error) => {
    console.log(error);
  });

// client.verify
//   .services(service)
//   .entities(ent)
//   .factors.list({ limit: 20 })
//   .then((factors) => factors.forEach((f) => console.log(f.sid)));

// client.verify
//   .services(service)
//   .entities(ent)
//   .challenges.create({
//     authPayload: '890992',
//     factorSid: 'YF0261c7f27dd9fb6c89ec8ec3394d0dfd',
//   })
//   .then((challenge) => console.log(challenge))
//   .catch((err) => {
//     console.log(err);
//   });

// client.verify
//   .services(service)
//   .verifications.create({ to: '+84963007263', channel: 'sms' })
//   .then((verification) => console.log(verification.status));

// client.verify
//   .services(service)
//   .verificationChecks.create({ to: '+84963007263', code: '437477' })
//   .then((verification_check) => console.log(verification_check.status));
