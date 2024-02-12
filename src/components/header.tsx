import { useState } from "react";
import {
    FaSearch,
    FaShoppingBag,
    FaSignInAlt,
    FaSignOutAlt,
    FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
    user: User | null;
}

const Header = ({ user }: PropsType) => {
    const [isopen, setIsopen] = useState(false);

    const logoutHandler = async () => {
        try {
            await signOut(auth);
            toast.success("Sign Out Successfully");
            setIsopen(false);
        } catch (error) {
            toast.error("Sign Out Fail");
        }
    };

    return (
        <nav className="header">
            <Link to="/" onClick={() => setIsopen(false)}>
                HOME
            </Link>
            <Link to="/search" onClick={() => setIsopen(false)}>
                <FaSearch />
            </Link>
            <Link to="/cart" onClick={() => setIsopen(false)}>
                <FaShoppingBag />
            </Link>

            {user?._id ? (
                <>
                    <button onClick={() => setIsopen((prev) => !prev)}>
                        <FaUser />
                    </button>
                    <dialog open={isopen}>
                        <div>
                            {user?.role === "admin" && (
                                <Link
                                    to={"/admin/dashboard"}
                                    onClick={() => setIsopen(false)}>
                                    Admin
                                </Link>
                            )}
                        </div>
                        <div>
                            <Link
                                to={"/orders"}
                                onClick={() => setIsopen(false)}>
                                Orders
                            </Link>
                        </div>
                        <button onClick={logoutHandler}>
                            <FaSignOutAlt />
                        </button>
                    </dialog>
                </>
            ) : (
                <Link to="/login">
                    <FaSignInAlt />
                </Link>
            )}
        </nav>
    );
};

export default Header;
