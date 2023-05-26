import { v4 as uuidv4 } from 'uuid';

import Compressor from 'compressorjs';
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



    // takes an imageUrl and setState as arguments.
    export const convertImageToBlob = async (imageUrl, setState) => {
      try {
        // This function uses the fetch API to get the binary data of the given imageUrl.
        const response = await fetch(imageUrl);
        // This converts the binary data into a Blob object.
        const blob = await response.blob();
        // This creates a URL for the Blob object.
        const blobUrl = URL.createObjectURL(blob);
        // This sets the blobUrl as the value of the given setState function.
        setState(blobUrl)
        // This returns the blobUrl, although it is not currently used in the code.
        return blobUrl
      } catch (error) {
        // If an error occurs, it is logged to the console for debugging purposes.
        console.error(error);
      }
    };

  // blob args can be a Blob or a File
  // takes a Blob object and setState as arguments.
  export function compressImage(blob, setState) {
    // If no Blob object is provided, the function returns immediately.
    if (!blob) {
      return;
    }
    // This code uses the Compressor.js library to compress the given Blob object
    // with a quality setting of 0.6. The resulting compressed image is then converted
    // to a data URL and set as the value of the given setState function.
    new Compressor(blob,{
      quality: 0.6,
      success(result) {
        const reader = new FileReader();
        reader.onload = function() {
          const dataURL = reader.result;
          setState(dataURL)
        };
        reader.readAsDataURL(result);
      },
      error(err) {
        console.error(err.message);
      },
    })
  }



  /**
   * 
   * @param {number} nanoseconds eg:386000000
   * @param {number} seconds  eg:1681566169
   * @returns Outputs "month day, year" eg: April 23, 2023
   */
  export function getDateFromTime(nanoseconds, seconds) {
    const milliseconds = (seconds * 1000) + Math.floor(nanoseconds / 1000000);
    const date = new Date(milliseconds);
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
