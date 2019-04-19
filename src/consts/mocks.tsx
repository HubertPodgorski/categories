import { Category } from '../services/CategoriesService'

export const categoriesMock: Category[] = [
    {
        id: '1',
        parentId: '',
        name: 'Main category name 1',
    },
    {
        id: '2',
        parentId: '',
        name: 'Main category name 2',
    },
    {
        id: '3',
        parentId: '',
        name: 'Main category name 3',
    },
    {
        id: '4',
        parentId: '',
        name: 'Main category name 4',
    },
    {
        id: '5',
        parentId: '',
        name: 'Main category name 5',
    },
    {
        id: '6',
        parentId: '',
        name: 'Main category name 6',
    },
    {
        id: '7',
        parentId: '',
        name: 'Main category name 7',
    },
    {
        id: '8',
        parentId: '1',
        name: 'Sub category name 1',
    },
    {
        id: '9',
        parentId: '1',
        name: 'Sub category name 2',
    },
    {
        id: '10',
        parentId: '1',
        name: 'Sub category name 3',
    },
    {
        id: '11',
        parentId: '2',
        name: 'Sub category name 4',
    },
    {
        id: '12',
        parentId: '2',
        name: 'Sub category name 5',
    },
    {
        id: '13',
        parentId: '6',
        name: 'Sub category name 6',
    },
    {
        id: '14',
        parentId: '6',
        name: 'Sub category name 7',
    },
    {
        id: '15',
        parentId: '8',
        name: 'Very sub category name',
    },
    {
        id: '16',
        parentId: '8',
        name: 'Very sub category name 2',
    },
]
