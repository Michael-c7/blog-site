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
    },
    {
      id:1,
      text:'Science',
      link:'/category/science',
    },
    {
      id:2,
      text:'Gaming',
      link:'/category/gaming',
    },
    {
      id:3,
      text:'Business',
      link:'/category/business',
    },
    {
      id:4,
      text:'Movies',
      link:'/category/movies',
    },
    {
      id:5,
      text:'Food',
      link:'/category/food',
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