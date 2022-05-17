const Problem = require("../models/problem.model");

const calculateScore = (answers) => {
	const userScore = [];
	answers.forEach(({ problemId, answer }) => {
		const problem = Problem.findById(problemId);
		if (problem.key === answer) {
			userScore.push(1);
		} else {
			userScore.push(0);
		}
	});

	const rightAnswer = 0;
	userScore.forEach((value) => {
		if (value === 1) {
			rightAnswer++;
		}
	});

	return (rightAnswer / userScore.length) * 100;
};

module.exports = calculateScore;
