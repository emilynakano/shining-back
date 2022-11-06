import joi from 'joi';

const createNote = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
});

const updateNote = joi.object({
  content: joi.string().required(),
});

export { createNote, updateNote };
