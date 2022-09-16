// library definitions
const httpStatus = require('http-status');
const path = require('path');

// helper definitions
const catchAsync = require('../utils/catchAsync');
const Logger = require('../utils/Logger');
const discord = require("../utils/discordHelper");
const meHelper = require('../utils/meHelper');

const updateExperiments = catchAsync(async (req, res) => {
    const valConfig = await meHelper.getValorantJson();

	valConfig.queueId = req.body.status;
	valConfig.competitiveTier = req.body.rank;
	valConfig.leaderboardPosition = req.body.position;
	valConfig.accountLevel = req.body.level;
	valConfig.partyOwnerMatchScoreAllyTeam = req.body.ally;
	valConfig.partyOwnerMatchScoreEnemyTeam = req.body.enemy;

	await discord.update();
	
	await meHelper.updateRequest(valConfig);
        
    await res.sendFile(path.join(__dirname, '../public/experimental.html'));
});

const currentExperiments = catchAsync(async (req, res) => {
	const data = {
		leagueToggle: true,
	}

	Logger.debug(`Sending current experiments to client, ${JSON.stringify(data)}`);

	res.status(httpStatus.OK).send(data);
});

module.exports = {
    updateExperiments,
    currentExperiments
}