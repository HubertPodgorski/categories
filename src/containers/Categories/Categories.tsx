import React from 'react'
import styles from './Categories.module.scss'
import CategoryList from '../../components/CategoryList/CategoryList'
import { categoriesMock } from '../../consts/mocks'
import CategoriesService, { Category } from '../../services/CategoriesService'

const staticTexts = {
    goBack: 'Go back',
}

interface State {
    currentCategoryId: string;
    categoryList: Category[];
}

interface Props {}

class Categories extends React.Component<Props, State> {
    constructor(props: {}) {
        super(props)

        this.state = {
            currentCategoryId: '',
            categoryList: CategoriesService.getCategoryListByParentId(
                '',
                categoriesMock
            ),
        }
    }

    onCategoryPick = (categoryId: string): void => {
        this.setState({
            currentCategoryId: categoryId,
            categoryList: CategoriesService.getCategoryListByParentId(
                categoryId,
                categoriesMock
            ),
        })
    }

    onGoBackClick = (): void => {
        const parentId = CategoriesService.getParentIdByCategoryId(
            this.state.currentCategoryId,
            categoriesMock
        )

        this.setState({
            currentCategoryId: parentId,
            categoryList: CategoriesService.getCategoryListByParentId(
                parentId,
                categoriesMock
            ),
        })
    }

    render() {
        return (
            <section className={styles['categories']}>
                <button onClick={this.onGoBackClick}>
                    {staticTexts.goBack}
                </button>

                <CategoryList
                    categoryList={this.state.categoryList}
                    onCategoryPick={this.onCategoryPick}
                />
            </section>
        )
    }
}

export default Categories
