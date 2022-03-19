import {ajax} from "../tool/Ajax";

export const getSearchResult = (category,key) => ajax('/api/client/search/'+category,{key})
