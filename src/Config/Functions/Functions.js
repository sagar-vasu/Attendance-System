import firebaseApp from "../Firebase/Firebase";


let LoginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        let obj = {
          email: res.user.email,
          id: res.user.uid,
        }
        resolve(obj)
      })
      .catch(error => {
        reject(error.code)
      });

  });
};


let clendar = () => {
  let months = [`January`, `Febuary`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `November`, `December`];
  let today = new Date();
  let allDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  let obj = {
    year: today.getFullYear(),
    month: months[today.getMonth()],
    date: today.getDate(),
    allDays
  }
  return obj
}


let logout = () => {
  firebaseApp.auth().signOut().then(function () {
  }, function (error) {
    console.error('Sign Out Error', error);
  });

}






export { LoginUser, clendar, logout }
