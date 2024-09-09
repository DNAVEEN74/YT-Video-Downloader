import { atom } from "recoil";


export const videoObj = atom({
    key: 'videoObj',
    default:{
        videoUrl:'',
        title :'',
        duration:'',
        thumbnail:'',
        videoId:'',
    }
})