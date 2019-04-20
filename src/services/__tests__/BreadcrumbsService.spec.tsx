import BreadcrumbsService from '../BreadcrumbsService'

describe('BreadcrumbsService', () => {
    let categories = []
    let breadcrumbs = []

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
        ]

        breadcrumbs = [
            {
                label: 'Category name 1',
                id: '1',
            },
        ]
    })

    describe('getBreadcrumbsWithOptionalNewItemAdded', () => {
        it('returns unmodified breadcrumbs list IF category with given id has not been found', () => {
            const categoryId = '7'

            const result = BreadcrumbsService.getBreadcrumbsWithOptionalNewItemAdded(
                categoryId,
                categories,
                breadcrumbs
            )

            expect(result).toEqual(breadcrumbs)
        })

        it('returns breadcrumbs with new breadcrumb added IF category with given id has been found NOT modifying initial breadcrumb list', () => {
            const categoryId = '2'

            const initialBreadcrumbList = [...breadcrumbs]

            const expectedResult = [
                {
                    label: 'Category name 1',
                    id: '1',
                },
                {
                    label: 'Category name 2',
                    id: '2',
                },
            ]

            const result = BreadcrumbsService.getBreadcrumbsWithOptionalNewItemAdded(
                categoryId,
                categories,
                breadcrumbs
            )

            expect(result).toEqual(expectedResult)
            expect(breadcrumbs).toEqual(initialBreadcrumbList)
        })
    })
})
