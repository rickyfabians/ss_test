export module Utility {
	export function replaceAll(pString:string, pSearch:string, pReplacement:string) {
		return pString.replace(new RegExp(pSearch, 'g'), pReplacement);
	};
	
}