import bcrypt from 'bcrypt';
const saltRounds = 10;
import { generatorID } from '../utils/helpers';
import db from '../models';

const register = async (formData) => {
  const checkUsername = await db.Account.findOne({
    where: { username: formData.username }
  });

  if (checkUsername) {
    return;
  }

  let checkDbByTypeAccountId;

  const hashPasswordAccount = await bcrypt.hash(formData.password, saltRounds);
  formData.id = generatorID('AC');
  formData.password = hashPasswordAccount;

  if (formData.typeAccountId == '1') {
    formData.status = 1;
    checkDbByTypeAccountId = db.Patient;
  }

  if (formData.typeAccountId == '2') {
    formData.status = 1;
    checkDbByTypeAccountId = db.Doctor;
  }

  const isCheckNumber =
    formData.typeAccountId == '2' ? { numberOfPatientsExamined: 0 } : {};

  await checkDbByTypeAccountId.create({
    id: formData.typeAccountId == '1' ? generatorID('PT') : generatorID('DT'),
    accountId: formData.id,
    status: formData.typeAccountId == '1' ? 1 : 'NOT_ACTIVE',
    ...isCheckNumber
  });

  await db.Account.create(formData);

  return db.Account.findOne({
    where: { id: formData.id },
    include: checkDbByTypeAccountId
  });
};

const login = async (username, password) => {
  const checkUsername = await db.Account.findOne({
    where: {
      username: username
    },
    raw: true
  });
  if (!checkUsername) return;

  const checkPassword = await bcrypt.compare(password, checkUsername.password);
  if (!checkPassword) return;

  const dbInclude =
    checkUsername.typeAccountId == 1
      ? db.Patient
      : checkUsername.typeAccountId == 2
      ? db.Doctor
      : db.Admin;

  return await db.Account.findOne({
    where: {
      username: username
    },
    attributes: {
      exclude: ['password']
    },
    include: dbInclude
  });
};

const logout = async (req, res) => {};

module.exports = {
  register,
  login
};
