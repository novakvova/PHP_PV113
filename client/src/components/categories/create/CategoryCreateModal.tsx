import Modal from "../../ui/Modal.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCEPTED_IMAGE_MIME_TYPES, MAX_FILE_SIZE } from "../../../constants";
import { Input } from "../../ui/Input.tsx";
import { Button } from "../../ui/Button.tsx";
import Label from "../../ui/Label.tsx";
import FormError from "../../ui/FormError.tsx";
import { useAddCategoryMutation } from "../../../services/category.ts";
import { useEffect } from "react";
import { IconCirclePlus, IconCircleX, IconLoader } from "@tabler/icons-react";
import Title from "../../ui/Title.tsx";
import showToast from "../../../utils/showToast.ts";

type CreateCategoryProps = {
    open: boolean;
    close: () => void;
};
type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

const CreateCategorySchema = z.object({
    name: z.string().trim().min(3).max(20),
    description: z.string().trim().min(3).max(50),
    image: z
        .any()
        .refine((files) => files?.length == 1, "Image is required.")
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
            (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp files are accepted.",
        ),
});

const CategoryCreateModal = (props: CreateCategoryProps) => {
    const { open, close } = props;
    // const showToast = useToast();
    const [createCategory, { isLoading }] = useAddCategoryMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateCategorySchemaType>({ resolver: zodResolver(CreateCategorySchema) });

    useEffect(() => {
        reset();
    }, [open, reset]);

    const onSubmit = handleSubmit(async (data) => {
        console.log({ ...data, image: data.image[0] });
        try {
            await createCategory({ ...data, image: data.image[0] }).unwrap();
            showToast(`Category ${data.name} successful created!`, "success");
            close();
        } catch (err) {
            console.log(err);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            showToast(`Error created ${data.name} category! ${err.error}`, "error");
        }
    });

    return (
        <Modal {...props}>
            <Title className="pb-5">Create new category</Title>
            <form className="flex flex-col gap-5" onSubmit={onSubmit}>
                <Label htmlFor="name">Name</Label>
                <Input {...register("name")} id="name" placeholder="Name..." />
                {errors?.name && <FormError errorMessage={errors?.name?.message as string} />}

                <Label htmlFor="description">Description</Label>
                <Input {...register("description")} id="description" placeholder="Description..." />
                {errors?.description && <FormError errorMessage={errors?.description?.message as string} />}

                <Label htmlFor="image">Image</Label>
                <Input {...register("image")} id="image" variant="file" type="file" placeholder="Image..." />
                {errors?.image && <FormError errorMessage={errors?.image?.message as string} />}

                <div className="flex w-full items-center justify-center gap-5">
                    <Button disabled={isLoading} size="lg" type="submit">
                        {isLoading ? (
                            <>
                                <IconLoader />
                                Loading...
                            </>
                        ) : (
                            <>
                                <IconCirclePlus />
                                Create
                            </>
                        )}
                    </Button>
                    <Button disabled={isLoading} size="lg" type="button" variant="cancel" onClick={() => reset()}>
                        <IconCircleX />
                        Reset
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CategoryCreateModal;