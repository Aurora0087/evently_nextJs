'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { Input } from "@/components/ui/input"
import { formSchema } from "@/lib/validator"
import { eventDefaultValues } from "@/constants"
import DropDown from "./DropDown"
import { Textarea } from "../ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import { Calendar } from "../ui/calendar"
import { Checkbox } from "../ui/checkbox"

import { useUploadThing } from "@/lib/uploadthing"
import { useRouter } from "next/navigation"
import { CreateEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"


type EventFormProps = {
    userId: string,
    type: "create" | "update",
    event?: IEvent,
    eventId?: string,
}

function EventForm({ userId, type,event,eventId }: EventFormProps) {

    const initValues = event && type==='update' ? {...event, startDateTime: new Date(event.startDateTime), endDateTime: new Date(event.endDateTime)} : eventDefaultValues;

    const router = useRouter()

    const {startUpload} = useUploadThing('imageUploader')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initValues,
    })


    const [files, setFiles] = useState<File[]>([]);

    async function onSubmit(values: z.infer<typeof formSchema>) {

        let uploadImageUrl = values.imageUrl

        console.log(uploadImageUrl)


        if (uploadImageUrl.length > 0 && event?.imageUrl!=uploadImageUrl) {
            const uploadImages = await startUpload(files)

            if (!uploadImages) {
                return
            }

            uploadImageUrl = uploadImages[0].url
        }

        if (type === 'create') {
            try {
                
                const newEvent = await CreateEvent({
                    event: { ...values, imageUrl: uploadImageUrl },
                    userId,
                    path :'/profile'
                })

                if (newEvent) {
                    form.reset()
                    router.push(`/events/${newEvent._id}`)
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (type === 'update') {

            if (!eventId) {
                router.back();
                return;
            }
            try {
                
                const updatedEvent = await updateEvent({
                    event: { ...values, imageUrl: uploadImageUrl, _id:eventId },
                    userId,
                    path :`/event/${eventId}`
                })

                if (updatedEvent) {
                    form.reset()
                    router.push(`/events/${updatedEvent._id}`)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-6">
                <div className="flex flex-col gap-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <DropDown onChangeHandeler={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="description" {...field}
                                        className=" rounded-2xl" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value}
                                        setFiles={setFiles} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className=" flex rounded-lg border-2 bg-white pl-4 w-full">
                                        <Image
                                            src='/assets/icons/location-grey.svg'
                                            alt="loc"
                                            width={24}
                                            height={24} />
                                        <Input className=" bg-white border-0" placeholder="location" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className=" w-full flex gap-4 sm:flex-row flex-col">
                        <div className=" w-full">
                            <FormField
                                control={form.control}
                                name="startDateTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex gap-y-4 flex-col">
                                            <Popover>
                                                <PopoverTrigger asChild className="">
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                " w-full pl-3 text-left font-normal flex gap-6",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <p className=" whitespace-nowrap text-slate-500">Start date</p>
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <Image
                                                                src='/assets/icons/calendar.svg'
                                                                alt="loc"
                                                                width={24}
                                                                height={24} />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date: Date) =>
                                                            date < new Date()
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </div>

                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className=" w-full">
                            <FormField
                                control={form.control}
                                name="endDateTime"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex gap-y-4 flex-col ">
                                            <Popover>
                                                <PopoverTrigger asChild className="">
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal flex gap-6",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <p className=" whitespace-nowrap text-slate-500">End date</p>
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <Image
                                                                src='/assets/icons/calendar.svg'
                                                                alt="loc"
                                                                width={24}
                                                                height={24} />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date: Date) =>
                                                            date < new Date()
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>

                    </div>

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="flex bg-white border-2 gap-4 rounded-sm">
                                        <Input type="number" placeholder="₹ price" {...field}
                                            className=" border-0"
                                        />
                                        <FormField
                                            control={form.control}
                                            name="isFree"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="flex gap-4 items-center w-full whitespace-nowrap pr-4 h-full">
                                                            <label htmlFor="isFree">Free Ticket</label>
                                                            <Checkbox id="isFree"
                                                                onCheckedChange={field.onChange}
                                                                checked={field.value} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Event link" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? ('submitting...') :
                        `${type} event`}
                </Button>
            </form>
        </Form>
    )
}

export default EventForm