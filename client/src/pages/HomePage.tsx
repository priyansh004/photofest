import { RootState } from "../redux/store"
import { useSelector } from "react-redux"
const HomePage: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser)   

    return(
        <div>
            {currentUser.displayName }
        </div>
    )
}

export default HomePage