import { upload } from './upload'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyB6CMru-ShW2zdUM_px2tyiGUJ3gyFwYbk',
  authDomain: 'upload-files-7996e.firebaseapp.com',
  projectId: 'upload-files-7996e',
  storageBucket: 'upload-files-7996e.appspot.com',
  messagingSenderId: '98785246968',
  appId: '1:98785246968:web:50b7043dd945576472c50d'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpg', 'gif'],
  onUpload(files) {
    files.forEach(file => {
      const storageRef = ref(storage, `images/${file.name}`)
      console.log(storageRef)
      // console.warn(file)
      // const uploadTask = ref.put(file)

      // var next = function (snapshot) {
      //   console.log(snapshot)
      // }
      // var error = function (error) {}
      // var complete = function () {}

      // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, next, error, complete)

      // uploadBytes(storageRef, file).then(snapshot => {
      // const percentage = (snapshot.bytesTransfered / snapshot.size) * 100
      // const percentage = snapshot.size
      // console.log(percentage)
      // console.log(snapshot.metadata.size)

      // var percent = (snapshot.bytesTransferred / snapshot.metadata.size) * 100
      // console.log(percent + '% done')
      // })

      // task.on(
      //   'state_changed',
      //   snapshot => {
      //     // const percentage = (snapshot.bytesTransfered / snapshot.totalBytes) * 100
      //     // console.log(percentage)
      //     console.log(snapshot)
      //   },
      //   error => console.log(error),
      //   () => console.log('complete')
      // )
    })
  }
})
