/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import BookBlock from './bookBlock';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: '',
    };
  }

  render() {
    return (
      <>
        <ul>
          <p>Категории</p>
          <li>Бестселлеры</li>
          <li>Психология</li>
          <li>Искусство, дизайн и мода</li>
          <li>Бизнес-книги</li>
          <li>Художественная литература</li>
        </ul>
        <ul>
          <p>Авторы</p>
          <li>Пушкин</li>
          <li>Толстой</li>
          <li>Онегин</li>
          <li>Блок</li>
          <li>Карамзин</li>
        </ul>
        <div>
          <p>Рейтинг</p>
          <div>
            <input type="number" name="RatingFrom" id="" placeholder="От" />
            <input type="number" name="RatingTo" id="" placeholder="До" />
          </div>
        </div>
        <div>
          <p>Цена</p>
          <div>
            <input type="number" name="PriceFrom" id="" placeholder="От" />
            <input type="number" name="PriceTo" id="" placeholder="До" />
          </div>
        </div>
        <h4>Counter</h4>
        <p>1 2 3 4 5 6 7</p>
        <select name="" id="">
          <option>По умолчанию</option>
          <option>Цена</option>
          <option>Рейтинг</option>
          <option>Имя</option>

        </select>
        <BookBlock />
      </>
    );
  }
}
export default MainPage;
