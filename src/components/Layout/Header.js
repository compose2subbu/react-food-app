import classes from './Header.module.css'
import {Fragment} from 'react';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onUserClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt='Dinner is just a click away!'></img>
            </div>
        </Fragment>
    );

};

export default Header;