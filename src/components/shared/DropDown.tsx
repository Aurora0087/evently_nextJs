
import React, { startTransition, useEffect, useState } from 'react'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Category, { ICategory } from '@/lib/database/models/category.model'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { createCategory, getAllCategory } from '@/lib/actions/category.actions'



type DropdownProps = {
    value: string,
    onChangeHandeler: () => void
}

function DropDown({ onChangeHandeler, value }: DropdownProps) {
    const [catagories, setCatagories] = useState<ICategory[]>([
    ])

    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        createCategory({
            categoryName: newCategory.trim()
        }).then((Category) => {
            setCatagories((prevState)=>[...prevState, Category])
        })
    }

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategory()
            categoryList && setCatagories(categoryList as ICategory[])
        }

        getCategories()
    },[])

    return (
        <Select onValueChange={onChangeHandeler} defaultValue={value}>
            <SelectTrigger className=" w-full">
                <SelectValue placeholder="Catagory" />
            </SelectTrigger>
            <SelectContent className=' py-2'>
                {
                    catagories.length > 0 && catagories.map((catagory) => (
                        <SelectItem
                            className=''
                            key={catagory.id} value={catagory._id}>{catagory.name}</SelectItem>
                    ))
                }
                <AlertDialog>
                    <AlertDialogTrigger className=' w-full rounded-sm text-gray-500 hover:bg-slate-100 hover:text-gray-900 py-2'>+ add catagory</AlertDialogTrigger>
                    <AlertDialogContent className=' bg-slate-50'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type='text' placeholder='Category name' onChange={(e)=>setNewCategory(e.target.value)}/>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=> startTransition(handleAddCategory)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>

    )
}

export default DropDown