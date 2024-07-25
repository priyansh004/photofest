import React from 'react';
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from 'react-redux';
import { signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store"; // You'll need to create this type

// Interface for the user data structure based on your model
interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    posts?: string[];
    isAdmin: boolean;
    googleId?: string;
    profilePic?: string;
    displayName?: string;
}

const Oauth: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const user = resultsFromGoogle.user;
         
            const res = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/auth/google`, {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    googlePhotoUrl: user.photoURL,
                    googleId: user.uid,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to authenticate with backend');
            }

            const data: IUser = await res.json();
            console.log(data);
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            console.error("Google sign-in error:", error);
            // Here you might want to show an error message to the user
        }
    };

    return (
        <Button
            type="button"
            gradientDuoTone="pinkToOrange"
            outline
            onClick={handleGoogleClick}
        >
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue with Google
        </Button>
    );
}

export default Oauth;