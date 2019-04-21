import React from 'react'
import { shallow } from 'enzyme'
import Categories from '../Categories/Categories'

describe('Categories', () => {
    let props = {}

    beforeEach(() => {
        props = {
            categoryList: [
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
            ],
        }
    })

    describe('updateState', () => {
        it('sets state based on given category id and breadcrumbs', () => {
            const CategoriesShallow = shallow(
                <Categories categoryList={props.categoryList} />
            )

            const initialState = {
                currentCategoryId: '1',
                categoryList: [
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
                ],
                isLast: false,
                breadcrumbs: [{ id: '1', label: 'Category name 1' }],
                isAtMainCategories: false,
            }

            CategoriesShallow.instance().setState(initialState)

            const categoryId = '2'
            const breadcrumbs = [{ id: '2', label: 'Category name 2' }]

            const expectedResults = {
                currentCategoryId: '2',
                categoryList: [
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
                ],
                isLast: false,
                breadcrumbs: [{ id: '2', label: 'Category name 2' }],
                isAtMainCategories: false,
            }

            CategoriesShallow.instance().updateState(categoryId, breadcrumbs)

            expect(CategoriesShallow.instance().state).toEqual(expectedResults)
        })
    })

    describe('onCategoryPick', () => {
        it('returns category data if category with given id has been found', () => {
            const CategoriesShallow = shallow(
                <Categories categoryList={props.categoryList} />
            )

            CategoriesShallow.instance().setState({ breadcrumbs: [] })

            const givenCategoryId = '2'

            const expectedResults = {
                currentCategoryId: '2',
                categoryList: [
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
                ],
                isLast: false,
                breadcrumbs: [{ id: '2', label: 'Category name 2' }],
                isAtMainCategories: false,
            }

            CategoriesShallow.instance().onCategoryPick(givenCategoryId)

            expect(CategoriesShallow.instance().state).toEqual(expectedResults)
        })
    })

    describe('onGoBackClick', () => {
        it('updates state AND remove last breadcrumb item based on given category id // IMPORTANT - not going back in history, but moves to parent category', () => {
            const CategoriesShallow = shallow(
                <Categories categoryList={props.categoryList} />
            )

            const initialState = {
                currentCategoryId: '5',
                categoryList: [],
                isLast: true,
                breadcrumbs: [
                    { id: '1', label: 'Category name 1' },
                    { id: '5', label: 'Category name 5' },
                ],
                isAtMainCategories: false,
            }

            CategoriesShallow.instance().setState(initialState)

            const expectedResults = {
                currentCategoryId: '1',
                categoryList: [
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
                ],
                isLast: false,
                breadcrumbs: [{ id: '1', label: 'Category name 1' }],
                isAtMainCategories: false,
            }

            CategoriesShallow.instance().onGoBackClick()

            expect(CategoriesShallow.instance().state).toEqual(expectedResults)
        })
    })

    describe('getCategoryByCurrentCategoryId', () => {
        it('returns current category data if category with given id has been found', () => {
            const CategoriesShallow = shallow(
                <Categories categoryList={props.categoryList} />
            )

            const initialState = {
                currentCategoryId: '2',
                categoryList: [
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
                ],
                isLast: false,
                breadcrumbs: [{ id: '2', label: 'Category name 2' }],
                isAtMainCategories: false,
            }

            CategoriesShallow.instance().setState(initialState)

            const givenCategoryId = '2'

            const result = CategoriesShallow.instance().getCategoryByCurrentCategoryId(
                givenCategoryId
            )

            const expectedResult = {
                id: '2',
                name: 'Category name 2',
                parentId: '',
            }

            expect(result).toEqual(expectedResult)
        })

        it('returns category data with fields set to default text value if category with given id has NOT been found ont he category list', () => {
            const CategoriesShallow = shallow(
                <Categories categoryList={props.categoryList} />
            )

            const result = CategoriesShallow.instance().getCategoryByCurrentCategoryId(
                '2'
            )

            const expectedResult = {
                id: '---',
                name: '---',
                parentId: '---',
            }

            expect(result).toEqual(expectedResult)
        })
    })
})
