import { useEffect, useState } from "react";
import { axiosPublic } from "../../Hooks/useAxiosPublic";
import axios from "axios";

const Testimonials = () => {
    const [feedback, setFeedback] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axiosPublic.get('/landmarkFeedback')
            .then(res => setFeedback(res.data))
    }, [refresh])

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedback = document.querySelector('textarea[name="feedback"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const name = document.querySelector('input[name="name"]').value;
        // console.log(name, email, feedback);

        axiosPublic.post('/addFeedback', { name, email, feedback })
            .then(res => {
                console.log(res.data);
                setRefresh(!refresh);
            })

    }

    console.log(feedback);


    return (
        <div className="mx-28 p-10 bg-[#f1f0eb] font-openSans">
            <div>
                <p className="text-black font-bold text-4xl font-openSans">Your feedback <br /> matters the most</p>
                <p className="text-black text-xl font-openSans my-5">Please feel free to share what you feel about us.</p>
            </div>
            <div className="flex justify-center items-center">
                <div className="card w-96 bg-base-100 card-md shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Please write your feedback here.</h2>
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend mb-2">Email</legend>
                                <input name='email' type="email" className="input border border-1 border-black max-w-full" placeholder="Type your email`" required />
                            </fieldset>
                            <fieldset className="fieldset mb-2">
                                <legend className="fieldset-legend mb-2">Name</legend>
                                <input name='name' type="text" className="input border border-1 border-black max-w-full" placeholder="Type your name`" required />
                            </fieldset>
                            <textarea name='feedback' placeholder="Feedback" className="textarea textarea-info" required></textarea>
                            <div className="justify-end card-actions">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                {
                    feedback && feedback.map((feedback, idx) => {
                        return (
                            <div key={idx} className="card card-border bg-base-100 w-96 font-openSans">
                                <div className="card-body">
                                    <p>{feedback.feedback}</p>
                                    <div className="flex">
                                        <div className="avatar">
                                            <div className="w-16 rounded-full">
                                                <img src="/New Images/icon-7797704_1920.png" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col ml-5">
                                            <p className="text-black font-bold font-openSans">{feedback.name}</p>
                                            <p className="text-black font-openSans">{feedback.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Testimonials;