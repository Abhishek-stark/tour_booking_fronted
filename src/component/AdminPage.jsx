import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Cookies, useCookies, withCookies } from 'react-cookie';
// import { reset, getAllusers } from '../reducers/authSlice';
import './dashboard.css';
import Error from './Error';
const AdminPage = () => {
  var detail = [];
  // const name = [];
  // const email = [];
  // const photo = [];
  // const [cookies, setcookie] = useCookies();
  // const [userdetail, setuserdetail] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  let token = user.token;
  useEffect(() => {
    getallUsers();
  }, []);
  const getallUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/users/', {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      });

      // if (response.data) {
      //   const { data } = response.data;
      //   localStorage.setItem('userdetail', JSON.stringify(data));
      const { data } = response.data.data;
      detail.push(data);
      console.log(detail);
    } catch (error) {
      // console.log(error);
      <Error />;
    }
  };

  // userdetail.da((value) => {
  //   console.log(value);
  // });
  // console.log(userdetail.data.data);

  // console.log(userdetail.data);
  // userdetail.data.data.map((value) => {
  //   console.log(value);
  // });
  // userdetail.data.map((value) => {
  //   console.log(value);
  // });
  // const userdetail = JSON.parse(localStorage.getItem('userdetail'));
  // {userdetail.map((datas, i) => {
  //   const { name, photo, email } = datas;
  //   return (
  //     <div className="users_card" key={i}>
  //       <div className="users_img_cover">
  //         <img src={photo} alt="user_img" className="users_user_img" />
  //       </div>
  //       <h3>UserName: {name}</h3>
  //       <p>UserEmail: {email}</p>
  //     </div>
  //   );
  // })}
  // var userdetail;
  // setTimeout(() => {
  //
  // }, 1000);
  const userdetail = JSON.parse(localStorage.getItem('userdetail'));

  return (
    <div className="allUsers_card">
      <h2>name</h2>
    </div>
  );
};

export default AdminPage;
