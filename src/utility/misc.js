import { v4 as uuidv4 } from 'uuid';


/*
put miscellaneous function that have
no specific place here
eg: create unique id, creating a date, ect...
*/

export const generateUniqueId = _ => uuidv4()


/**
 * example of how to use: socialMediaNumberFormatter.format(20000) returns 20k 
 */
export const socialMediaNumberFormatter = Intl.NumberFormat("en", {notation:"compact"})
