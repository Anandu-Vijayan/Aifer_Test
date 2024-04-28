module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("question", {
    Question_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Question: {
      type: Sequelize.STRING,
    },
    Question_Hint: {
      type: Sequelize.STRING,
    },
    A: {
      type: Sequelize.STRING,
    },
    B: {
      type: Sequelize.STRING,
    },
    C: {
      type: Sequelize.STRING,
    },
    D: {
      type: Sequelize.STRING,
    },
    Answer: {
      type: Sequelize.STRING,
    },
  }, {
    timestamps: true,
    createdAt: true,
    updatedAt: true 
  });

  return Question;
};
