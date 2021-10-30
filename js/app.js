import { upload } from './upload'

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpg', 'gif']
})
