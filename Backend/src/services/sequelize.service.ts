import {Logging} from './logging.service';
declare var require:any;
var vEnv = require('../config/mode.json')['mode'];
const vConfig = require('../config/config.json')[vEnv];
var vSequelize = require("sequelize");

export class SequelizeService {
	public static sequelize:any;

	constructor(){
		try{
			Logging("Initialize Sequelize Service");
			//set the configuration of db (/src/config/config/json)
			SequelizeService.sequelize = new vSequelize(
				vConfig.db.name, 
				vConfig.db.username, 
				vConfig.db.password,
				{
					dialect : vConfig.db.dialect,
					host    : vConfig.db.host,
					port	: vConfig.db.port,
					timezone : vConfig.db.timezone,
					dialectOptions : vConfig.db.dialectOptions,
				});
		}catch(pErr){
			Logging('Error while establishing database connection with sequelize : ' + pErr);
			throw 401;
		}
	}
}