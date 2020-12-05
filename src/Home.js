import React from 'react';
import './Home.css';

const Home = ( { history } ) => 
{
    return (
        <div>
            <center id='home'>
            findyourcolor
            </center>
            <div id="btn_group">
                <button id="soo_btn1" onClick={ () => {history.push("/image")}}>image</button>
                <button id="soo_btn2" onClick={ () => {history.push("/test")}}>test</button>
            </div>
        </div>
    );
}

export default Home;