import Joi from 'joi';
import SlamBody from '../Interfaces/SlamBody';

const SlamSchema = Joi.object<SlamBody>({
  title: Joi.string().trim().min(2).max(250).required(),
  description: Joi.string().trim().min(2).max(300).required(),
  tag: Joi.string().trim().required().default('Genereal'),
});

export default SlamSchema;
