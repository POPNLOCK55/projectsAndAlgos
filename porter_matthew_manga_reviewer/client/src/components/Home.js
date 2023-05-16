import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';




const Home = ({loggedUser, setLoggedUser}) => {

    const [allUsers, setAllUsers] = useState([])
    const [allReviews, setAllReviews] = useState([])
    const navigate = useNavigate()


    // const logoutUser = (e) => {
    //     axios.post("http://localhost:8000/api/logout",
    //         { withCredentials: true })
    //         .then(response => {
    //             console.log("successfully logged out!")
    //             console.log(response.data)
    //             navigate('/register')
    //         })
    //         .catch(err => {
    //             console.log(err.config.data)
    //             console.log("err is:", err)
    //         })
    // }
    useEffect(() => {
        axios.get("http://localhost:8000/api/reviews")
            .then(response => {
                console.log(response)
                setAllReviews(response.data)
            }).catch(err => console.log(err))
    }, [])


    return (
        <div>
            {/* <Link onClick={logoutUser}>logout</Link> */}
            <h1>Welcome!</h1>
            <Link to={"/review/create"}>Write a Review!</Link>
            {allReviews.map((review, index) => {
                return <div key={index}>
                    <h2>{review.reviewTitle}</h2>
                    <Link to={`/reviews/${review._id}`}>Read full review</Link>
                    <p>Reviewed Manga: {review.mangaTitle}</p>
                    <p>Score: {review.rating}</p>
                    <p>Reviewed by: {review.reviewCreator?.firstName}</p>
                    <Link to={`/review/edit/${review._id}`}>Edit Review</Link>
                </div>
            })}
        </div>
    )
}
export default Home

