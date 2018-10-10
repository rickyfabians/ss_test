import {ErrorHandlingService} from './error-handling.service';
import {SequelizeService} from './sequelize.service';
import {Utility} from '../shared/utility';
import {Logging} from './logging.service';

export class SQLService{

	constructor() {
        Logging('Initialize Data Access Service');
	}

	public static executeSP(pSPName:string, pParams?: any): Promise<string> {
        Logging('Executing sp : '+pSPName);
		return new Promise<string>(
			function(pResolve, pReject) {
				try{
					Logging('Parsing the data');
					let vParams:string = '';
					let length:number;
					let counter:number;
					if(pParams) {
						counter=0;
						length = Object.keys(pParams).length;
						//change the structure of parameter
						for(let vParam in pParams){
							++counter;
							if(pParams[vParam] !== undefined && pParams[vParam] !== null && typeof pParams[vParam] === 'string' && pParams[vParam].indexOf('\'') !== -1) {
								pParams[vParam] = Utility.replaceAll(pParams[vParam],'\'','\'\'');
							}
							vParams += "'" + pParams[vParam] + "'";
							if(counter != length)
								vParams +=',';
						}
					}
					let vSQL:string = `CALL ${pSPName}(${vParams})`;
					Logging('vSQL : ' + vSQL);
					SequelizeService.sequelize.query(vSQL, { type: SequelizeService.sequelize.QueryTypes.SELECT }).then(function(pResult:any){
						//If success
						let vResult:any = pResult;
						Logging(vResult)
						//Logging('Result: '+vResult);
						if(vResult.length == 1 &&
						 ('ErrorNumber' in vResult[0]) &&
						 ('ErrorMessage' in vResult[0])) {
						 	vResult = vResult[0];
							Logging('Error while executing query 1 : ' + vSQL);
							ErrorHandlingService.throwPromiseError(pReject,vResult.ErrorNumber,vResult.ErrorMessage);
						}else {
						    Logging("success : ");
							// Logging(vResult);
							pResolve(vResult);
						}
					}).catch(function(pErr:any){
						//If got error it will throwing error from the sequelize
						Logging('Error while executing query 2 : ' + vSQL);
						Logging('Error ' + pErr);
						pReject(pErr);
						ErrorHandlingService.throwPromiseError(pReject,400, pErr);
					});
				}
				catch(pErr) {
					Logging(pErr);
					ErrorHandlingService.throwPromiseError(pReject, 400,pErr);
				}
			}
		);
	}
}