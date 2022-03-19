import {ajax} from "../tool/Ajax";

export const getCourseCategory = () => ajax('/api/client/course/category')

export const getCourseByCategoryId = (category_id = -1,page_size = 100) => ajax('/api/client/course/list',{category_id,page_size})

export const getCourseDetailInFo = (id) => ajax('/api/client/course/basic_info/'+id)

export const getCourseOutline = (id) => ajax('/api/client/course/outline/'+id)

export const getCourseComments = (id) => ajax('/api/client/course/comment/'+id)