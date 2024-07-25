import { RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { BackgroundBoxesDemo } from "../UI/Background"
const HomePage: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser)

    return (
        < div className="w-screen h-auto">
            <BackgroundBoxesDemo />
            {currentUser ? <h1 className="text-center text-4xl text-white">Welcome {currentUser.username}</h1> : <h1 className="text-center text-4xl text-white">Welcome to PhotoFest</h1>}
        </div>


    )
}

export default HomePage