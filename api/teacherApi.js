import {ajax} from "../tool/Ajax";

export const getTeacherList = () => ajax('/api/client/teacher/list?page_size=100')

export const getTeacherDetail = (id) => ajax('/api/client/teacher/detail/' + id)