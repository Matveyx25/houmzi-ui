import React from 'react';
import s from './banner.module.scss';

export const Banner: React.FC = () => (
  <section className={s.content}>
    <h1 className={s.title}>
      About <span>us</span>
    </h1>
    <div className={s.text}>
      <p>
        We are the leading real estate and rental marketplace dedicated to empowering consumers with data,
        inspiration and knowledge around the place they call home, and connecting them with the best local
        professionals who can help.
      </p>
      <p>
        Our serves the full lifecycle of owning and living in a home: buying, selling, renting, financing,
        remodeling and more. It starts with us living database of more than 110 million U.S. homes - including homes
        for sale, homes for rent and homes not currently on the market, as well as Zestimate home values, Rent
        Zestimates and other home-related information. We operate the most popular suite of mobile real estate apps,
        with more than two dozen apps across all major platforms.
      </p>
    </div>
    <img className={s.img} src="/images/about-us.svg" alt="About us image"/>
  </section>
);
