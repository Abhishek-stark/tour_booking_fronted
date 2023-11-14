import Footer from './Footer';
import { React, useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import './tourdetail.css';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Error from './Error';
const TourDetailsN = () => {
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
      <div className="detailPage">
        <section className="section-header">
          <div className="heading-box">
            <h1 className="heading-primary">
              <span>
                {tourdetail.tour.name} <br />
              </span>
            </h1>
            <div className="heading-box__group">
              <div className="heading-box__detail">
                <svg className="heading-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-clock"></use>
                </svg>
                <span className="heading-box__text">
                  {tourdetail.tour.duration} days
                </span>
              </div>
              <div className="heading-box__detail">
                <svg className="heading-box__icon">
                  <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                </svg>
                <span className="heading-box__text">
                  {tourdetail.tour.location}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-description">
          <div className="overview-box">
            <div>
              <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                <div className="overview-box__detail">
                  <svg className="overview-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                  </svg>
                  <span className="overview-box__label">Next date</span>
                  <span className="overview-box__text">
                    {tourdetail.tour.year}
                  </span>
                </div>
                <div className="overview-box__detail">
                  <svg className="overview-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
                  </svg>
                  <span className="overview-box__label">Difficulty</span>
                  <span className="overview-box__text">Medium</span>
                </div>
                <div className="overview-box__detail">
                  <svg className="overview-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-user"></use>
                  </svg>
                  <span className="overview-box__label">Participants</span>
                  <span className="overview-box__text">
                    {tourdetail.tour.maxGroupSize} people
                  </span>
                </div>
                <div className="overview-box__detail">
                  <svg className="overview-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-star"></use>
                  </svg>
                  <span className="overview-box__label">Rating</span>
                  <span className="overview-box__text">
                    {tourdetail.tour.ratingsAverage} / 5
                  </span>
                </div>
              </div>

              <div className="overview-box__group">
                <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

                <div className="overview-box__detail">
                  <img
                    src="img/users/user-1.jpg"
                    alt="Lead guide"
                    className="overview-box__img"
                  />
                  <span className="overview-box__label">Lead guide</span>
                  <span className="overview-box__text">Steven Miller</span>
                </div>
                <div className="overview-box__detail">
                  <img
                    src="img/users/user-2.jpg"
                    alt="Tour guide"
                    className="overview-box__img"
                  />
                  <span className="overview-box__label">Tour guide</span>
                  <span className="overview-box__text">Lisa Brown</span>
                </div>
                <div className="overview-box__detail">
                  <img
                    src="img/users/user-3.jpg"
                    alt="Intern"
                    className="overview-box__img"
                  />
                  <span className="overview-box__label">Intern</span>
                  <span className="overview-box__text">Max Smith</span>
                </div>
              </div>
            </div>
          </div>

          <div className="description-box">
            <h2 className="heading-secondary ma-bt-lg">
              About the park camper tour
            </h2>
            <p className="description__text">{tourdetail.tour.description}</p>
          </div>
        </section>

        <section className="section-pictures">
          <div className="picture-box">
            <img
              className="picture-box__img picture-box__img--1"
              src="/img/tours/tour-5-1.jpg"
              alt="The Park Camper Tour 1"
            />
          </div>
          <div className="picture-box">
            <img
              className="picture-box__img picture-box__img--2"
              src="/img/tours/tour-5-2.jpg"
              alt="The Park Camper Tour 1"
            />
          </div>
          <div className="picture-box">
            <img
              className="picture-box__img picture-box__img--3"
              src="/img/tours/tour-5-3.jpg"
              alt="The Park Camper Tour 1"
            />
          </div>
        </section>
        <section className="section-reviews">
          <div className="reviews">
            <div className="reviews__card">
              <div className="reviews__avatar">
                <img
                  src="/img/users/user-3.jpg"
                  alt="Jim Brown"
                  className="reviews__avatar-img"
                />
                <h6 className="reviews__user">Jim Brown</h6>
              </div>
              <p className="reviews__text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                dignissimos sint quo commodi corrupti accusantium veniam saepe
                numquam.
              </p>
              <div className="reviews__rating">
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
              </div>
            </div>

            <div className="reviews__card">
              <div className="reviews__avatar">
                <img
                  src="/img/users/user-1.jpg"
                  alt="Laura Wilson"
                  className="reviews__avatar-img"
                />
                <h6 className="reviews__user">Laura Wilson</h6>
              </div>
              <p className="reviews__text">
                Veniam adipisci blanditiis, corporis sit magnam aperiam ad, fuga
                reiciendis provident deleniti cumque similique itaque animi,
                sapiente obcaecati beatae accusantium.
              </p>
              <div className="reviews__rating">
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--inactive">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
              </div>
            </div>

            <div className="reviews__card">
              <div className="reviews__avatar">
                <img
                  src="/img/users/user-2.jpg"
                  alt="Ben Hadley"
                  className="reviews__avatar-img"
                />
                <h6 className="reviews__user">Ben Hadley</h6>
              </div>
              <p className="reviews__text">
                Debitis, nesciunt itaque! At quis officia natus. Suscipit,
                reprehenderit blanditiis mollitia distinctio ducimus porro
                tempore perspiciatis sunt vel.
              </p>
              <div className="reviews__rating">
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
              </div>
            </div>

            <div className="reviews__card">
              <div className="reviews__avatar">
                <img
                  src="/img/users/user-3.jpg"
                  alt="Alexander Jones"
                  className="reviews__avatar-img"
                />
                <h6 className="reviews__user">Alexander Jones</h6>
              </div>
              <p className="reviews__text">
                Quaerat laborum eveniet ut aut maiores doloribus mollitia
                aperiam quis praesentium sed inventore harum aliquam veritatis
                at adipisci ea assumenda!
              </p>
              <div className="reviews__rating">
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
              </div>
            </div>

            <div className="reviews__card">
              <div className="reviews__avatar">
                <img
                  src="/img/users/user-1.jpg"
                  alt="Ayla Cornell"
                  className="reviews__avatar-img"
                />
                <h6 className="reviews__user">Ayla Cornell</h6>
              </div>
              <p className="reviews__text">
                Perferendis quo aliquid iste quas laboriosam molestias illo est
                voluptatem odit ea. Vero placeat culpa provident dicta maiores!
              </p>
              <div className="reviews__rating">
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
                <svg className="reviews__star reviews__star--active">
                  <use xlinkHref="/img/icons.svg#icon-star"></use>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="section-cta">
          <div className="cta">
            <div className="cta__img cta__img--logo">
              <img src="/img/logo-white.png" alt="Natours logo" className="" />
            </div>
            <img
              src="/img/tours/tour-5-2.jpg"
              alt=""
              className="cta__img cta__img--1"
            />
            <img
              src="/img/tours/tour-5-1.jpg"
              alt=""
              className="cta__img cta__img--2"
            />

            <div className="cta__content">
              <h2 className="heading-secondary">What are you waiting for?</h2>
              <p className="cta__text">
                10 days. 1 adventure. Infinite memories. Make it yours today!
              </p>
              <button
                className="btn btn--green span-all-rows"
                data-tourid={tourdetail.tour.id}
                onClick={BookTours}
              >
                Book tour now!
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
};

export default TourDetailsN;
