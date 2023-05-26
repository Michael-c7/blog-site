/*
for reusable thing
eg: navbar links
(would be reused on navbar and mobile menu)
*/
import { 
  FaFacebookF,
  FaGooglePlusG,
  FaBehance,
  FaVimeo,
  FaYoutube,
} from "react-icons/fa"


export const navItems = [
    {
      id:0,
      text:'Home',
      link:'/',
      bgColor:'--category--home',
    },
    {
      id:1,
      text:'Science',
      link:'/category/science',
      bgColor:'--category--science',
    },
    {
      id:2,
      text:'Gaming',
      link:'/category/gaming',
      bgColor:'--category--gaming',
    },
    {
      id:3,
      text:'Business',
      link:'/category/business',
      bgColor:'--category--business',
    },
    {
      id:4,
      text:'Movies',
      link:'/category/movies',
      bgColor:'--category--movies',
    },
    {
      id:5,
      text:'Food',
      link:'/category/food',
      bgColor:'--category--food',
    },
  ]


export const socialMediaItems = [
  {
    id:0,
    icon:FaFacebookF,
    link:"/",
    bgColor:"--facebook--bg-color",
    text:"facebook",
  },
  {
    id:1,
    icon:FaGooglePlusG,
    link:"/",
    bgColor:"--google-plus--bg-color",
    text:"googlePlus",
  },
  {
    id:2,
    icon:FaBehance,
    link:"/",
    bgColor:"--behanced--bg-color",
    text:"behanced",
  },
  {
    id:3,
    icon:FaVimeo,
    link:"/",
    bgColor:"--vimeo--bg-color",
    text:"vimeo",
  },
  {
    id:4,
    icon:FaYoutube,
    link:"/",
    bgColor:"--youtube--bg-color",
    text:"youtube",
  },
]


export const getAllCategories = _ => navItems.map((item) => item.text).slice(1, navItems.length)
export const getAllCategoryBgColors = _ => navItems.map((item) => `var(${item.bgColor})`).slice(1, navItems.length)

// images

const defaultImagesRaw = import.meta.glob('../assets/images/defaultImages/*.{jpg,jpeg,png,gif,webp}');

const defaultImages = Object.entries(defaultImagesRaw).map(([path]) => ({
  src:path,
}))

import defaultImg1 from '../assets/images/defaultImages/pexels-chan-walrus-958545.jpg'
import defaultImg2 from '../assets/images/defaultImages/pexels-chokniti-khongchum-2280571.jpg'
import defaultImg3 from '../assets/images/defaultImages/pexels-christina-morillo-1181605.jpg'
import defaultImg4 from '../assets/images/defaultImages/pexels-jeshootscom-442576.jpg'
import defaultImg5 from '../assets/images/defaultImages/pexels-johannes-plenio-1423600.jpg'
import defaultImg6 from '../assets/images/defaultImages/pexels-lukas-kloeppel-466685.jpg'
import defaultImg7 from '../assets/images/defaultImages/pexels-pixabay-207529.jpg'
import defaultImg8 from '../assets/images/defaultImages/pexels-pixabay-2166.jpg'
import defaultImg9 from '../assets/images/defaultImages/pexels-pixabay-276452.jpg'
import defaultImg10 from '../assets/images/defaultImages/pexels-tima-miroshnichenko-7991135.jpg'
import defaultImg11 from'../assets/images/defaultImages/pexels-yan-krukau-9069301.jpg'
import defaultImg12 from '../assets/images/defaultImages/sid-balachandran-_9a-3NO5KJE-unsplash.jpg'
import defaultImg13 from "../assets/images/defaultImages/pexels-stacey-koenitz-r-2425011.jpg"
import defaultImg14 from "../assets/images/defaultImages/pexels-fauxels-3184292.jpg"
import defaultImg15 from "../assets/images/defaultImages/pexels-robin-stickel-70497.jpg"
import defaultImg16 from "../assets/images/defaultImages/pexels-lucas-pezeta-2398354.jpg"

export const defaultImgData =  [
  {image:defaultImg1, description:"White and Brown Cooked Dish on White Ceramic Bowls",},
  {image:defaultImg2, description:"Person Holding Laboratory Flask",},
  {image:defaultImg3, description:"Two Woman in Black Sits on Chair Near Table",},
  {image:defaultImg4, description:"Two People holding Black Gaming Controller",},
  {image:defaultImg5, description:"Forest Covered in White Fog",},
  {image:defaultImg6, description:"Empire State Building, New York City",},
  {image:defaultImg7, description:"Blue Universe space",},
  {image:defaultImg8, description:"Taking-off Rocket",},
  {image:defaultImg9, description:"Computer C++ Code",},
  {image:defaultImg10, description:"Man Sitting on Red Seat Holding a Video Camera Inside a Theater",},
  {image:defaultImg11, description:"A Group of Friends Playing Video Games",},
  {image:defaultImg12, description:"Eating Panda Bear",},
  {image:defaultImg13, description:"abstract red and yellow pattern",},
  {image:defaultImg14, description:"People Discuss About Graphs and Rates",},
  {image:defaultImg15, description:"Fries and Burger on Plate",},
  {image:defaultImg16, description:"Assorted-title Movie Case shelf",},
]