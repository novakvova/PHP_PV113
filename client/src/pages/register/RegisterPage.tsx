import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "../../components/ui/Button.tsx";
import FileUpload from "../../components/ui/FileUpload.tsx";
import FormError from "../../components/ui/FormError.tsx";
import {Input} from "../../components/ui/Input.tsx";
import Label from "../../components/ui/Label.tsx";
import {ChangeEvent, useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useAddUserMutation} from "../../services/auth.ts";
import showToast from "../../utils/showToast.ts";
import {z} from "zod";
import {ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE} from "../../constants";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";


export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;

export const CreateUserSchema = z
    .object({
        email: z.string().trim().email(),
        phone: z
            .string()
            .trim()
            .min(6)
            .max(20)
            .regex(/^(\+\d{1,3})?\d{6,20}$/, "Phone number is not valid."),
        password: z.string().trim().min(6).max(20),
        confirmPassword: z.string().trim().min(6).max(20),
        name: z
            .string()
            .trim()
            .min(3)
            .max(20)
            .regex(/^[a-zA-Zа-яА-ЯґҐєЄіІїЇ\s]+$/, "Only letters are allowed"),
        image: z
            .any()
            .refine((files) => files?.length == 1, "Image is required.")
            .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
            .refine(
                (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
                "Only .jpg, .jpeg, .png and .webp files are accepted.",
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });
const RegisterPage = () => {

    const { executeRecaptcha } = useGoogleReCaptcha();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateUserSchemaType>({resolver: zodResolver(CreateUserSchema)});

    const [addUser, {isLoading}] = useAddUserMutation();
    const [previewImage, setPreviewImage] = useState<string | undefined>();
    const navigate = useNavigate();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const file = input.files && input.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            if(!executeRecaptcha) {
                showToast(`Привіт бот :(`, "error");
                return;
            }
            const recaptchaToken = await executeRecaptcha();
            await addUser({...data, image: data.image[0], recaptchaToken}).unwrap();
            showToast(`User ${data.name} successful created!`, "success");
            navigate("/login");
        } catch (err) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            showToast(`Error created ${data.name} User! ${err.error}`, "error");
        }
    });

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="shop.ico" alt="Your Company"/>
                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create new your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-3" onSubmit={onSubmit}>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <div className="mt-2  flex flex-col gap-y-2">
                                <Input {...register("name")} id="name" type="text" autoComplete="name"
                                       placeholder="Name..."/>
                                {errors?.name && <FormError errorMessage={errors?.name?.message as string}/>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="mt-2  flex flex-col gap-y-2">
                                <Input
                                    {...register("email")}
                                    id="email"
                                    autoComplete="email"
                                    type="email"
                                    placeholder="Email..."
                                />
                                {errors?.email && <FormError errorMessage={errors?.email?.message as string}/>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <div className="mt-2  flex flex-col gap-y-2">
                                <Input {...register("phone")} id="phone" type="tel" autoComplete="tel"
                                       placeholder="Phone..."/>
                                {errors?.phone && <FormError errorMessage={errors?.phone?.message as string}/>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="mt-2  flex flex-col gap-y-2">
                                <Input
                                    id="password"
                                    {...register("password")}
                                    required
                                    type="password"
                                    placeholder="Password..."
                                />
                                {errors?.password && <FormError errorMessage={errors?.password?.message as string}/>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Password</Label>
                            <div className="mt-2  flex flex-col gap-y-2">
                                <Input
                                    id="confirmPassword"
                                    {...register("confirmPassword")}
                                    required
                                    type="password"
                                    placeholder="Confirm Password..."
                                />
                                {errors?.confirmPassword && (
                                    <FormError errorMessage={errors?.confirmPassword?.message as string}/>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="image">Image</Label>
                            <FileUpload preview={previewImage}>
                                <Input
                                    {...register("image")}
                                    onChange={handleFileChange}
                                    id="image"
                                    variant="file"
                                    type="file"
                                />
                            </FileUpload>
                            {errors?.image && <FormError errorMessage={errors?.image?.message as string}/>}
                        </div>

                        <div>
                            <Button disabled={isLoading} type="submit">
                                Sign up
                            </Button>
                        </div>
                    </form>


                    <p className="mt-10 text-center text-sm text-gray-500">
                        There is an account?{" "}
                        <Link to="/login" className="font-semibold leading-6 text-orange-500 hover:text-orange-600">
                            Sing in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;