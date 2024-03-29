import React, { Fragment, useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Auth from '../context/contextAuth';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router';
import Itemsuser from '../components/ItemsUsers'
import Footer from '../components/Footer';


const Profile = (props) => {

    const { token, userId, isAdmin } = useContext(Auth)
    const history = useHistory();
    const [data, setData] = useState([])
    const [refreche, setRefreche] = useState(false);


    useEffect((e) => {
        axios.get(`http://localhost:8000/api/auth/users/${userId}`,
            { headers: { 'Authorization': 'Bearer ' + token } })
            .then((res) => {
                setData([res.data])
            }).catch((error) => {
                console.log(error);
            });
    }, [token, userId, refreche]);

    const submitRederiger= (e) => {

        history.push("/Salaries");
    }   



    return (
        <Fragment>
            <Header />
            <main className=" container">
                <section className=" row d-flex flex-column align-content-center align-items-center "  >
                    <article class="card col col-10  col-md-8 col-lg-6  mt-3 mb-3" >
                        <ul className="  ">
                            {
                                data.map((user) => {
                                    return <Itemsuser key={user.id} user={user} setRefreche={setRefreche} refreche={refreche} />
                                })
                            }
                        </ul>
                        <div>
                            {
                                (isAdmin) && (
                                    <div>
                                        <span className=' text-left mr-5'>voir tous les utilisateurs</span>
                                        <button onClick={submitRederiger} className="btn-upload mt-2 p-2 bg-primary">Voir plus </button>
                                    </div>
                                )
                            }
                            <div className='mt-4 mb-5'>
                                <Link className=' font-weight-bolder  mb-4' to="/Publication">retour à  la publication</Link>
                            </div>

                        </div>

                    </article>
                </section>
            </main>

            <Footer />
        </Fragment>
    )
}
export default Profile;


