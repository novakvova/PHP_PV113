import { IconLogout } from "@tabler/icons-react";
import { Button } from "../ui/Button.tsx";
import { logOut } from "../../store/slice/authSlice.ts";
import { useAppDispatch } from "../../store";
import { CurrentUser } from "../../interfaces/auth";
import { API_URL } from "../../utils/apiUrl.ts";

const UserCurrent = (props: CurrentUser) => {
    const { name, email, image } = props;
    const dispatch = useAppDispatch();

    return (
        <div className="flex items-center min-w-0 gap-x-4">
            <img
                className="w-10 h-10 flex-none rounded-full object-center object-cover bg-gray-50"
                src={`${API_URL}/upload/100_${image}`}
                alt={email}
            />
            <p className="hidden sm:block text-sm font-semibold leading-6 text-gray-900">{name}</p>
            <Button size="icon" variant="icon" aria-label="exit button" onClick={() => dispatch(logOut())}>
                <IconLogout />
            </Button>
        </div>
    );
};

export default UserCurrent;