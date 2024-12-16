import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';



const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(loginUser({ email, password }));

            if (loginUser.fulfilled.match(resultAction)) {
                navigate('/');
                toast.success("Login Successfull");
            } else {
                toast.error("Invalid user details");
            }
            
        } catch (error:any) {
            console.error(error);
        }
    };

    return (
        <div className="flex h-[90vh] w-full justify-around items-center bg-black text-white">
            <div className=' h-full w-full hidden md:flex justify-center items-center'>
                <img src="/image.png" alt="" className=' h-[32rem] w-[22rem] rounded-[8%] object-cover' />
                <img
                    src="https://levitation.in/wp-content/uploads/2023/12/Frame-39624.svg"
                    alt="Levitation Infotech Logo"
                    className="w-34 h-12 absolute bottom-14"
                    width="141"
                    height="48"
                />
            </div>
            <div className="w-full shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                <h2 className=" text-2xl font-bold mb-4">Let the Journey Begin!</h2>
                <h3 className='text-gray-400 mb-6 w-[70%]'>This is basic login page which is used for levitation assignment purpose.</h3>
                <div className="mb-4 w-[70%]">
                        <label className="block  text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-[#282928] border-[#6d776d]"
                            id="email"
                            type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                            placeholder="Enter Email ID"
                        />
                        <h1 className='text-gray-400'>This email will be displayed with your inquiry</h1>
                    </div>

                <div className="mb-6 w-[70%]">
                        <label className="block  text-sm font-bold mb-2" htmlFor="password">Current Password</label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-[#282928] border-[#6d776d]"
                            id="password"
                            type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name='password'
                            placeholder="Enter the Password"
                        />
                        <h1 className='text-gray-400'>Any further updates will be forwarded on this Email ID</h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <button
                            className="bg-[#282928] text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}
                        >
                            Login now
                        </button>
                        <h1 className='text-gray-400'>Forget password?</h1>
                </div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className=' absolute left-0 bottom-0 backgroundstyle shadow-[50px_0px_200px_120px_green] rounded-full'></div>
            <div className=' absolute right-0 top-[30%] backgroundstyle shadow-[10px_50px_500px_100px_violet] rounded-full'></div>
        </div>
    );
};

export default Login;
