import { Router } from 'express'
import {
  adaptRoute,
  adaptRouteListPager
} from '../../adpters/express-route-adapter'
import { makeFindOneStudentController } from '../../factories/student/find-one-student/find-one-student-factories'
import { makeUpdateStudentController } from '../../factories/student/update-student/update-student-factories'
import { makeDeleteStudentController } from '../../factories/student/delete-student/delete-student-factories'
import { makeListStudentsController } from '../../factories/student/list-students/list-students-factories'
import { makeAddStudentController } from '../../factories/student/add-student/add-student-factories'

export default (router: Router): void => {
  // Create Student
  router.post('/student', adaptRoute(makeAddStudentController()))

  // List Students
  router.get('/student', adaptRouteListPager(makeListStudentsController()))

  // Find One Student
  router.get('/student/:id', adaptRoute(makeFindOneStudentController()))

  // Update Student
  router.put('/student', adaptRoute(makeUpdateStudentController()))

  // Delete Student
  router.delete('/student/:id', adaptRoute(makeDeleteStudentController()))
}
