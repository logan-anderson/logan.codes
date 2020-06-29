import { createContext, Dispatch, SetStateAction, FC, Component } from 'react'
import { Tag } from '../../interfaces'



interface Test {
    tags: Tag[],
    setTags: Dispatch<SetStateAction<Tag[]>>
}

// @ts-ignore
export const TagContext = createContext<Test>(null)
