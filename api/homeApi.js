import {ajax} from "../tool/Ajax";

export const getConfigData = () => ajax('/api/client/home/web_config')
export const getFocusCourses = () => ajax('/api/client/home/focus_img')
export const getStarTeachers = () => ajax('/api/client/home/star_teacher')
export const getHotCourse = () => ajax('/api/client/home/hot_course')
export const getLastArticle = () => ajax('/api/client/home/last_news')