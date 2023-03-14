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

export const defaultImgData =  [
  {src:defaultImg1},
  {src:defaultImg2},
  {src:defaultImg3},
  {src:defaultImg4},
  {src:defaultImg5},
  {src:defaultImg6},
  {src:defaultImg7},
  {src:defaultImg8},
  {src:defaultImg9},
  {src:defaultImg10},
  {src:defaultImg11},
  {src:defaultImg12},
]