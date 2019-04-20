import CategoriesService from '../CategoriesService'

describe('CategoriesService', () => {
    let categories = []
    let globalSettings = {
        mainCategoryId: '1',
    }

    beforeEach(() => {
        categories = [
            {
                id: '1',
                name: 'Category name 1',
                parentId: '',
            },
            {
                id: '2',
                name: 'Category name 2',
                parentId: '',
            },
            {
                id: '2',
                name: 'Category name 2',
                parentId: '',
            },
            {
                id: '3',
                name: 'Category name 3',
                parentId: '',
            },
            {
                id: '4',
                name: 'Category name 4',
                parentId: '1',
            },
            {
                id: '5',
                name: 'Category name 5',
                parentId: '1',
            },
            {
                id: '6',
                name: 'Category name 6',
                parentId: '2',
            },
            {
                id: '7',
                name: 'Category name 7',
                parentId: '2',
            },
        ]
    })

    describe('getCategoryListByParentId', () => {
        it('returns every category with given parentCategoryId NOT modifying initial list', () => {
            const parentId = '1'

            const initialCategories = [...categories]

            const result = CategoriesService.getCategoryListByParentId(
                parentId,
                categories
            )

            const expectedResult = [
                {
                    id: '4',
                    name: 'Category name 4',
                    parentId: '1',
                },
                {
                    id: '5',
                    name: 'Category name 5',
                    parentId: '1',
                },
            ]

            expect(result).toEqual(expectedResult)
            expect(categories).toEqual(initialCategories)
        })

        it('returns empty category list IF category with given parentId has NOT been found', () => {
            const parentId = '8'

            const result = CategoriesService.getCategoryListByParentId(
                parentId,
                categories
            )

            const expectedResult = []

            expect(result).toEqual(expectedResult)
        })
    })

    describe('getParentIdByCategoryId', () => {
        it('returns parentId from category with given id IF category has been found', () => {
            const categoryId = '5'

            const result = CategoriesService.getParentIdByCategoryId(
                categoryId,
                categories
            )

            const expectedResult = '1'

            expect(result).toEqual(expectedResult)
        })

        it('returns empty parentId from category with given id IF category with given id has NOT been found', () => {
            const categoryId = '123'

            const result = CategoriesService.getParentIdByCategoryId(
                categoryId,
                categories
            )

            const expectedResult = ''

            expect(result).toEqual(expectedResult)
        })
    })

    describe('getCategoryById', () => {
        it('returns category data IF category with given id has been found', () => {
            const categoryId = '1'

            const result = CategoriesService.getCategoryById(
                categoryId,
                categories
            )

            const expectedResult = {
                id: '1',
                name: 'Category name 1',
                parentId: '',
            }

            expect(result).toEqual(expectedResult)
        })

        it('returns undefined IF category with given id has NOT been found', () => {
            const categoryId = '123'

            const result = CategoriesService.getCategoryById(
                categoryId,
                categories
            )

            const expectedResult = undefined

            expect(result).toEqual(expectedResult)
        })
    })

    describe('isCategoryLastById', () => {
        it('returns FALSE if given id is main category id set in global settings', () => {
            const categoryId = '1'

            const result = CategoriesService.isCategoryLastById(
                categoryId,
                categories
            )

            const expectedResult = false

            expect(result).toEqual(expectedResult)
        })

        it('returns TRUE if category with parentId equal givenId has NOT been found', () => {
            const categoryId = '3'

            const result = CategoriesService.isCategoryLastById(
                categoryId,
                categories
            )

            const expectedResult = true

            expect(result).toEqual(expectedResult)
        })
    })
})
