import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.css';
import axios from 'axios';
import Error from './Error';
import Footer from './Footer';
const TourPageN = () => {
  const params = useLocation();
  const [tour, settour] = useState();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const getTour = async () => {
    try {
      const response = await axios.get(
        'https://apifortour.onrender.com/api/v1/tours'
      );
      if (response.data) {
        settour(response.data.tours);
      }
      console.log('tour response is ', response.data);
    } catch (err) {
      <Error />;
    }
  };

  useEffect(() => {
    getTour();
  }, []);

  if (tour) {
    return (
      <div id="alltourscontainer">
        <main className="main">
          <div className="card-container">
            {tour.map((tour, index) => {
              return (
                <div className="card" key={index}>
                  <div className="card__header">
                    <div className="card__picture">
                      <div className="card__picture-overlay">&nbsp;</div>
                      <img
                        src={`/img/tours/${tour.imageCover}`}
                        alt="Tour 1"
                        className="card__picture-img"
                      />
                    </div>

                    <h3 className="heading-tertirary">
                      <span>{tour?.name}</span>
                    </h3>
                  </div>

                  <div className="card__details">
                    <h4 className="card__sub-heading">{tour.subheading}</h4>
                    <p className="card__text">{tour?.summary}</p>
                    <div className="card__data">
                      <svg className="card__icon">
                        <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                      </svg>
                      <span>{tour.location}</span>
                    </div>
                    <div className="card__data">
                      <svg className="card__icon">
                        <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                      </svg>
                      <span>{tour.year}</span>
                    </div>
                    <div className="card__data">
                      <svg className="card__icon">
                        <use xlinkHref="/img/icons.svg#icon-flag"></use>
                      </svg>
                      <span>{tour.stops}</span>
                    </div>
                    <div className="card__data">
                      <svg className="card__icon">
                        <use xlinkHref="/img/icons.svg#icon-user"></use>
                      </svg>
                      <span>{tour.totalPeople} people</span>
                    </div>
                  </div>

                  <div className="card__footer">
                    <p>
                      <span className="card__footer-value">$ {tour.price}</span>
                      <span className="card__footer-text">per person</span>
                    </p>
                    <p className="card__ratings">
                      <span className="card__footer-value">
                        {tour.ratingsAverage}
                      </span>
                      <span className="card__footer-text">
                        rating ({tour.ratingsQuantity})
                      </span>
                    </p>
                    <button
                      className="btn btn--green btn--small"
                      onClick={async (e) => {
                        e.preventDefault();
                        try {
                          const response = await axios.get(
                            `https://apifortour.onrender.com/tour/${tour.slug}`
                          );
                          if (response) {
                            // console.log(response);
                            if (user)
                              localStorage.setItem(
                                'tourdetail',
                                JSON.stringify(response.data)
                              );
                            navigate('/tourdetail');
                          }
                        } catch (err) {
                          <Error error={err.message} />;
                        }
                      }}
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <h1>You are not Login Please Login to Book your Tour</h1>
      </>
    );
  }
};

export default TourPageN;
