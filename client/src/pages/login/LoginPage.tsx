import { zodResolver } from "@hookform/resolvers/zod";
import GoogleAuth from "../../components/GoogleAuth.tsx";
import { Button } from "../../components/ui/Button.tsx";
import FormError from "../../components/ui/FormError.tsx";
import { Input } from "../../components/ui/Input.tsx";
import Label from "../../components/ui/Label.tsx";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/auth.ts";
import { setCredentials } from "../../store/slice/authSlice.ts";
import { useAppDispatch } from "../../store";
import { CurrentUser } from "../../interfaces/auth";

import { jwtParser } from "../../utils/jwtParser.ts";
import showToast from "../../utils/showToast.ts";
import { z } from "zod";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";


type LoginSchemaType = z.infer<typeof LoginSchema>;

const LoginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().trim().min(6).max(20),
});
const LoginPage = () => {

    const { executeRecaptcha } = useGoogleReCaptcha();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const onSubmit = handleSubmit(async (data) => {
        if(!executeRecaptcha) {
            showToast(`Привіт бот :(`, "error");
            return;
        }

        const recaptchaToken = await executeRecaptcha();

        const res = await login({...data, recaptchaToken});

        if ("data" in res) {
            localStorage.setItem("authToken", res.data.token);

            dispatch(
                setCredentials({ user: jwtParser(res.data.token) as CurrentUser, accessToken: res.data.token }),
            );

            const { from } = location.state || { from: { pathname: "/" } };
            navigate(from);

            showToast(`Login successful!`, "success");
        } else {
            showToast(`Error login. Check login data!`, "error");
        }
    });

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="shop.ico" alt="Your Company" />
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-3" onSubmit={onSubmit}>
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <div className="mt-2  flex flex-col gap-y-2">
                                <Input

                                    {...register("email")}
                                    required
                                    type="email"
                                    autoComplete="email"
                                    id="email"
                                    placeholder="Email..."
                                />
                                {errors?.email && <FormError errorMessage={errors?.email?.message as string} />}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>

                            <div className="mt-2 flex flex-col gap-y-2">
                                <Input
                                    id="password"
                                    {...register("password")}
                                    required
                                    type="password"
                                    autoComplete="password"
                                    placeholder="Password..."
                                />
                                {errors?.password && <FormError errorMessage={errors?.password?.message as string} />}
                            </div>
                        </div>

                        <div>
                            <Button disabled={isLoading} type="submit">
                                Sign in
                            </Button>
                        </div>
                    </form>

                    <div className="mt-2 flex justify-center">
                        <GoogleAuth />
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link to="/register" className="font-semibold leading-6 text-orange-500 hover:text-orange-600">
                            Create new account
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;