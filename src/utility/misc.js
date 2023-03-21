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




/**
 * 
 * @param {string} date1 - format it like the date object in javascript eg: Fri Mar 03 2023 10:30:39 GMT-0600 (Central Standard Time)
 * @param {string} date2 - format it like the date object in javascript eg: Fri Mar 03 2023 10:31:12 GMT-0600 (Central Standard Time)
 * @returns 
 */
export function getTimeDifference(date1, date2) {
    try {
      const msPerSecond = 1000;
      const msPerMinute = msPerSecond * 60;
      const msPerHour = msPerMinute * 60;
      const msPerDay = msPerHour * 24;
      const msPerMonth = msPerDay * 30;
      const msPerYear = msPerDay * 365;
  
      const timeDiff = Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
  
      if (isNaN(timeDiff)) {
        throw new Error('Invalid date format.');
      }
  
      if (timeDiff < msPerMinute) {
        return 'Just now';
      } else if (timeDiff < msPerHour) {
        const diff = Math.round(timeDiff / msPerMinute);
        return `${diff} ${diff === 1 ? 'minute' : 'minutes'} ago`;
      } else if (timeDiff < msPerDay) {
        const diff = Math.round(timeDiff / msPerHour);
        return `${diff} ${diff === 1 ? 'hour' : 'hours'} ago`;
      } else if (timeDiff < msPerMonth) {
        const diff = Math.round(timeDiff / msPerDay);
        return `${diff} ${diff === 1 ? 'day' : 'days'} ago`;
      } else if (timeDiff < msPerYear) {
        const diff = Math.round(timeDiff / msPerMonth);
        return `${diff} ${diff === 1 ? 'month' : 'months'} ago`;
      } else {
        const diff = Math.round(timeDiff / msPerYear);
        return `${diff} ${diff === 1 ? 'year' : 'years'} ago`;
      }
    } catch (error) {
      console.error(error);
      return 'Error: Invalid date format.';
    }
  }



  let timerId;

  export function debounce(func, delay) {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay);
  }














  const firstNames = {
    english: ["John", "Emma", "Michael", "Sophia", "William", "Olivia", "James", "Ava", "Benjamin", "Isabella", "Daniel", "Mia", "Alexander", "Charlotte", "Ethan", "Amelia", "Jacob", "Emily", "Liam", "Abigail"],
    chinese: ["Wei", "Yan", "Ling", "Chun", "Hua", "Jian", "Jing", "Liu", "Ming", "Shan", "Xin", "Yong", "Zhi"],
    hindi: ["Aarav", "Aryan", "Aditya", "Arjun", "Ishaan", "Riya", "Anika", "Aarohi", "Aditi", "Diya", "Ishika", "Kavya", "Myra", "Sara", "Shreya", "Tara", "Trisha"],
    arabic: ["Ahmed", "Ali", "Amina", "Fatima", "Hassan", "Khalid", "Laila", "Mariam", "Mohammed", "Nadia", "Nour", "Omar", "Rania", "Sana", "Yousef", "Zahra"],
  };
  
  const lastNames = {
    english: ["Smith", "Johnson", "Brown", "Taylor", "Miller", "Jones", "Davis", "Garcia", "Wilson", "Martinez", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Clark", "Lewis", "Walker", "Young"],
    chinese: ["Chen", "Huang", "Lin", "Liu", "Wang", "Yang", "Yu", "Zhang", "Zhao", "Zhou"],
    hindi: ["Sharma", "Verma", "Singh", "Yadav", "Rao", "Mishra", "Patel", "Gupta", "Jha", "Kumar", "Chauhan", "Pandey", "Bhatia", "Joshi", "Shah", "Trivedi"],
    arabic: ["Ali", "Hassan", "Khalid", "Mahmoud", "Mohammed", "Nasser", "Omar", "Said", "Salem", "Saleh", "Sultan"],
  };
  
  export function generateRandomName() {
    const languages = Object.keys(firstNames);
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    const firstName = firstNames[randomLanguage][Math.floor(Math.random() * firstNames[randomLanguage].length)];
    const lastName = lastNames[randomLanguage][Math.floor(Math.random() * lastNames[randomLanguage].length)];
    return `${firstName} ${lastName}`;
  }
