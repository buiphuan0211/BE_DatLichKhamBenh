'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.hasMany(models.Schedule, { foreignKey: 'doctorId' });
      Doctor.hasMany(models.Rate, { foreignKey: 'doctorId' });
      Doctor.belongsTo(models.Position, { foreignKey: 'positionId' });
      Doctor.belongsTo(models.Specialist, { foreignKey: 'specialistId' });
      Doctor.belongsTo(models.Account, { foreignKey: 'accountId' });
    }
  }
  Doctor.init(
    {
      fullName: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      address: DataTypes.STRING,
      date: DataTypes.STRING,
      workHistory: DataTypes.TEXT,
      avatarImage: DataTypes.STRING,
      clinicName: DataTypes.STRING,
      clinicImage: DataTypes.STRING,
      clinicAddress: DataTypes.STRING,
      certificateImage: DataTypes.STRING,
      licenseImage: DataTypes.STRING,
      status: DataTypes.ENUM('NOT_ACTIVE', 'PENDING', 'ACTIVE', 'CANCEL'),
      numberOfPatientsExamined: DataTypes.INTEGER,
      specialistId: DataTypes.STRING,
      positionId: DataTypes.STRING,
      accountId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Doctor',
    }
  );
  return Doctor;
};
