import Joi from 'joi';
import AuthBody from '../Interfaces/AuthBody';

const UserSchema = Joi.object<AuthBody>({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().trim().min(5).max(200).required(),
  createdOn: Joi.string().default(new Date().toLocaleString()),
});

export default UserSchema;
