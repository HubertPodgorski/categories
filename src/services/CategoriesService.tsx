import { globalSettings } from '../consts/settings'

export interface Category {
    parentId: string;
    name: string;
    id: string;
}

export default class CategoriesService {
    static getCategoryListByParentId = (
        parentId: string,
        categoryList: Category[]
    ): Category[] =>
        categoryList.filter(
            (category: Category): boolean => category.parentId === parentId
        )

    static getParentIdByCategoryId = (
        categoryId: string,
        categoryList: Category[]
    ): string => {
        const parentCategory = categoryList.find(
            (category: Category): boolean => category.id === categoryId
        )

        return parentCategory ? parentCategory.parentId : ''
    }

    static getCategoryById = (
        categoryId: string,
        categories: Category[]
    ): Category | undefined =>
        categories.find(
            (category: Category): boolean => category.id === categoryId
        )

    static isCategoryLastById = (
        categoryId: string,
        categories: Category[]
    ): boolean => {
        return categoryId === globalSettings.mainCategoryId
            ? false
            : !categories.some(
                  (category: Category) => category.parentId === categoryId
              )
    }
}
