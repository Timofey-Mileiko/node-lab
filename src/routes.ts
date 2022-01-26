import {NamedRouter} from './common/types/tuples';
import {LessonRouter} from './lesson/lesson.router';
import {UserRouter} from "./user/user.router";

const routes: NamedRouter[] = [LessonRouter, UserRouter];

export default routes;