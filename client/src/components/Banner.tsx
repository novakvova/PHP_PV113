import { IconLoader, IconSend, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useVerifyMutation } from "../services/auth.ts";
import { selectCurrentUser } from "../store/slice/authSlice.ts";
import { useAppSelector } from "../store";
import showToast from "../utils/showToast.ts";

export default function Banner() {
    const [showBanner, setShowBanner] = useState<boolean>(true);
    const [verify, { isLoading }] = useVerifyMutation();
    const user = useAppSelector(selectCurrentUser);

    const handleConfirmEmail = async () => {
        if (user) {
            const res = await verify({ email: user.email });

            if ("data" in res) {
                setShowBanner(false);
                showToast(`Verification email sent to ${user.email}! Check your inbox.`, "success");
            } else {
                showToast(`Error sent verification email!`, "error");
            }
        }
    };

    return (
        showBanner && (
            <div className="relative flex isolate items-center gap-x-6 overflow-hidden bg-black px-6 py-2.5 sm:px-3.5 sm:before:flex-1 md:ml-64">
                <div
                    className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                        style={{
                            clipPath:
                                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                        }}
                    />
                </div>
                <div
                    className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
                        style={{
                            clipPath:
                                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
                        }}
                    />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                    <p className=" text-sm leading-6 text-white">
                        <strong className="font-semibold">Email is not verified</strong>
                        <svg
                            viewBox="0 0 2 2"
                            className="hidden xl:inline mx-2 h-0.5 w-0.5 fill-current"
                            aria-hidden="true"
                        >
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <strong className="hidden xl:inline">Please confirm your email to get full access.</strong>
                    </p>
                    <button
                        disabled={isLoading}
                        type="button"
                        onClick={handleConfirmEmail}
                        className="flex items-center gap-x-2 rounded-full bg-white px-3.5 py-1 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 disabled:bg-gray-400 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                    >
                        Send email
                        <span aria-hidden="true">{!isLoading ? <IconSend /> : <IconLoader />}</span>
                    </button>
                </div>
                <div className="flex flex-1 justify-end">
                    <button
                        onClick={() => setShowBanner(false)}
                        type="button"
                        className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
                    >
                        <span className="sr-only">Dismiss</span>
                        <IconX className="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>
        )
    );
}