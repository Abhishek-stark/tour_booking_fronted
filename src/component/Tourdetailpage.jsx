import { React, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './tourdetail.css';
import GradeIcon from '@mui/icons-material/Grade';
import { loadStripe } from '@stripe/stripe-js';

import axios from 'axios';
import Error from './Error';
import { experimentalStyled } from '@mui/material';

const Tourdetailpage = () => {
  const params = useLocation();
  const navigate = useNavigate();
  const tourdetail = JSON.parse(localStorage.getItem('tourdetail'));
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(details);
  const [writeReview, setwriteReview] = useState(true);
  const [reviewdata, setreviewdata] = useState({
    review: '',
    rating: '',
  });

  const { review, rating } = reviewdata;
  var j = 1;

  // tourdetail.tour[3].map((userid, index) => {
  //   console.log(userid);
  // });

  const onchangereview = (e) => {
    e.preventDefault();
    setreviewdata((prevreview) => ({
      ...prevreview,
      [e.target.name]: e.target.value,
      user: user.id,
      tour: tourdetail.tour._id,
    }));
  };

  const writeReviews = async (data) => {
    let token = user.token;
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/reviews',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // window.location.reload();
      return response;
    } catch (error) {
      console.warn(error.message);
    }
  };
  const onSubmitreview = (e) => {
    e.preventDefault();

    if (reviewdata.review.match(/\S/g) == null) {
      return (
        // window.alert('you not written any review..'),
        setwriteReview(!writeReview)
      );
    } else {
      writeReviews(reviewdata);
      setreviewdata(!writeReview);
      navigate('/');
    }
  };
  let i = 0;

  const bookTour = async (tourId) => {
    let token = user.token;

    try {
      const stripePromise = await loadStripe(
        'pk_test_51LhXM5SBrxf9grZuKlaBjNwd4LPft9O4c06bUKX8eBsgSBgcxaxMcm2jDFZZtTcRmVitjammnAkHhD19KLepU0ns00ZPAKOmmI'
      );
      // 1) Get checkout session from API
      const session = await axios.get(
        `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
      return session;
    } catch (err) {
      <Error error={err.message} />;
    }
  };

  const BookTours = (e) => {
    e.preventDefault();

    const Id = e.target.getAttribute('data-tourid');
    bookTour(Id);
    console.log(Id);
  };
  if (user) {
    return (
      <>
        <div className="detail_container">
          <div className="detail_cover">
            <span> {tourdetail.tour.name} </span>{' '}
            <img
              src={tourdetail.tour.imageCover}
              alt=""
              className="image_cover_class"
            />
          </div>{' '}
          <div className="tour_detail">
            <h1>About Tour</h1>
            <div> {tourdetail.tour.description} </div>{' '}
          </div>{' '}
          <div className="tour_image_container">
            {tourdetail.tour.images.map((e, index) => {
              i++;
              return (
                <img
                  key={index}
                  src={e}
                  alt="user_img"
                  className=" tour_images "
                />
              );
            })}
          </div>
          <div className="tour_btn_and_carddetail">
            {tourdetail.tour.guides.map((guidence, index) => {
              return (
                <div className="detail_card" key={index}>
                  <div key={index}>
                    <div className="guide_image">
                      <img src={guidence.photo} alt="GuidesImg" />
                    </div>
                    <span style={{ color: 'yellow' }}>{guidence.name}</span>
                  </div>
                  <div className="price">Price:{guidence.price} </div>{' '}
                  <span>{` Duration |${guidence.duration} days`}</span>
                </div>
              );
            })}

            <div className="book_tour_button">
              <div className="bok_btn_user_img">
                <img src={user.photo} alt="user_img" />
              </div>
              <p>Book your Tour now and enjoy your Weekend ...</p>
              <button
                className="booktour_btn"
                data-tourid={tourdetail.tour.id}
                onClick={BookTours}
              >
                Book Tour
              </button>
            </div>
          </div>
          <div>
            <h3 className="reviews_border">Reviews...</h3>
          </div>
          <footer className="reviews_and_reviewarea">
            {tourdetail.tour.reviews.map((e, i) => {
              const { review, user } = e;
              return (
                <div className="review_card" key={i}>
                  <div className="review_img_cover">
                    <img
                      src={user.photo}
                      alt="user_img"
                      className="review_user_img"
                    />
                  </div>
                  <h3>{user.name}</h3>
                  <p>{review}</p>
                  <span>AverageRating: {tourdetail.tour.ratingsAverage}</span>
                  <div className="rating_star">
                    <GradeIcon color="warning" />
                    <GradeIcon color="warning" />
                    <GradeIcon color="warning" />
                    <GradeIcon color="warning" />
                    <GradeIcon color="warning" />
                  </div>
                </div>
              );
            })}
            <section className="footer_card">
              {writeReview ? (
                <button
                  id="add_review_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    tourdetail.tour.reviews.map((value) => {
                      if (value.user._id === user.id) {
                        window.alert('you already written review');
                        console.log('under if');
                        setwriteReview(true);
                      }

                      if (value.user._id !== user.id) {
                        setwriteReview(false);
                        console.log('under else');
                        setreviewdata({
                          review: '',
                          rating: '',
                        });
                      }
                    });
                    // setwriteReview(false);
                    // console.log('under else');
                    // setreviewdata({
                    //   review: '',
                    //   rating: '',
                    // });
                    //
                  }}
                >
                  Write Review
                </button>
              ) : null}
              {!writeReview ? (
                <form onSubmit={onSubmitreview}>
                  <div>
                    <textarea
                      name="review"
                      id="review"
                      value={review}
                      cols="30"
                      rows="10"
                      onChange={onchangereview}
                    ></textarea>
                    <input
                      type="text"
                      name="rating"
                      id="rating"
                      value={rating}
                      onChange={onchangereview}
                    ></input>
                    <button type="submit" id="review_submit_btn">
                      Submit
                    </button>
                  </div>
                </form>
              ) : null}
            </section>
          </footer>
        </div>{' '}
      </>
    );
  }
};

export default Tourdetailpage;
